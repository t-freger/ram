import { UserAvatarColor } from '@ram/sdk';

export const uuidDto = {
  invalid: 'invalid-uuid',
  // valid uuid v4
  notFound: '00000000-0000-4000-a000-000000000000',
};

const adminLoginDto = {
  email: 'admin@ram.cloud',
  password: 'password',
};
const adminSignupDto = { ...adminLoginDto, name: 'ram Admin' };

export const loginDto = {
  admin: adminLoginDto,
};

export const signupDto = {
  admin: adminSignupDto,
};

export const createUserDto = {
  create(key: string) {
    return {
      email: `${key}@ram.cloud`,
      name: `Generated User ${key}`,
      password: `password-${key}`,
    };
  },
  user1: {
    email: 'user1@ram.cloud',
    name: 'User 1',
    password: 'password1',
  },
  user2: {
    email: 'user2@ram.cloud',
    name: 'User 2',
    password: 'password12',
  },
  user3: {
    email: 'user3@ram.cloud',
    name: 'User 3',
    password: 'password123',
  },
  user4: {
    email: 'user4@ram.cloud',
    name: 'User 4',
    password: 'password123',
  },
  userQuota: {
    email: 'user-quota@ram.cloud',
    name: 'User Quota',
    password: 'password-quota',
    quotaSizeInBytes: 512,
  },
};

export const userDto = {
  admin: {
    name: signupDto.admin.name,
    email: signupDto.admin.email,
    password: signupDto.admin.password,
    storageLabel: 'admin',
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: new Date('2021-01-01'),
    deletedAt: null,
    updatedAt: new Date('2021-01-01'),
    tags: [],
    assets: [],
    memoriesEnabled: true,
    avatarColor: UserAvatarColor.Primary,
    quotaSizeInBytes: null,
    quotaUsageInBytes: 0,
  },
  user1: {
    name: createUserDto.user1.name,
    email: createUserDto.user1.email,
    password: createUserDto.user1.password,
    storageLabel: null,
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: new Date('2021-01-01'),
    deletedAt: null,
    updatedAt: new Date('2021-01-01'),
    tags: [],
    assets: [],
    memoriesEnabled: true,
    avatarColor: UserAvatarColor.Primary,
    quotaSizeInBytes: null,
    quotaUsageInBytes: 0,
  },
};
