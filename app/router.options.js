export default {
  scrollBehavior: function (to, from, savedPosition) {
    const { scroll } = useLocomotive();
    if(!scroll.value) return;
    scroll.value.update();
    if(to.hash){
      scroll.value.scrollTo(to.hash);
    }
    else {
      scroll.value.scrollTo(0);
    }
    return {
      top: 0,
    };
  }
}