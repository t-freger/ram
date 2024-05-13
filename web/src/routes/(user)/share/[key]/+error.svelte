<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Opps! Error - ram</title>
</svelte:head>

<section class="flex flex-col px-4 h-screen w-screen place-content-center place-items-center">
  <h1 class="py-10 text-4xl text-ram-primary dark:text-ram-dark-primary">Page not found :/</h1>
  {#if $page.error?.message}
    <h2 class="text-xl text-ram-fg dark:text-ram-dark-fg">{$page.error.message}</h2>
  {/if}
</section>
