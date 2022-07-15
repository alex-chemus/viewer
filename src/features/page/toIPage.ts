import { IPage } from "./types"

const toIPage = (data: any) => ({
  genreList: data.genreList,
  imDbRating: data.imDbRating,
  plot: data.plot,
  year: data.year,
  directors: data.directors,
  stars: data.stars,
  runtimeStr: data.runtimeStr,
  companies: data.companies,
  boxOffice: data.boxOffice,
  countries: data.countries,
  similars: data.similars,
  id: data.id,
  image: data.image,
  title: data.title
} as IPage)

export default toIPage