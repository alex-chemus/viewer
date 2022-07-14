export type Content = 'movies' | 'series'

export interface IPage {
  title: string,
  genreList: {
    key: string,
    value: string
  }[],
  imDbRating: string | null,
  plot: string,
  year: string,
  directors: string,
  stars: string,
  runtimeStr: string | null,
  companies: string,
  countries: string,
  boxOffice: {
    budget: string,
    cumulativeWorldwideGross: string
  },
  similars?: {
    title: string,
    imDbRating: string | null,
    image: string,
    id: string,
    i: number
  }[]
}

export interface ICard {
  title: string,
  year?: string,
  imDbRating: string,
  image: string,
  id: string,
  type?: Content,
  i?: number
}

// export interface IStorage {}

// export interface IPopupItem {}
