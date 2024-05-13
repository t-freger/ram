import { authenticate } from '$lib/utils/auth';
import { getServerStatistics } from '@ram/sdk';
import type { PageLoad } from './$types';

export const load = (async () => {
  await authenticate({ admin: true });
  const stats = await getServerStatistics();

  return {
    stats,
    meta: {
      title: 'Server Stats',
    },
  };
}) satisfies PageLoad;
