const state = reactive({
  isToastVisible: false,
  bug: {},
});

const isToastVisible = computed(() => state.isToastVisible);
const bug = computed(() => state.bug);
const showToast = (bug, duration = 5000) => {
  state.isToastVisible = true;
  state.bug = bug;
  setTimeout(() => {
    state.isToastVisible = false;
  }, duration);
};
export default function() {
  return {
    isToastVisible,
    bug,
    showToast
  };
};