export type Content = 'movies' | 'series'

export interface IStorage {
  title: string,
  imDbRating?: string,
  type: Content,
  id: string 
}