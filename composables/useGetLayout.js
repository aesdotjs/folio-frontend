const layout = reactive({});
export default async function (language = "") {
  const storyapi = useStoryApi();
  const bugTypes = useStateBugTypes();
  const fetchLayout = async function(language) {
    const { data } = await storyapi.get("cdn/stories/layout", { version: "draft", resolve_relations: "social.icon", language });
    layout.story = data.story;
    bugTypes.value = [...data.story.content.bugTypes];
    return { layout, fetchLayout };
  };
  return layout.story ? { layout, fetchLayout } : fetchLayout(language);
}