import { join } from 'node:path';
import { APP_MEDIA_LOCATION } from 'src/constants';
import { THUMBNAIL_DIR } from 'src/cores/storage.core';
import { LibraryEntity, LibraryType } from 'src/entities/library.entity';
import { userStub } from 'test/fixtures/user.stub';

export const libraryStub = {
  uploadLibrary1: Object.freeze<LibraryEntity>({
    id: 'library-id',
    name: 'test_library',
    assets: [],
    owner: userStub.user1,
    ownerId: 'user-id',
    type: LibraryType.UPLOAD,
    importPaths: [],
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    refreshedAt: null,
    isVisible: true,
    exclusionPatterns: [],
  }),
  externalLibrary1: Object.freeze<LibraryEntity>({
    id: 'library-id',
    name: 'test_library',
    assets: [],
    owner: userStub.admin,
    ownerId: 'admin_id',
    type: LibraryType.EXTERNAL,
    importPaths: [],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    refreshedAt: null,
    isVisible: true,
    exclusionPatterns: [],
  }),
  externalLibrary2: Object.freeze<LibraryEntity>({
    id: 'library-id2',
    name: 'test_library2',
    assets: [],
    owner: userStub.admin,
    ownerId: 'admin_id',
    type: LibraryType.EXTERNAL,
    importPaths: [],
    createdAt: new Date('2021-01-01'),
    updatedAt: new Date('2022-01-01'),
    refreshedAt: null,
    isVisible: true,
    exclusionPatterns: [],
  }),
  externalLibraryWithImportPaths1: Object.freeze<LibraryEntity>({
    id: 'library-id-with-paths1',
    name: 'library-with-import-paths1',
    assets: [],
    owner: userStub.admin,
    ownerId: 'admin_id',
    type: LibraryType.EXTERNAL,
    importPaths: ['/foo', '/bar'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    refreshedAt: null,
    isVisible: true,
    exclusionPatterns: [],
  }),
  externalLibraryWithImportPaths2: Object.freeze<LibraryEntity>({
    id: 'library-id-with-paths2',
    name: 'library-with-import-paths2',
    assets: [],
    owner: userStub.admin,
    ownerId: 'admin_id',
    type: LibraryType.EXTERNAL,
    importPaths: ['/xyz', '/asdf'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    refreshedAt: null,
    isVisible: true,
    exclusionPatterns: [],
  }),
  externalLibraryWithExclusionPattern: Object.freeze<LibraryEntity>({
    id: 'library-id',
    name: 'test_library',
    assets: [],
    owner: userStub.admin,
    ownerId: 'user-id',
    type: LibraryType.EXTERNAL,
    importPaths: [],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    refreshedAt: null,
    isVisible: true,
    exclusionPatterns: ['**/dir1/**'],
  }),
  patternPath: Object.freeze<LibraryEntity>({
    id: 'library-id1337',
    name: 'importpath-exclusion-library1',
    assets: [],
    owner: userStub.admin,
    ownerId: 'user-id',
    type: LibraryType.EXTERNAL,
    importPaths: ['/xyz', '/asdf'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    refreshedAt: null,
    isVisible: true,
    exclusionPatterns: ['**/dir1/**'],
  }),
  hasramPaths: Object.freeze<LibraryEntity>({
    id: 'library-id1337',
    name: 'importpath-exclusion-library1',
    assets: [],
    owner: userStub.admin,
    ownerId: 'user-id',
    type: LibraryType.EXTERNAL,
    importPaths: [join(THUMBNAIL_DIR, 'library'), '/xyz', join(APP_MEDIA_LOCATION, 'library')],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    refreshedAt: null,
    isVisible: true,
    exclusionPatterns: ['**/dir1/**'],
  }),
};
