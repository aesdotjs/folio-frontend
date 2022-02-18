export default async function () {
  const { find } = useStrapi4()
  const { data } = await useAsyncData(
    'homepage',
    () => find('homepage', { populate : "*"})
  )
  return { data }
}