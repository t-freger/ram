<script lang="ts">
  import {
    getMyUserInfo,
    removeUserFromAlbum,
    type AlbumResponseDto,
    type UserResponseDto,
    updateAlbumUser,
    AlbumUserRole,
  } from '@ram/sdk';
  import { mdiDotsVertical } from '@mdi/js';
  import { createEventDispatcher, onMount } from 'svelte';
  import { getContextMenuPosition } from '../../utils/context-menu';
  import { handleError } from '../../utils/handle-error';
  import CircleIconButton from '../elements/buttons/circle-icon-button.svelte';
  import ConfirmDialogue from '../shared-components/confirm-dialogue.svelte';
  import ContextMenu from '../shared-components/context-menu/context-menu.svelte';
  import MenuOption from '../shared-components/context-menu/menu-option.svelte';
  import { NotificationType, notificationController } from '../shared-components/notification/notification';
  import UserAvatar from '../shared-components/user-avatar.svelte';
  import FullScreenModal from '$lib/components/shared-components/full-screen-modal.svelte';

  export let album: AlbumResponseDto;
  export let onClose: () => void;

  const dispatch = createEventDispatcher<{
    remove: string;
    refreshAlbum: void;
  }>();

  let currentUser: UserResponseDto;
  let position = { x: 0, y: 0 };
  let selectedMenuUser: UserResponseDto | null = null;
  let selectedRemoveUser: UserResponseDto | null = null;

  $: isOwned = currentUser?.id == album.ownerId;

  onMount(async () => {
    try {
      currentUser = await getMyUserInfo();
    } catch (error) {
      handleError(error, 'Unable to refresh user');
    }
  });

  const showContextMenu = (event: MouseEvent, user: UserResponseDto) => {
    position = getContextMenuPosition(event);
    selectedMenuUser = user;
    selectedRemoveUser = null;
  };

  const handleMenuRemove = () => {
    selectedRemoveUser = selectedMenuUser;
    selectedMenuUser = null;
  };

  const handleRemoveUser = async () => {
    if (!selectedRemoveUser) {
      return;
    }

    const userId = selectedRemoveUser.id === currentUser?.id ? 'me' : selectedRemoveUser.id;

    try {
      await removeUserFromAlbum({ id: album.id, userId });
      dispatch('remove', userId);
      const message = userId === 'me' ? `Left ${album.albumName}` : `Removed ${selectedRemoveUser.name}`;
      notificationController.show({ type: NotificationType.Info, message });
    } catch (error) {
      handleError(error, 'Unable to remove user');
    } finally {
      selectedRemoveUser = null;
    }
  };

  const handleSetReadonly = async (user: UserResponseDto, role: AlbumUserRole) => {
    try {
      await updateAlbumUser({ id: album.id, userId: user.id, updateAlbumUserDto: { role } });
      const message = `Set ${user.name} as ${role}`;
      dispatch('refreshAlbum');
      notificationController.show({ type: NotificationType.Info, message });
    } catch (error) {
      handleError(error, 'Unable to set user role');
    } finally {
      selectedRemoveUser = null;
    }
  };
</script>

{#if !selectedRemoveUser}
  <FullScreenModal id="share-info-modal" title="Options" {onClose}>
    <section class="ram-scrollbar max-h-[400px] overflow-y-auto pb-4">
      <div class="flex w-full place-items-center justify-between gap-4 p-5">
        <div class="flex place-items-center gap-4">
          <UserAvatar user={album.owner} size="md" />
          <p class="text-sm font-medium">{album.owner.name}</p>
        </div>

        <div id="icon-{album.owner.id}" class="flex place-items-center">
          <p class="text-sm">Owner</p>
        </div>
      </div>
      {#each album.albumUsers as { user, role }}
        <div
          class="flex w-full place-items-center justify-between gap-4 p-5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <div class="flex place-items-center gap-4">
            <UserAvatar {user} size="md" />
            <p class="text-sm font-medium">{user.name}</p>
          </div>

          <div id="icon-{user.id}" class="flex place-items-center gap-2 text-sm">
            <div>
              {#if role === AlbumUserRole.Viewer}
                Viewer
              {:else}
                Editor
              {/if}
            </div>
            {#if isOwned}
              <div>
                <CircleIconButton
                  title="Options"
                  on:click={(event) => showContextMenu(event, user)}
                  icon={mdiDotsVertical}
                  size="20"
                />

                {#if selectedMenuUser === user}
                  <ContextMenu {...position} on:outclick={() => (selectedMenuUser = null)}>
                    {#if role === AlbumUserRole.Viewer}
                      <MenuOption on:click={() => handleSetReadonly(user, AlbumUserRole.Editor)} text="Allow edits" />
                    {:else}
                      <MenuOption
                        on:click={() => handleSetReadonly(user, AlbumUserRole.Viewer)}
                        text="Disallow edits"
                      />
                    {/if}
                    <MenuOption on:click={handleMenuRemove} text="Remove" />
                  </ContextMenu>
                {/if}
              </div>
            {:else if user.id == currentUser?.id}
              <button
                on:click={() => (selectedRemoveUser = user)}
                class="text-sm font-medium text-ram-primary transition-colors hover:text-ram-primary/75 dark:text-ram-dark-primary"
                >Leave</button
              >
            {/if}
          </div>
        </div>
      {/each}
    </section>
  </FullScreenModal>
{/if}

{#if selectedRemoveUser && selectedRemoveUser?.id === currentUser?.id}
  <ConfirmDialogue
    id="leave-album-modal"
    title="Leave album?"
    prompt="Are you sure you want to leave {album.albumName}?"
    confirmText="Leave"
    onConfirm={handleRemoveUser}
    onClose={() => (selectedRemoveUser = null)}
  />
{/if}

{#if selectedRemoveUser && selectedRemoveUser?.id !== currentUser?.id}
  <ConfirmDialogue
    id="remove-user-modal"
    title="Remove user?"
    prompt="Are you sure you want to remove {selectedRemoveUser.name}?"
    confirmText="Remove"
    onConfirm={handleRemoveUser}
    onClose={() => (selectedRemoveUser = null)}
  />
{/if}
