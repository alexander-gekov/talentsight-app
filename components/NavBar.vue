<script setup lang="ts">
const darkMode = ref(true);
const colorMode = useColorMode();

const { data, signOut } = useAuth();

const user = computed(() => data.value?.user);

const items = [
  [
    {
      label: "Profile",
      avatar: {
        src:
          user.value?.image ??
          "https://avatars.githubusercontent.com/u/54212400?v=4",
      },
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-20-solid",
    },
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-on-rectangle-20-solid",
      class: "cursor-pointer",
      onClick: () => handleSignOut(),
    },
  ],
];

const handleSignOut = async () => {
  await signOut();
  navigateTo("/login");
};

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
      <NuxtLink to="/" class="font-bold text-2xl">
        Talent<span class="text-green-500">Sight</span>
      </NuxtLink>
      <span class="text-gray-400 text-4xl font-thin">/</span>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton
          color="white"
          trailing-icon="i-heroicons-chevron-up-down-20-solid"
        >
          <div class="flex justify-start items-center gap-2">
            <UAvatar
              :src="
                user?.image ??
                'https://avatars.githubusercontent.com/u/739984?v=4'
              "
              alt="Avatar"
              size="sm"
              class="cursor-pointer"
            />
            <div class="flex flex-col gap-1">
              <div class="font-bold text-sm">Personal Workspace</div>
              <div class="text-gray-400 text-sm">
                {{ user?.name ?? "john-doe" }}
              </div>
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
        :src="
          user?.image ?? 'https://avatars.githubusercontent.com/u/739984?v=4'
        "
        alt="Avatar"
        size="lg"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<style></style>
