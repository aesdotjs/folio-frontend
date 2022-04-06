export default async function (language = "") {
  const storyapi = useStoryApi();
  const layout = reactive({});
  const fetchLayout = async function(language) {
    const { data } = await storyapi.get("cdn/stories/layout", { version: "draft", resolve_relations: "social.icon", language });
    layout.story = data.story;
    return { layout, fetchLayout };
  };
  return fetchLayout(language);
}