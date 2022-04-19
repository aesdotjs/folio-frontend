export default {
  scrollBehavior: async function (to, from, savedPosition) {
    if(to.hash){
      const { scroll } = useLocomotive();
      if(!scroll.value) return;
      scroll.value.scrollTo(to.hash);
    }
  }
}