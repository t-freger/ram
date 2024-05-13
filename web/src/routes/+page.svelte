<script lang="ts">
  import Button from '$lib/components/elements/buttons/button.svelte';
  import ramLogo from '$lib/components/shared-components/ram-logo.svelte';
  import { AppRoute } from '$lib/constants';
</script>

<section class="flex h-screen w-screen place-content-center place-items-center">
  <div class="flex max-w-[350px] flex-col place-items-center gap-8 text-center">
    <div class="flex place-content-center place-items-center">
      <ramLogo noText class="text-center" height="200" width="200" />
    </div>
    <h1 class="text-4xl font-bold text-ram-primary dark:text-ram-dark-primary">Welcome to ram</h1>
    <a href={AppRoute.AUTH_REGISTER}>
      <Button size="lg" rounded="lg">
        <span class="px-2 font-bold">Getting Started</span>
      </Button>
    </a>
  </div>
</section>
