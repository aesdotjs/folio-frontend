export default function (layout, SEO, language = "en") {
  const { favIcon, siteName } = layout.site[0];
  const { defaultSEO } = layout;
  const fullSEO = {
    ...defaultSEO[0],
    ...SEO
  };
  return useHead({
    title: `${fullSEO.metaTitle} | ${siteName}`,
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