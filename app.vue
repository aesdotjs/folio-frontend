<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <NuxtLoading/>
  </div>
</template>
<script setup>
const loading = useStateLoading();
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", () => {
  loading.value = true;
})

// nuxtApp.hook("page:finish", () => {
//   loading.value = false;
// })
</script>
