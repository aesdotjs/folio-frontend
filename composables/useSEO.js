export default function (layout, SEO) {
  const { favIcon, siteName } = layout.site[0];
  const { defaultSEO } = layout;
  const fullSEO = {
    ...defaultSEO[0],
    ...SEO
  };
  return useMeta({
    title: `${fullSEO.metaTitle} | ${siteName}`,
    meta: getMetaTags(fullSEO),
    link: [
      {
        rel: "favicon",
        href: favIcon.filename,
      },
    ],
  });
}