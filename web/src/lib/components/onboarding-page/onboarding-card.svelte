<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div
  id="onboarding-card"
  class="flex w-full max-w-4xl flex-col gap-4 rounded-3xl border-2 border-gray-500 px-8 py-14 dark:border-ram-dark-gray dark:bg-ram-dark-gray text-black dark:text-ram-dark-fg bg-gray-50"
  in:fade={{ duration: 250 }}
>
  <slot />
</div>
