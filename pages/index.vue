<template>
  <div class="h-1/2 flex flex-col gap-4 justify-center items-center">
    <!-- Title -->
    <div class="text-6xl font-bold font-sans mb-4">I am looking for...</div>
    <!-- Search -->
    <div class="flex w-1/2 gap-1">
      <UInput
        name="Search"
        icon="i-heroicons-magnifying-glass-20-solid"
        appearance="white"
        placeholder="Start a new search..."
        size="xl"
        class="w-full"
        :trailing="false"
        v-model="searchTerm"
        @keydown.enter="search"
        @keyup.,="addKeyword"
      />
      <UButton
        class="focus:outline focus:border-green-500 focus:outline-green-500"
        label="Search"
        color="white"
        variant="solid"
      />
    </div>
    <!-- Keywords -->
    <div class="flex justify-start items-center w-1/2 gap-2 flex-wrap">
      <UBadge size="md" v-for="keyword in keywords" :label="keyword" />
    </div>
  </div>
</template>

<script setup lang="ts">
const searchTerm = ref("");
const keywords = ref<string[]>([]);

const addKeyword = () => {
  const searchTermSplitted = searchTerm.value.split(",")[0];
  if (searchTerm.value && !keywords.value.includes(searchTermSplitted)) {
    keywords.value.push(searchTermSplitted);
    searchTerm.value = "";
  }
};

const search = () => {
  console.log("Searching...");
};
</script>

<style scoped></style>
