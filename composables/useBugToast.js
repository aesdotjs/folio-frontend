const state = reactive({
  isToastVisible: false,
  bug: {},
});

const showToast = (bug, duration = 5000) => {
  const bugTypes = useStateBugTypes();
  const bugsFound = useStateBugsFound();
  state.isToastVisible = true;
  state.bug = bug;
  if(bugsFound.value.length === bugTypes.value.length){
    const { scroll } = useLocomotive();
    scroll.value.scrollTo("#hero");
  }
  setTimeout(() => {
    state.isToastVisible = false;
  }, duration);
};
export default function() {
  return {
    state,
    showToast
  };
};