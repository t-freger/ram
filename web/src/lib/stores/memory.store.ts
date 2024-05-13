import type { MemoryLaneResponseDto } from '@ram/sdk';
import { writable } from 'svelte/store';

export const memoryStore = writable<MemoryLaneResponseDto[]>();
