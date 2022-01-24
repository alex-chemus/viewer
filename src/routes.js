import Popular from '@views/Popular/Popular.vue'
import Page from '@views/Page/Page.vue'
import Watchlist from '@views/Watchlist/Watchlist.vue'
import NotFound from '@views/NotFound/NotFound.vue'

const routes = [
  //{ path: '/', component: PopularMovies, alias: '/popular-movies' },
  //{ path: '/popular-series', component: PopularSeries },
  //{ path: '/', component: Popular, alias: '/popular/movies' },
  { path: '/', redirect: '/popular/movies' },
  { path: '/popular/:type', component: Popular },
  { path: '/:type/:id', component: Page },
  { path: '/watchlist', component: Watchlist },
  { path: '/:pathMatch(.*)', component: NotFound }
]

export default routes