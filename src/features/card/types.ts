import { Content } from "@shared"

export interface ICard {
  title: string,
  year?: string,
  imDbRating?: string,
  image: string,
  id: string,
  type?: Content,
  //i?: number
}