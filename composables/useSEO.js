export default function (layout, SEO, language = "en") {
  const { favIcon, siteName } = layout.site[0];
  const { defaultSEO } = layout;
  const fullSEO = {
    ...defaultSEO[0],
    ...SEO
  };
  fullSEO.metaTitle = `${fullSEO.metaTitle} | ${siteName}`;
  return useHead({
    title: fullSEO.metaTitle,
    htmlAttrs: {
      lang: language
    },
    meta: getMetaTags(fullSEO),
    link: [
      {
        rel: "favicon",
        href: favIcon.filename,
      },
    ],
  });
}