<template>
<nuxt-link :to="{ name: route.name, hash: route.hash}">
  {{ route.title }}
</nuxt-link>
</template>
<script setup>
defineProps({ route : Object});
</script>