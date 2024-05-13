import { defaults } from '@ram/sdk';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const csr = true;

export const load = (({ fetch }) => {
  // set event.fetch on the fetch-client used by @ram/sdk
  // https://kit.svelte.dev/docs/load#making-fetch-requests
  // https://github.com/oazapfts/oazapfts/blob/main/README.md#fetch-options
  defaults.fetch = fetch;

  return {
    meta: {
      title: 'ram',
    },
  };
}) satisfies LayoutLoad;
