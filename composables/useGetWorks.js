export default async function (language = "") {
  const storyapi = useStoryApi();
  const data  = await storyapi.getAll("cdn/stories", { starts_with: "works", version: "draft", resolve_relations: "work.technos", language });
  const works = reactive(data);
  return { works };
}