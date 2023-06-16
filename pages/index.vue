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
    <div class="grid grid-cols-2">
      <div v-if="searchPressed && !isLoading">
        <h2 class="text-2xl my-2">Candidate List</h2>
        <UCard
          v-for="talent in searchResults"
          @click="selectTalent(talent)"
          :ui="{
            base: 'overflow-hidden flex w-full items-center justify-between mb-2',
            divide: 'divide-x divide-gray-200 dark:divide-gray-800',
            body: {
              base: 'w-full',
            },
            header: {
              base: 'min-w-[25%] max-w-[25%] flex flex-col items-center justify-start gap-4',
            },
            footer: {
              base: 'min-w-[15%] max-w-[15%] flex items-center justify-end gap-4 text-right',
            },
          }"
        >
          <template #header>
            <img
              class="rounded-full"
              :src="talent.profile_pic_url"
              width="75"
              alt=""
            />
            <span class="text-xl text-center font-bold">{{
              talent.full_name
            }}</span>
            <div class="text-center">
              <div class="text-sm">
                {{ talent.personal_emails[0] ?? "no email" }}
              </div>
              <div class="text-sm">
                {{ talent.city }}, {{ talent.country_full_name }}
              </div>
            </div>
            <span class="text-sm flex w-full justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-linkedin"
              >
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-github"
              >
                <path
                  d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-twitter"
              >
                <path
                  d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-youtube"
              >
                <path
                  d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
                />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </span>
          </template>
          <div class="flex flex-col">
            <div class="flex">
              <div class="flex-1">
                <div class="text-sm font-bold">Skills</div>
                <div class="text-sm">
                  {{ talent.skills.map((s) => s).join(", ") }}
                </div>
              </div>
              <div class="flex-1">
                <div class="text-sm font-bold">Languages</div>
                <div class="text-sm">
                  {{ talent.languages.map((s) => s).join(", ") }}
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            {{ talent.location }}
          </template>
        </UCard>
      </div>
      <div v-if="selectedTalent">
        <UCard>
          <template #header />

          {{ selectedTalent }}

          <template #footer />
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gekata from "@/mock/gekata_revealed.json";
type Talent = typeof gekata;
definePageMeta({
  middleware: "auth",
  layout: "default",
});
const client = useSupabaseClient();
const searchTerm = ref("");
const keywords = ref<string[]>([]);
const searchPressed = ref(false);
const isLoading = ref(false);
const selectedTalent = ref(null as Talent | null);
const searchResults = ref<Talent[]>([]);

const addKeyword = () => {
  if (searchTerm.value.trim() === "") return;
  const searchTermSplitted = searchTerm.value.split(",")[0];
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
  if (keywords.value.length === 0) {
    searchTerm.value = "";
    return;
  }
  searchPressed.value = true;
  isLoading.value = true;
  searchResults.value = [
    gekata,
    gekata,
    gekata,
    gekata,
    gekata,
    gekata,
    gekata,
    gekata,
    gekata,
    gekata,
  ];
  isLoading.value = false;
  // await getSearchResults();
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

const selectTalent = (talent: Talent) => {
  console.log(talent);
  if (selectedTalent.value == talent) {
    selectedTalent.value = null;
  } else {
    selectedTalent.value = talent;
  }
};
</script>

<style scoped></style>
