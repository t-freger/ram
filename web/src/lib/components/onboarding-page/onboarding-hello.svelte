<script lang="ts">
  import OnboardingCard from './onboarding-card.svelte';
  import Button from '$lib/components/elements/buttons/button.svelte';
  import { mdiArrowRight } from '@mdi/js';
  import Icon from '$lib/components/elements/icon.svelte';
  import { createEventDispatcher } from 'svelte';
  import ramLogo from '../shared-components/ram-logo.svelte';
  import { user } from '$lib/stores/user.store';

  const dispatch = createEventDispatcher<{
    done: void;
  }>();
</script>

<OnboardingCard>
  <ramLogo noText width="75" />
  <p class="font-medium text-6xl my-6 text-ram-primary dark:text-ram-dark-primary">
    Welcome, {$user.name}
  </p>
  <p class="text-3xl pb-6 font-light">Let's get your instance set up with some common settings.</p>

  <div class="w-full flex place-content-end">
    <Button class="flex gap-2 place-content-center" on:click={() => dispatch('done')}>
      <p>Theme</p>
      <Icon path={mdiArrowRight} size="18" />
    </Button>
  </div>
</OnboardingCard>
