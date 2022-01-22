import PopularMovies from '@views/PopularMovies/PopularMovies.vue'
import PopularSeries from '@views/PopularSeries/PopularSeries.vue'
import Page from '@views/Page/Page.vue'
import Watchlist from '@views/Watchlist/Watchlist.vue'

const routes = [
  { path: '/', component: PopularMovies, alias: '/popular-movies' },
  { path: '/popular-series', component: PopularSeries },
  { path: '/:type/:id', component: Page },
  { path: '/watchlist', component: Watchlist }
]

export default routes