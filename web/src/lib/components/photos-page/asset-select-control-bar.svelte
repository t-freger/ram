<script lang="ts" context="module">
  import { createContext } from '$lib/utils/context';

  export interface AssetControlContext {
    // Wrap assets in a function, because context isn't reactive.
    getAssets: () => Set<AssetResponseDto>; // All assets includes partners' assets
    getOwnedAssets: () => Set<AssetResponseDto>; // Only assets owned by the user
    clearSelect: () => void;
  }

  const { get: getAssetControlContext, set: setContext } = createContext<AssetControlContext>();
  export { getAssetControlContext };
</script>

<script lang="ts">
  import { locale } from '$lib/stores/preferences.store';
  import type { AssetResponseDto } from '@ram/sdk';
  import { mdiClose } from '@mdi/js';
  import ControlAppBar from '../shared-components/control-app-bar.svelte';

  export let assets: Set<AssetResponseDto>;
  export let clearSelect: () => void;
  export let ownerId: string | undefined = undefined;

  setContext({
    getAssets: () => assets,
    getOwnedAssets: () =>
      ownerId === undefined ? assets : new Set([...assets].filter((asset) => asset.ownerId === ownerId)),
    clearSelect,
  });
</script>

<ControlAppBar on:close={clearSelect} backIcon={mdiClose} tailwindClasses="bg-white shadow-md">
  <p class="font-medium text-ram-primary dark:text-ram-dark-primary" slot="leading">
    Selected {assets.size.toLocaleString($locale)}
  </p>
  <slot slot="trailing" />
</ControlAppBar>
