<script lang="ts">
  import { locale } from '$lib/stores/preferences.store';
  import type { SystemConfigTemplateStorageOptionDto } from '@ram/sdk';
  import { DateTime } from 'luxon';

  export let options: SystemConfigTemplateStorageOptionDto;

  const getLuxonExample = (format: string) => {
    return DateTime.fromISO('2022-09-04T20:03:05.250Z', { locale: $locale }).toFormat(format);
  };
</script>

<div class="mt-2 text-sm">
  <h4>DATE & TIME</h4>
</div>

<div class="mt-2 rounded-lg bg-gray-200 p-4 text-xs dark:bg-gray-700 dark:text-ram-dark-fg">
  <div class="mb-2 text-gray-600 dark:text-ram-dark-fg">
    <p>Asset's creation timestamp is used for the datetime information</p>
    <p>Sample time 2022-02-03T04:56:05.250</p>
  </div>
  <div class="flex gap-[40px]">
    <div>
      <p class="font-medium text-ram-primary dark:text-ram-dark-primary">YEAR</p>
      <ul>
        {#each options.yearOptions as yearFormat}
          <li>{'{{'}{yearFormat}{'}}'} - {getLuxonExample(yearFormat)}</li>
        {/each}
      </ul>
    </div>

    <div>
      <p class="font-medium text-ram-primary dark:text-ram-dark-primary">MONTH</p>
      <ul>
        {#each options.monthOptions as monthFormat}
          <li>{'{{'}{monthFormat}{'}}'} - {getLuxonExample(monthFormat)}</li>
        {/each}
      </ul>
    </div>

    <div>
      <p class="font-medium text-ram-primary dark:text-ram-dark-primary">WEEK</p>
      <ul>
        {#each options.weekOptions as weekFormat}
          <li>{'{{'}{weekFormat}{'}}'} - {getLuxonExample(weekFormat)}</li>
        {/each}
      </ul>
    </div>

    <div>
      <p class="font-medium text-ram-primary dark:text-ram-dark-primary">DAY</p>
      <ul>
        {#each options.dayOptions as dayFormat}
          <li>{'{{'}{dayFormat}{'}}'} - {getLuxonExample(dayFormat)}</li>
        {/each}
      </ul>
    </div>

    <div>
      <p class="font-medium text-ram-primary dark:text-ram-dark-primary">HOUR</p>
      <ul>
        {#each options.hourOptions as dayFormat}
          <li>{'{{'}{dayFormat}{'}}'} - {getLuxonExample(dayFormat)}</li>
        {/each}
      </ul>
    </div>

    <div>
      <p class="font-medium text-ram-primary dark:text-ram-dark-primary">MINUTE</p>
      <ul>
        {#each options.minuteOptions as dayFormat}
          <li>{'{{'}{dayFormat}{'}}'} - {getLuxonExample(dayFormat)}</li>
        {/each}
      </ul>
    </div>

    <div>
      <p class="font-medium text-ram-primary dark:text-ram-dark-primary">SECOND</p>
      <ul>
        {#each options.secondOptions as dayFormat}
          <li>{'{{'}{dayFormat}{'}}'} - {getLuxonExample(dayFormat)}</li>
        {/each}
      </ul>
    </div>
  </div>
</div>
