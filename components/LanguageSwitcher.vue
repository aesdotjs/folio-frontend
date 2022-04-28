<template>
  <NuxtLink
    :to="{ name: 'index' }" 
    class="mx-1 border border-transparent transition-colors hover:border-aesorange"
    :class="{ 'border-aesorange' : route.name === 'index' }"
    >
    <img src="@/assets/img/gb.svg?url" alt="British Flag" width="24" height="24">
  </NuxtLink>
  <NuxtLink 
    :to="{ name: 'fr' }"
    class="mx-1 border border-transparent transition-colors hover:border-aesorange"
    :class="{ 'border-aesorange' : route.name === 'fr' }"
    >
    <img src="@/assets/img/fr.svg?url" alt="French Flag" width="24" height="24">
  </NuxtLink>
</template>
<script setup>
const route = useRoute();
</script>