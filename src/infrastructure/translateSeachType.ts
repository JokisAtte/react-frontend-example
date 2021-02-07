export default function translateSearchType(selected: string) {
  const searchTypes = [
    ['AllFields', 'Kaikki Kentät'],
    ['Title', 'Kirjan nimi'],
    ['Author', 'Kirjailija'],
    ['Subject', 'Aihe'],
  ]

  const [[, translation]] = searchTypes.filter(type => type[0] === selected)
  return translation
}
