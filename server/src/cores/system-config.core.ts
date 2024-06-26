import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import AsyncLock from 'async-lock';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { load as loadYaml } from 'js-yaml';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { SystemConfigDto } from 'src/dtos/system-config.dto';
import {
  AudioCodec,
  CQMode,
  Colorspace,
  ImageFormat,
  LogLevel,
  SystemConfig,
  SystemConfigEntity,
  SystemConfigKey,
  SystemConfigValue,
  ToneMapping,
  TranscodeHWAccel,
  TranscodePolicy,
  VideoCodec,
} from 'src/entities/system-config.entity';
import { DatabaseLock } from 'src/interfaces/database.interface';
import { QueueName } from 'src/interfaces/job.interface';
import { ILoggerRepository } from 'src/interfaces/logger.interface';
import { ISystemConfigRepository } from 'src/interfaces/system-config.interface';

export type SystemConfigValidator = (config: SystemConfig, newConfig: SystemConfig) => void | Promise<void>;

export const defaults = Object.freeze<SystemConfig>({
  ffmpeg: {
    crf: 23,
    threads: 0,
    preset: 'ultrafast',
    targetVideoCodec: VideoCodec.H264,
    acceptedVideoCodecs: [VideoCodec.H264],
    targetAudioCodec: AudioCodec.AAC,
    acceptedAudioCodecs: [AudioCodec.AAC, AudioCodec.MP3, AudioCodec.LIBOPUS],
    targetResolution: '720',
    maxBitrate: '0',
    bframes: -1,
    refs: 0,
    gopSize: 0,
    npl: 0,
    temporalAQ: false,
    cqMode: CQMode.AUTO,
    twoPass: false,
    preferredHwDevice: 'auto',
    transcode: TranscodePolicy.REQUIRED,
    tonemap: ToneMapping.HABLE,
    accel: TranscodeHWAccel.DISABLED,
  },
  job: {
    [QueueName.BACKGROUND_TASK]: { concurrency: 5 },
    [QueueName.SMART_SEARCH]: { concurrency: 2 },
    [QueueName.METADATA_EXTRACTION]: { concurrency: 5 },
    [QueueName.FACE_DETECTION]: { concurrency: 2 },
    [QueueName.SEARCH]: { concurrency: 5 },
    [QueueName.SIDECAR]: { concurrency: 5 },
    [QueueName.LIBRARY]: { concurrency: 5 },
    [QueueName.MIGRATION]: { concurrency: 5 },
    [QueueName.THUMBNAIL_GENERATION]: { concurrency: 5 },
    [QueueName.VIDEO_CONVERSION]: { concurrency: 1 },
    [QueueName.NOTIFICATION]: { concurrency: 5 },
  },
  logging: {
    enabled: true,
    level: LogLevel.LOG,
  },
  machineLearning: {
    enabled: process.env.ram_MACHINE_LEARNING_ENABLED !== 'false',
    url: process.env.ram_MACHINE_LEARNING_URL || 'http://ram-machine-learning:3003',
    clip: {
      enabled: true,
      modelName: 'ViT-B-32__openai',
    },
    facialRecognition: {
      enabled: true,
      modelName: 'buffalo_l',
      minScore: 0.7,
      maxDistance: 0.5,
      minFaces: 3,
    },
  },
  map: {
    enabled: true,
    lightStyle: '',
    darkStyle: '',
  },
  reverseGeocoding: {
    enabled: true,
  },
  oauth: {
    autoLaunch: false,
    autoRegister: true,
    buttonText: 'Login with OAuth',
    clientId: '',
    clientSecret: '',
    defaultStorageQuota: 0,
    enabled: false,
    issuerUrl: '',
    mobileOverrideEnabled: false,
    mobileRedirectUri: '',
    scope: 'openid email profile',
    signingAlgorithm: 'RS256',
    storageLabelClaim: 'preferred_username',
    storageQuotaClaim: 'ram_quota',
  },
  passwordLogin: {
    enabled: true,
  },
  storageTemplate: {
    enabled: false,
    hashVerificationEnabled: true,
    template: '{{y}}/{{y}}-{{MM}}-{{dd}}/{{filename}}',
  },
  image: {
    thumbnailFormat: ImageFormat.WEBP,
    thumbnailSize: 250,
    previewFormat: ImageFormat.JPEG,
    previewSize: 1440,
    quality: 80,
    colorspace: Colorspace.P3,
    extractEmbedded: false,
  },
  newVersionCheck: {
    enabled: true,
  },
  trash: {
    enabled: true,
    days: 30,
  },
  theme: {
    customCss: '',
  },
  library: {
    scan: {
      enabled: true,
      cronExpression: CronExpression.EVERY_DAY_AT_MIDNIGHT,
    },
    watch: {
      enabled: false,
    },
  },
  server: {
    externalDomain: '',
    loginPageMessage: '',
  },
  notifications: {
    smtp: {
      enabled: false,
      from: '',
      replyTo: '',
      transport: {
        ignoreCert: false,
        host: '',
        port: 587,
        username: '',
        password: '',
      },
    },
  },
  user: {
    deleteDelay: 7,
  },
});

export enum FeatureFlag {
  SMART_SEARCH = 'smartSearch',
  FACIAL_RECOGNITION = 'facialRecognition',
  MAP = 'map',
  REVERSE_GEOCODING = 'reverseGeocoding',
  SIDECAR = 'sidecar',
  SEARCH = 'search',
  OAUTH = 'oauth',
  OAUTH_AUTO_LAUNCH = 'oauthAutoLaunch',
  PASSWORD_LOGIN = 'passwordLogin',
  CONFIG_FILE = 'configFile',
  TRASH = 'trash',
  EMAIL = 'email',
}

export type FeatureFlags = Record<FeatureFlag, boolean>;

let instance: SystemConfigCore | null;

@Injectable()
export class SystemConfigCore {
  private readonly asyncLock = new AsyncLock();
  private config: SystemConfig | null = null;
  private lastUpdated: number | null = null;

  public config$ = new Subject<SystemConfig>();

  private constructor(
    private repository: ISystemConfigRepository,
    private logger: ILoggerRepository,
  ) {}

  static create(repository: ISystemConfigRepository, logger: ILoggerRepository) {
    if (!instance) {
      instance = new SystemConfigCore(repository, logger);
    }
    return instance;
  }

  static reset() {
    instance = null;
  }

  async requireFeature(feature: FeatureFlag) {
    const hasFeature = await this.hasFeature(feature);
    if (!hasFeature) {
      switch (feature) {
        case FeatureFlag.SMART_SEARCH: {
          throw new BadRequestException('Smart search is not enabled');
        }
        case FeatureFlag.FACIAL_RECOGNITION: {
          throw new BadRequestException('Facial recognition is not enabled');
        }
        case FeatureFlag.SIDECAR: {
          throw new BadRequestException('Sidecar is not enabled');
        }
        case FeatureFlag.SEARCH: {
          throw new BadRequestException('Search is not enabled');
        }
        case FeatureFlag.OAUTH: {
          throw new BadRequestException('OAuth is not enabled');
        }
        case FeatureFlag.PASSWORD_LOGIN: {
          throw new BadRequestException('Password login is not enabled');
        }
        case FeatureFlag.CONFIG_FILE: {
          throw new BadRequestException('Config file is not set');
        }
        default: {
          throw new ForbiddenException(`Missing required feature: ${feature}`);
        }
      }
    }
  }

  async hasFeature(feature: FeatureFlag) {
    const features = await this.getFeatures();
    return features[feature] ?? false;
  }

  async getFeatures(): Promise<FeatureFlags> {
    const config = await this.getConfig();
    const mlEnabled = config.machineLearning.enabled;

    return {
      [FeatureFlag.SMART_SEARCH]: mlEnabled && config.machineLearning.clip.enabled,
      [FeatureFlag.FACIAL_RECOGNITION]: mlEnabled && config.machineLearning.facialRecognition.enabled,
      [FeatureFlag.MAP]: config.map.enabled,
      [FeatureFlag.REVERSE_GEOCODING]: config.reverseGeocoding.enabled,
      [FeatureFlag.SIDECAR]: true,
      [FeatureFlag.SEARCH]: true,
      [FeatureFlag.TRASH]: config.trash.enabled,
      [FeatureFlag.OAUTH]: config.oauth.enabled,
      [FeatureFlag.OAUTH_AUTO_LAUNCH]: config.oauth.autoLaunch,
      [FeatureFlag.PASSWORD_LOGIN]: config.passwordLogin.enabled,
      [FeatureFlag.CONFIG_FILE]: !!process.env.ram_CONFIG_FILE,
      [FeatureFlag.EMAIL]: config.notifications.smtp.enabled,
    };
  }

  public getDefaults(): SystemConfig {
    return defaults;
  }

  public async getConfig(force = false): Promise<SystemConfig> {
    if (force || !this.config) {
      const lastUpdated = this.lastUpdated;
      await this.asyncLock.acquire(DatabaseLock[DatabaseLock.GetSystemConfig], async () => {
        if (lastUpdated === this.lastUpdated) {
          this.config = await this.buildConfig();
          this.lastUpdated = Date.now();
        }
      });
    }

    return this.config!;
  }

  public async updateConfig(newConfig: SystemConfig): Promise<SystemConfig> {
    if (await this.hasFeature(FeatureFlag.CONFIG_FILE)) {
      throw new BadRequestException('Cannot update configuration while ram_CONFIG_FILE is in use');
    }

    const updates: SystemConfigEntity[] = [];
    const deletes: SystemConfigEntity[] = [];

    for (const key of Object.values(SystemConfigKey)) {
      // get via dot notation
      const item = { key, value: _.get(newConfig, key) as SystemConfigValue };
      const defaultValue = _.get(defaults, key);
      const isMissing = !_.has(newConfig, key);

      if (
        isMissing ||
        item.value === null ||
        item.value === '' ||
        item.value === defaultValue ||
        _.isEqual(item.value, defaultValue)
      ) {
        deletes.push(item);
        continue;
      }

      updates.push(item);
    }

    if (updates.length > 0) {
      await this.repository.saveAll(updates);
    }

    if (deletes.length > 0) {
      await this.repository.deleteKeys(deletes.map((item) => item.key));
    }

    const config = await this.getConfig();

    this.config$.next(config);

    return config;
  }

  public async refreshConfig() {
    const newConfig = await this.getConfig(true);

    this.config$.next(newConfig);
  }

  private async buildConfig() {
    const config = _.cloneDeep(defaults);
    const overrides = process.env.ram_CONFIG_FILE
      ? await this.loadFromFile(process.env.ram_CONFIG_FILE)
      : await this.repository.load();

    for (const { key, value } of overrides) {
      // set via dot notation
      _.set(config, key, value);
    }

    const errors = await validate(plainToInstance(SystemConfigDto, config));
    if (errors.length > 0) {
      if (process.env.ram_CONFIG_FILE) {
        throw new Error(`Invalid value(s) in file: ${errors}`);
      } else {
        this.logger.error('Validation error', errors);
      }
    }

    if (!config.ffmpeg.acceptedVideoCodecs.includes(config.ffmpeg.targetVideoCodec)) {
      config.ffmpeg.acceptedVideoCodecs.push(config.ffmpeg.targetVideoCodec);
    }

    if (!config.ffmpeg.acceptedAudioCodecs.includes(config.ffmpeg.targetAudioCodec)) {
      config.ffmpeg.acceptedAudioCodecs.push(config.ffmpeg.targetAudioCodec);
    }

    return config;
  }

  private async loadFromFile(filepath: string) {
    try {
      const file = await this.repository.readFile(filepath);
      const config = loadYaml(file.toString()) as any;
      const overrides: SystemConfigEntity<SystemConfigValue>[] = [];

      for (const key of Object.values(SystemConfigKey)) {
        const value = _.get(config, key);
        this.unsetDeep(config, key);
        if (value !== undefined) {
          overrides.push({ key, value });
        }
      }

      if (!_.isEmpty(config)) {
        this.logger.warn(`Unknown keys found: ${JSON.stringify(config, null, 2)}`);
      }

      return overrides;
    } catch (error: Error | any) {
      this.logger.error(`Unable to load configuration file: ${filepath}`);
      throw error;
    }
  }

  private unsetDeep(object: object, key: string) {
    _.unset(object, key);
    const path = key.split('.');
    while (path.pop()) {
      if (!_.isEmpty(_.get(object, path))) {
        return;
      }
      _.unset(object, path);
    }
  }
}
