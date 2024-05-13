import { stat } from 'node:fs/promises';
import { app, ramCli, utils } from 'src/utils';
import { beforeEach, describe, expect, it } from 'vitest';

describe(`ram login`, () => {
  beforeEach(async () => {
    await utils.resetDatabase();
  });

  it('should require a url', async () => {
    const { stderr, exitCode } = await ramCli(['login']);
    expect(stderr).toBe("error: missing required argument 'url'");
    expect(exitCode).toBe(1);
  });

  it('should require a key', async () => {
    const { stderr, exitCode } = await ramCli(['login', app]);
    expect(stderr).toBe("error: missing required argument 'key'");
    expect(exitCode).toBe(1);
  });

  it('should require a valid key', async () => {
    const { stderr, exitCode } = await ramCli(['login', app, 'ram-is-so-cool']);
    expect(stderr).toContain('Failed to connect to server');
    expect(stderr).toContain('Invalid API key');
    expect(stderr).toContain('401');
    expect(exitCode).toBe(1);
  });

  it('should login and save auth.yml with 600', async () => {
    const admin = await utils.adminSetup();
    const key = await utils.createApiKey(admin.accessToken);
    const { stdout, stderr, exitCode } = await ramCli(['login', app, `${key.secret}`]);
    expect(stdout.split('\n')).toEqual([
      'Logging in to http://127.0.0.1:2283/api',
      'Logged in as admin@ram.cloud',
      'Wrote auth info to /tmp/ram/auth.yml',
    ]);
    expect(stderr).toBe('');
    expect(exitCode).toBe(0);

    const stats = await stat('/tmp/ram/auth.yml');
    const mode = (stats.mode & 0o777).toString(8);
    expect(mode).toEqual('600');
  });

  it('should login without /api in the url', async () => {
    const admin = await utils.adminSetup();
    const key = await utils.createApiKey(admin.accessToken);
    const { stdout, stderr, exitCode } = await ramCli(['login', app.replaceAll('/api', ''), `${key.secret}`]);
    expect(stdout.split('\n')).toEqual([
      'Logging in to http://127.0.0.1:2283',
      'Discovered API at http://127.0.0.1:2283/api',
      'Logged in as admin@ram.cloud',
      'Wrote auth info to /tmp/ram/auth.yml',
    ]);
    expect(stderr).toBe('');
    expect(exitCode).toBe(0);
  });
});
