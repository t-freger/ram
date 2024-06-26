<script lang="ts">
  import { getAllUsers, getPartners, type UserResponseDto } from '@ram/sdk';
  import { createEventDispatcher, onMount } from 'svelte';
  import Button from '../elements/buttons/button.svelte';
  import UserAvatar from '../shared-components/user-avatar.svelte';
  import FullScreenModal from '$lib/components/shared-components/full-screen-modal.svelte';

  export let user: UserResponseDto;
  export let onClose: () => void;

  let availableUsers: UserResponseDto[] = [];
  let selectedUsers: UserResponseDto[] = [];

  const dispatch = createEventDispatcher<{ 'add-users': UserResponseDto[] }>();

  onMount(async () => {
    // TODO: update endpoint to have a query param for deleted users
    let users = await getAllUsers({ isAll: false });

    // remove invalid users
    users = users.filter((_user) => !(_user.deletedAt || _user.id === user.id));

    // exclude partners from the list of users available for selection
    const partners = await getPartners({ direction: 'shared-by' });
    const partnerIds = new Set(partners.map((partner) => partner.id));
    availableUsers = users.filter((user) => !partnerIds.has(user.id));
  });

  const selectUser = (user: UserResponseDto) => {
    selectedUsers = selectedUsers.includes(user)
      ? selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      : [...selectedUsers, user];
  };
</script>

<FullScreenModal id="partner-selection-modal" title="Add partner" showLogo {onClose}>
  <div class="ram-scrollbar max-h-[300px] overflow-y-auto">
    {#if availableUsers.length > 0}
      {#each availableUsers as user}
        <button
          on:click={() => selectUser(user)}
          class="flex w-full place-items-center gap-4 px-5 py-4 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
        >
          {#if selectedUsers.includes(user)}
            <span
              class="flex h-12 w-12 place-content-center place-items-center rounded-full border bg-ram-primary text-3xl text-white dark:border-ram-dark-gray dark:bg-ram-dark-primary dark:text-ram-dark-bg"
              >✓</span
            >
          {:else}
            <UserAvatar {user} size="lg" />
          {/if}

          <div class="text-left">
            <p class="text-ram-fg dark:text-ram-dark-fg">
              {user.name}
            </p>
            <p class="text-xs">
              {user.email}
            </p>
          </div>
        </button>
      {/each}
    {:else}
      <p class="py-5 text-sm">
        Looks like you shared your photos with all users or you don't have any user to share with.
      </p>
    {/if}

    {#if selectedUsers.length > 0}
      <div class="pt-5">
        <Button size="sm" fullwidth on:click={() => dispatch('add-users', selectedUsers)}>Add</Button>
      </div>
    {/if}
  </div>
</FullScreenModal>
