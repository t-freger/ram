import { authenticate } from '$lib/utils/auth';
import { getAssetInfoFromParam } from '$lib/utils/navigation';
import { getPerson, getPersonStatistics } from '@ram/sdk';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  await authenticate();

  const [person, statistics, asset] = await Promise.all([
    getPerson({ id: params.personId }),
    getPersonStatistics({ id: params.personId }),
    getAssetInfoFromParam(params),
  ]);

  return {
    person,
    statistics,
    asset,
    meta: {
      title: person.name || 'Person',
    },
  };
}) satisfies PageLoad;
