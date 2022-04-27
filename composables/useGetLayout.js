const layout = reactive({});
export default function () {
  const storyapi = useStoryApi();
  const bugTypes = useStateBugTypes();
  const route = useRoute();
  const language = computed(() => route.path.split("/")[1]);
  const fetchLayout = async function() {
    const { data } = await storyapi.get("cdn/stories/layout", { version: "draft", resolve_relations: "social.icon", language: language.value });
    layout.story = data.story;
    bugTypes.value = [...data.story.content.bugTypes];
    return { layout, fetchLayout };
  };
  return layout.story ? { layout, fetchLayout } : fetchLayout();
}