const state = reactive({
  isToastVisible: false,
  bug: {},
});

const showToast = (bug, duration = 5000) => {
  state.isToastVisible = true;
  state.bug = bug;
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