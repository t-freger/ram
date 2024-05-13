<script lang="ts">
  import Icon from '$lib/components/elements/icon.svelte';
  type Color = 'transparent' | 'light' | 'dark' | 'gray' | 'primary' | 'opaque';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let icon: string;
  export let color: Color = 'transparent';
  export let title: string;
  export let padding = '3';
  export let size = '24';
  export let hideMobile = false;
  export let buttonSize: string | undefined = undefined;
  /**
   * viewBox attribute for the SVG icon.
   */
  export let viewBox: string | undefined = undefined;

  /**
   * Override the default styling of the button for specific use cases, such as the icon color.
   */
  let className = '';
  export { className as class };

  const colorClasses: Record<Color, string> = {
    transparent: 'bg-transparent hover:bg-[#d3d3d3] dark:text-ram-dark-fg',
    opaque: 'bg-transparent hover:bg-ram-bg/30 text-white hover:dark:text-white',
    light: 'bg-white hover:bg-[#d3d3d3]',
    dark: 'bg-[#202123] hover:bg-[#d3d3d3]',
    gray: 'bg-[#d3d3d3] hover:bg-[#e2e7e9] text-ram-dark-gray hover:text-black',
    primary:
      'bg-ram-primary dark:bg-ram-dark-primary hover:bg-ram-primary/75 hover:dark:bg-ram-dark-primary/80 text-white dark:text-ram-dark-gray',
  };

  $: colorClass = colorClasses[color];
  $: mobileClass = hideMobile ? 'hidden sm:flex' : '';
</script>

<button
  {title}
  {type}
  style:width={buttonSize ? buttonSize + 'px' : ''}
  style:height={buttonSize ? buttonSize + 'px' : ''}
  class="flex place-content-center place-items-center rounded-full {colorClass} p-{padding} transition-all hover:dark:text-ram-dark-gray {className} {mobileClass}"
  on:click
>
  <Icon path={icon} {size} ariaLabel={title} {viewBox} color="currentColor" />
</button>
