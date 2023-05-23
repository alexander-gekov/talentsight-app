<template>
  <div
    class="flex flex-col flex-1 gap-4"
    :class="{ 'h-1/2 justify-center items-center': !searchPressed }"
  >
    <!-- Title -->
    <div v-if="!searchPressed" class="text-6xl font-bold font-sans mb-4">
      I am looking for...
    </div>
    <!-- Search -->
    <div class="flex w-1/2 gap-2 mt-4">
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
        @keyup.space="addKeyword"
      />
      <UButton
        class="focus:outline focus:border-green-500 focus:outline-green-500"
        label="Search"
        color="white"
        variant="solid"
        @click="search"
      />
    </div>
    <!-- Keywords -->
    <div class="flex justify-start items-center w-1/2 gap-2 flex-wrap">
      <UBadge size="md" v-for="keyword in keywords" :label="keyword">
        {{ keyword }}
        <span
          class="ml-2 cursor-pointer hover:text-green-800"
          @click="removeKeyword(keyword)"
          >X</span
        >
      </UBadge>
    </div>
    <!-- Results Ghost -->
    <div
      v-if="searchPressed && isLoading"
      v-for="i in 10"
      class="flex items-center space-x-4"
    >
      <USkeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2 w-full">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-1/2" />
      </div>
    </div>
    <!-- Results -->
    <div v-if="searchPressed && !isLoading">
      <UCard
        v-for="talent in searchResults"
        :ui="{
          base: 'overflow-hidden flex w-full items-center justify-between mb-2',
          divide: 'divide-x divide-gray-200 dark:divide-gray-800',
          body: {
            base: 'w-full',
          },
          header: {
            base: 'min-w-[20%] max-w-[20%] flex items-center justify-start gap-4',
          },
          footer: {
            base: 'min-w-[15%] max-w-[15%] flex items-center justify-end gap-4 text-right',
          },
        }"
      >
        <template #header>
          <img :src="talent.imgUrl ?? ''" width="75" alt="" />
          <span>{{ talent.fullName }}</span>
        </template>
        <p>{{ talent.headline }}</p>
        <p class="text-xs line-clamp-3">{{ talent.allSkills }}</p>
        <template #footer>
          {{ talent.location }}
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});
const client = useSupabaseClient();
const searchTerm = ref("");
const keywords = ref<string[]>([]);
const searchPressed = ref(false);
const isLoading = ref(false);
const searchResults = ref<any[]>([]);

const addKeyword = () => {
  const searchTermSplitted = searchTerm.value.split(",")[0].trim();
  if (searchTerm.value && !keywords.value.includes(searchTermSplitted)) {
    keywords.value.push(searchTermSplitted);
    searchTerm.value = "";
  }
};

const removeKeyword = (keyword: string) => {
  keywords.value = keywords.value.filter((k) => k !== keyword);
  search();
  if (keywords.value.length === 0) {
    searchPressed.value = false;
    searchResults.value = [];
  }
};

const search = async () => {
  console.log("Searching...");
  setTimeout(function () {}, 5000);
  addKeyword();
  if (keywords.value.length === 0) return;
  searchPressed.value = true;
  isLoading.value = true;
  await getSearchResults();
};

const getSearchResults = async () => {
  try {
    let { data: results, error } = await client
      .from("talents_phantom")
      .select(
        `id,general->imgUrl,general->fullName,general->headline,general->location,allSkills`
      )
      .like("allSkills", `%${keywords.value.join(", ")}%`);

    console.log(results);
    if (error) {
      throw error;
    }
    // show default image if no image
    results?.map((result) => {
      result.imgUrl =
        result.imgUrl === ""
          ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          : result.imgUrl;
    });
    searchResults.value = results as any;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
