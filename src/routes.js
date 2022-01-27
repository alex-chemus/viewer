import Popular from '@src/views/Popular/Popular.vue'
import Page from '@src/views/Page/Page.vue'
import Watchlist from '@src/views/Watchlist/Watchlist.vue'
import NotFound from '@src/views/NotFound/NotFound.vue'

const routes = [
  { path: '/', redirect: '/popular/movies' },
  { path: '/popular/:type', component: Popular },
  { path: '/:type/:id', component: Page },
  { path: '/watchlist', component: Watchlist },
  { path: '/:pathMatch(.*)', component: NotFound, alias: '/notfound' }
]

export default routes