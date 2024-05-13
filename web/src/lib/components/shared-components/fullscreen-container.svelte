<script lang="ts">
  import ramLogo from './ram-logo.svelte';

  export let title: string;
  export let showMessage = $$slots.message;
</script>

<section class="min-w-screen flex min-h-screen place-content-center place-items-center p-4">
  <div
    class="flex w-full max-w-lg flex-col gap-4 rounded-3xl border bg-white p-8 shadow-sm dark:border-ram-dark-gray dark:bg-ram-dark-gray"
  >
    <div class="flex flex-col place-content-center place-items-center gap-4 py-4">
      <ramLogo noText class="h-24 w-24" />
      <h1 class="text-2xl font-medium text-ram-primary dark:text-ram-dark-primary">
        {title}
      </h1>
    </div>

    {#if showMessage}
      <div
        class="w-full rounded-xl border-2 border-ram-primary bg-ram-primary/5 p-4 text-sm font-medium text-ram-primary dark:border-ram-dark-bg dark:text-ram-dark-primary"
      >
        <slot name="message" />
      </div>
    {/if}

    <slot />
  </div>
</section>
