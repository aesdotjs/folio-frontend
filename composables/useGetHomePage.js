export default async function () {
  const storyapi = useStoryApi();
  const { data } = await storyapi.get("cdn/stories/home", { version: "draft", resolve_relations: "" });
  const home = reactive({
    story: data.story,
  })
  return { home };
}