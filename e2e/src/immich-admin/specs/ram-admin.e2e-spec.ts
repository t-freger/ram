import { ramAdmin, utils } from 'src/utils';
import { beforeAll, describe, expect, it } from 'vitest';

describe(`ram-admin`, () => {
  beforeAll(async () => {
    await utils.resetDatabase();
    await utils.adminSetup();
  });

  describe('list-users', () => {
    it('should list the admin user', async () => {
      const { stdout, stderr, exitCode } = await ramAdmin(['list-users']);
      expect(exitCode).toBe(0);
      expect(stderr).toBe('');
      expect(stdout).toContain("email: 'admin@ram.cloud'");
      expect(stdout).toContain("name: 'ram Admin'");
    });
  });
});
