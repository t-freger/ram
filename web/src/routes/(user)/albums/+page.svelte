<script lang="ts">
  import type { PageData } from './$types';
  import { AlbumFilter, albumViewSettings } from '$lib/stores/preferences.store';
  import { createAlbumAndRedirect } from '$lib/utils/album-utils';
  import UserPageLayout from '$lib/components/layouts/user-page-layout.svelte';
  import AlbumsControls from '$lib/components/album-page/albums-controls.svelte';
  import Albums from '$lib/components/album-page/albums-list.svelte';
  import EmptyPlaceholder from '$lib/components/shared-components/empty-placeholder.svelte';
  import GroupTab from '$lib/components/elements/group-tab.svelte';
  import SearchBar from '$lib/components/elements/search-bar.svelte';

  export let data: PageData;

  let searchQuery = '';
  let albumGroups: string[] = [];
</script>

<UserPageLayout title={data.meta.title}>
  <div class="flex place-items-center gap-2" slot="buttons">
    <AlbumsControls {albumGroups} bind:searchQuery />
  </div>

  <div class="xl:hidden">
    <div class="w-fit h-14 dark:text-ram-dark-fg py-2">
      <GroupTab
        filters={Object.keys(AlbumFilter)}
        selected={$albumViewSettings.filter}
        onSelect={(selected) => ($albumViewSettings.filter = selected)}
      />
    </div>
    <div class="w-60">
      <SearchBar placeholder="Search albums" bind:name={searchQuery} showLoadingSpinner={false} />
    </div>
  </div>

  <Albums
    ownedAlbums={data.albums}
    sharedAlbums={data.sharedAlbums}
    userSettings={$albumViewSettings}
    allowEdit
    {searchQuery}
    bind:albumGroupIds={albumGroups}
  >
    <EmptyPlaceholder
      slot="empty"
      text="Create an album to organize your photos and videos"
      onClick={() => createAlbumAndRedirect()}
    />
  </Albums>
</UserPageLayout>
