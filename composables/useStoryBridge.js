var useStoryBridge = (id, cb, options = {}) => {
  if (typeof window === "undefined")
    return;
  const app = useNuxtApp();
  app.$storybridge(() => {
    const sbBridge = new window.StoryblokBridge(options);
    sbBridge.on(["input", "published", "change"], (event) => {
      if (event.action == "input" && event.story.id === id)
        cb(event.story);
    });
  }, (error) => {
    console.error(error);
  });
};
export default useStoryBridge;