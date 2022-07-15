import { ComputedRef, Ref } from 'vue'
import { Content, IStorage } from '../types'

type Watchlist = {
  movies: IStorage[],
  series: IStorage[]
}

type Info = ComputedRef<IStorage | null> | Ref<IStorage | null>
type ContentType = Ref<Content | null> | Content

const useWatchlist = (contentType: ContentType, info: Info) => {  
  // contentType is a ref
  if (contentType !== 'movies' && contentType !== 'series') {
    
    return () => {
      if (!info.value || !contentType.value) return

      if (!localStorage.getItem('watchlist')) {
        const watchlist: Watchlist = {
          movies: [],
          series: [],
        };
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
      }
      
      const watchlist: Watchlist = JSON.parse(localStorage.getItem('watchlist') as string)
      const isInList = watchlist[contentType.value]
        .find((item: IStorage) => item.id === info.value?.id)
      if (isInList) return

      watchlist[contentType.value].push({
        title: info.value.title,
        imDbRating: info.value.imDbRating,
        type: contentType.value,
        id: info.value.id,
      } as IStorage)

      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }

  } else {

    return () => {
      //console.log('content type: ', contentType)
      if (!info.value) return
  
      // create watchlist if there's none in the local storage
      if (!localStorage.getItem('watchlist')) {
        const watchlist: Watchlist = {
          movies: [],
          series: [],
        };
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
      }
  
      const watchlist: Watchlist = JSON.parse(localStorage.getItem('watchlist') as string)
      const isInList = watchlist[contentType]
        .find((item: IStorage) => item.id === info.value?.id)
      if (isInList) return
  
      watchlist[contentType].push({
        title: info.value.title,
        imDbRating: info.value.imDbRating,
        type: contentType,
        id: info.value.id,
      } as IStorage)
  
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }

  }
}

export default useWatchlist