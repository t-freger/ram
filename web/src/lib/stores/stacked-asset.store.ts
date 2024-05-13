import type { AssetResponseDto } from '@ram/sdk';
import { writable } from 'svelte/store';

export const stackAssetsStore = writable<AssetResponseDto[]>([]);
