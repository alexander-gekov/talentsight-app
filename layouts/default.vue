<template>
  <UContainer
    :ui="{ constrained: 'max-w-[100rem]' }"
    class="h-screen flex flex-col"
  >
    <NavBar />
    <hr />
    <slot />
    <Footer />
  </UContainer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
