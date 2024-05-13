import { QueryParameter } from '$lib/constants';
import type { MetadataSearchDto } from '@ram/sdk';

export function getMetadataSearchQuery(metadata: MetadataSearchDto) {
  const searchParams = new URLSearchParams({
    [QueryParameter.QUERY]: JSON.stringify(metadata),
  });
  return searchParams.toString();
}
