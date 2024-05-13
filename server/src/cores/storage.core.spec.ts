import { StorageCore } from 'src/cores/storage.core';
import { vitest } from 'vitest';

vitest.mock('src/constants', () => ({
  APP_MEDIA_LOCATION: '/photos',
}));

describe('StorageCore', () => {
  describe('isramPath', () => {
    it('should return true for APP_MEDIA_LOCATION path', () => {
      const ramPath = '/photos';
      expect(StorageCore.isramPath(ramPath)).toBe(true);
    });

    it('should return true for paths within the APP_MEDIA_LOCATION', () => {
      const ramPath = '/photos/new/';
      expect(StorageCore.isramPath(ramPath)).toBe(true);
    });

    it('should return false for paths outside the APP_MEDIA_LOCATION and same starts', () => {
      const nonramPath = '/photos_new';
      expect(StorageCore.isramPath(nonramPath)).toBe(false);
    });

    it('should return false for paths outside the APP_MEDIA_LOCATION', () => {
      const nonramPath = '/some/other/path';
      expect(StorageCore.isramPath(nonramPath)).toBe(false);
    });
  });
});
