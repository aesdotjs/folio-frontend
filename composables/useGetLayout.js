export default async function () {
  const storyapi = useStoryApi();
  const { data } = await storyapi.get("cdn/stories/layout", { version: "draft", resolve_relations: "social.icon" });
  const layout = reactive({
    story: data.story,
  })
  return { layout };
}