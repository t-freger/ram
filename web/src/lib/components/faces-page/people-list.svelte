<script lang="ts">
  import { type PersonResponseDto } from '@ram/sdk';
  import { createEventDispatcher } from 'svelte';
  import FaceThumbnail from './face-thumbnail.svelte';
  import SearchPeople from '$lib/components/faces-page/people-search.svelte';

  export let screenHeight: number;
  export let people: PersonResponseDto[];
  export let peopleToNotShow: PersonResponseDto[];
  let searchedPeopleLocal: PersonResponseDto[] = [];

  let name = '';
  let showPeople: PersonResponseDto[];

  let dispatch = createEventDispatcher<{
    select: PersonResponseDto;
  }>();

  $: {
    showPeople = name ? searchedPeopleLocal : people;
    showPeople = showPeople.filter(
      (person) => !peopleToNotShow.some((unselectedPerson) => unselectedPerson.id === person.id),
    );
  }
</script>

<div class=" w-40 sm:w-48 md:w-96 h-14 mb-8">
  <SearchPeople type="searchBar" placeholder="Search people" bind:searchName={name} bind:searchedPeopleLocal />
</div>

<div
  class="ram-scrollbar overflow-y-auto rounded-3xl bg-gray-200 p-10 dark:bg-ram-dark-gray"
  style:max-height={screenHeight - 400 + 'px'}
>
  <div class="grid-col-2 grid gap-8 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
    {#each showPeople as person (person.id)}
      <FaceThumbnail
        {person}
        on:click={() => {
          dispatch('select', person);
        }}
        circle
        border
        selectable
      />
    {/each}
  </div>
</div>
