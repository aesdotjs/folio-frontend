export default async function (language = "") {
  const storyapi = useStoryApi();
  const { data } = await storyapi.get("cdn/stories/home", { version: "draft", resolve_relations: ["TechGroup.technos"], language });
  const home = reactive({
    story: data.story,
  })
  return { home };
}