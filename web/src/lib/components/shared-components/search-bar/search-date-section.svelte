<script lang="ts" context="module">
  export interface SearchDateFilter {
    takenBefore?: string;
    takenAfter?: string;
  }
</script>

<script lang="ts">
  import DateInput from '$lib/components/elements/date-input.svelte';

  export let filters: SearchDateFilter;
</script>

<div id="date-range-selection" class="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-5">
  <label class="ram-form-label" for="start-date">
    <span>START DATE</span>
    <DateInput
      class="ram-form-input w-full mt-1 hover:cursor-pointer"
      type="date"
      id="start-date"
      name="start-date"
      max={filters.takenBefore}
      bind:value={filters.takenAfter}
    />
  </label>

  <label class="ram-form-label" for="end-date">
    <span>END DATE</span>
    <DateInput
      class="ram-form-input w-full mt-1 hover:cursor-pointer"
      type="date"
      id="end-date"
      name="end-date"
      placeholder=""
      min={filters.takenAfter}
      bind:value={filters.takenBefore}
    />
  </label>
</div>
