<script lang="ts">
  import { goto } from '$app/navigation';
  import { AppRoute } from '$lib/constants';
  import { signUpAdmin } from '@ram/sdk';
  import { handleError } from '../../utils/handle-error';
  import Button from '../elements/buttons/button.svelte';
  import PasswordField from '../shared-components/password-field.svelte';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let name = '';

  let errorMessage: string;
  let canRegister = false;

  $: {
    if (password !== confirmPassword && confirmPassword.length > 0) {
      errorMessage = 'Password does not match';
      canRegister = false;
    } else {
      errorMessage = '';
      canRegister = true;
    }
  }

  async function registerAdmin() {
    if (canRegister) {
      errorMessage = '';

      try {
        await signUpAdmin({ signUpDto: { email, password, name } });
        await goto(AppRoute.AUTH_LOGIN);
      } catch (error) {
        handleError(error, 'Unable to create admin account');
        errorMessage = 'Error create admin account';
      }
    }
  }
</script>

<form on:submit|preventDefault={registerAdmin} method="post" class="mt-5 flex flex-col gap-5">
  <div class="flex flex-col gap-2">
    <label class="ram-form-label" for="email">Admin Email</label>
    <input class="ram-form-input" id="email" bind:value={email} type="email" autocomplete="email" required />
  </div>

  <div class="flex flex-col gap-2">
    <label class="ram-form-label" for="password">Admin Password</label>
    <PasswordField id="password" bind:password autocomplete="new-password" />
  </div>

  <div class="flex flex-col gap-2">
    <label class="ram-form-label" for="confirmPassword">Confirm Admin Password</label>
    <PasswordField id="confirmPassword" bind:password={confirmPassword} autocomplete="new-password" />
  </div>

  <div class="flex flex-col gap-2">
    <label class="ram-form-label" for="name">Name</label>
    <input class="ram-form-input" id="name" bind:value={name} type="text" autocomplete="name" required />
  </div>

  {#if errorMessage}
    <p class="text-red-400">{errorMessage}</p>
  {/if}

  <div class="my-5 flex w-full">
    <Button type="submit" size="lg" fullwidth>Sign up</Button>
  </div>
</form>
