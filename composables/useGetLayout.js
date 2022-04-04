export default async function (language = "") {
  const storyapi = useStoryApi();
  const { data } = await storyapi.get("cdn/stories/layout", { version: "draft", resolve_relations: "social.icon", language });
  const layout = reactive({
    story: data.story,
  })
  return { layout };
}