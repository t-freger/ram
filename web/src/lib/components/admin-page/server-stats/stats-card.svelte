<script lang="ts">
  import Icon from '$lib/components/elements/icon.svelte';

  export let icon: string;
  export let title: string;
  export let value: number;
  export let unit: string | undefined = undefined;

  $: zeros = () => {
    const maxLength = 13;
    const valueLength = value.toString().length;
    const zeroLength = maxLength - valueLength;

    return '0'.repeat(zeroLength);
  };
</script>

<div class="flex h-[140px] w-[250px] flex-col justify-between rounded-3xl bg-ram-gray p-5 dark:bg-ram-dark-gray">
  <div class="flex place-items-center gap-4 text-ram-primary dark:text-ram-dark-primary">
    <Icon path={icon} size="40" />
    <p>{title}</p>
  </div>

  <div class="relative text-center font-mono text-2xl font-semibold">
    <span class="text-[#DCDADA] dark:text-[#525252]">{zeros()}</span><span
      class="text-ram-primary dark:text-ram-dark-primary">{value}</span
    >
    {#if unit}
      <span class="absolute -top-5 right-2 text-base font-light text-gray-400">{unit}</span>
    {/if}
  </div>
</div>
