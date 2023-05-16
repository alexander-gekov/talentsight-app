<script setup lang="ts">
const darkMode = ref(true);
const colorMode = useColorMode();

const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
];

watch(
  () => darkMode.value,
  (value) => {
    colorMode.value = value ? "dark" : "light";
  }
);
</script>

<template>
  <div class="flex items-center justify-between py-10">
    <!-- Logo -->
    <div class="flex items-center gap-4">
      <div class="font-bold text-2xl">
        Talent<span class="text-green-500">Sight</span>
      </div>
      <span class="text-gray-400 text-4xl font-thin">/</span>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton
          color="white"
          trailing-icon="i-heroicons-chevron-up-down-20-solid"
        >
          <div class="flex justify-start items-center gap-2">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="Avatar"
              size="sm"
              class="cursor-pointer"
            />
            <div class="flex flex-col gap-1">
              <div class="font-bold text-sm">Personal Workspace</div>
              <div class="text-gray-400 text-sm">alexander-gekov</div>
            </div>
          </div>
        </UButton>
      </UDropdown>
    </div>
    <!-- User And Actions -->
    <div class="flex items-center gap-4">
      <UToggle
        icon-off="i-heroicons-sun-20-solid"
        icon-on="i-heroicons-moon-20-solid"
        v-model="darkMode"
      />
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
        size="lg"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<style></style>
