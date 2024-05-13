import { readFileSync } from 'node:fs';
import { ramCli } from 'src/utils';
import { describe, expect, it } from 'vitest';

const pkg = JSON.parse(readFileSync('../cli/package.json', 'utf8'));

describe(`ram --version`, () => {
  describe('ram --version', () => {
    it('should print the cli version', async () => {
      const { stdout, stderr, exitCode } = await ramCli(['--version']);
      expect(stdout).toEqual(pkg.version);
      expect(stderr).toEqual('');
      expect(exitCode).toBe(0);
    });
  });

  describe('ram -V', () => {
    it('should print the cli version', async () => {
      const { stdout, stderr, exitCode } = await ramCli(['-V']);
      expect(stdout).toEqual(pkg.version);
      expect(stderr).toEqual('');
      expect(exitCode).toBe(0);
    });
  });
});
