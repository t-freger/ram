import type { ServerInfoResponseDto } from '@ram/sdk';
import { writable } from 'svelte/store';

export const serverInfo = writable<ServerInfoResponseDto>();
