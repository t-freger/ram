import { ramCli, utils } from 'src/utils';
import { beforeAll, describe, expect, it } from 'vitest';

describe(`ram server-info`, () => {
  beforeAll(async () => {
    await utils.resetDatabase();
    const admin = await utils.adminSetup();
    await utils.cliLogin(admin.accessToken);
  });

  it('should return the server info', async () => {
    const { stderr, stdout, exitCode } = await ramCli(['server-info']);
    expect(stdout.split('\n')).toEqual([
      expect.stringContaining('Server Info (via admin@ram.cloud'),
      '  Url: http://127.0.0.1:2283/api',
      expect.stringContaining('Version:'),
      '  Formats:',
      expect.stringContaining('Images:'),
      expect.stringContaining('Videos:'),
      '  Statistics:',
      '    Images: 0',
      '    Videos: 0',
      '    Total: 0',
    ]);
    expect(stderr).toBe('');
    expect(exitCode).toBe(0);
  });
});
