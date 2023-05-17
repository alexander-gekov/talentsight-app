<template>
  <div class="flex justify-center items-center h-screen">
    <UCard class="w-1/2">
      <template #header>
        <div class="text-4xl font-bold">Login</div>
      </template>
      <UInputGroup class="mb-4" label="Email" hint="Required" required>
        <UInput
          name="Email"
          size="lg"
          placeholder="you@example.com"
          icon="i-heroicons-envelope"
      /></UInputGroup>
      <UInputGroup class="mb-4" label="Password" hint="Required" required>
        <UInput
          name="Password"
          size="lg"
          placeholder="*********"
          icon="i-heroicons-lock-closed"
      /></UInputGroup>
      <UButton
        class="mr-4"
        #footer
        icon="i-heroicons-arrow-right-20-solid"
        size="sm"
        label="Login"
        color="primary"
        variant="solid"
      />
      <UButton
        #footer
        icon="i-simple-icons-linkedin"
        size="sm"
        label="Login with LinkedIn"
        color="white"
        variant="solid"
        trailing
        @click="signInWithLinkedIn"
      />
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "login",
});

const { signIn, status } = useAuth();

const signInWithLinkedIn = async () => {
  await signIn("linkedin");
  if (status.value === "authenticated") {
    navigateTo("/");
  }
};
</script>

<style scoped></style>
