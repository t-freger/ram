<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';
  import Button from '../elements/buttons/button.svelte';
  import Icon from '../elements/icon.svelte';
  import OnboardingCard from './onboarding-card.svelte';
  import { createEventDispatcher } from 'svelte';
  import { colorTheme } from '$lib/stores/preferences.store';
  import { moonPath, moonViewBox, sunPath, sunViewBox } from '$lib/assets/svg-paths';
  import { Theme } from '$lib/constants';

  const dispatch = createEventDispatcher<{
    done: void;
    previous: void;
  }>();
</script>

<OnboardingCard>
  <p class="text-xl text-ram-primary dark:text-ram-dark-primary">COLOR THEME</p>

  <div>
    <p class="pb-6 font-light">Choose a color theme for your instance. You can change this later in your settings.</p>
  </div>

  <div class="flex gap-4 mb-6">
    <button
      class="w-1/2 aspect-square bg-ram-bg rounded-3xl transition-all shadow-sm hover:shadow-xl border-[3px] border-ram-dark-primary/80 border-ram-primary dark:border dark:border-transparent"
      on:click={() => ($colorTheme.value = Theme.LIGHT)}
    >
      <div
        class="flex flex-col place-items-center place-content-center justify-around h-full w-full text-ram-primary"
      >
        <Icon path={sunPath} viewBox={sunViewBox} size="96" />
        <p class="font-semibold text-4xl">LIGHT</p>
      </div>
    </button>
    <button
      class="w-1/2 aspect-square bg-ram-dark-bg rounded-3xl dark:border-[3px] dark:border-ram-dark-primary/80 dark:border-ram-dark-primary border border-transparent"
      on:click={() => ($colorTheme.value = Theme.DARK)}
    >
      <div
        class="flex flex-col place-items-center place-content-center justify-around h-full w-full text-ram-dark-primary"
      >
        <Icon path={moonPath} viewBox={moonViewBox} size="96" />
        <p class="font-semibold text-4xl">DARK</p>
      </div>
    </button>
  </div>

  <div class="flex">
    <div class="w-full flex place-content-end">
      <Button class="flex gap-2 place-content-center" on:click={() => dispatch('done')}>
        <p>Storage Template</p>
        <Icon path={mdiArrowRight} size="18" />
      </Button>
    </div>
  </div>
</OnboardingCard>
