export default async function () {
  const { find } = useStrapi4()
  const { data } = await useAsyncData(
    'global',
    () => find('global', { populate : ["SiteName","favIcon","siteIcon","defaultSeo.shareImage"]})
  )
  return { data }
}