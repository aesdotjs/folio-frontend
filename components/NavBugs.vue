<template>
<div>
  <svg 
    v-for="bug in bugsFound"
    :key="bug.type"
    :width="38.5 * 0.60"
    :height="50 * 0.60"
    :style="{ color: bug.color }"
    class="cursor-default m-1">
    <use xlink:href="#bug_top"></use>
  </svg>
</div>
</template>
<script setup>
import bugTypes from "~/composables/bugTypes";
const bugsFound = useStateBugsFound();
const isBugFound = function(bug) {
  return bugsFound.value.filter( i => i.type === bug.type).length > 0;
};
</script>
<style scoped>
svg {
  animation: popin 1s cubic-bezier(0.2, 0.5, 0.1, 1) forwards;
}
@keyframes popin {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1) rotate(-45deg);
    opacity: 1;
  }
}
</style>