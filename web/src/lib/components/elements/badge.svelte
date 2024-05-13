<script lang="ts" context="module">
  export type Color = 'primary' | 'secondary';
  export type Rounded = false | true | 'full';
</script>

<script lang="ts">
  export let color: Color = 'primary';
  export let rounded: Rounded = true;

  const colorClasses: Record<Color, string> = {
    primary: 'text-gray-100 dark:text-ram-dark-gray bg-ram-primary dark:bg-ram-dark-primary',
    secondary: 'text-ram-dark-bg dark:text-ram-gray dark:bg-gray-600 bg-gray-300 dark:text-ram-gray',
  };
</script>

<span
  class="inline-block h-min whitespace-nowrap px-3 py-1 text-center align-baseline text-xs leading-none {colorClasses[
    color
  ]}"
  class:rounded-md={rounded === true}
  class:rounded-full={rounded === 'full'}
>
  <slot />
</span>
