export default function(bug) {
  const showNavbar = useStateShowNavbar();
  const bugsFound = useStateBugsFound();
  const { showToast, state } = useBugToast();
  state.isToastVisible = false;
  bugsFound.value = [...bugsFound.value, bug];
  showNavbar.value = true;
  showToast(bug);
}