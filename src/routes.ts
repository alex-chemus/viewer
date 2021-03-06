/* eslint-disable */
//import { defineAsyncComponent } from 'vue'

//import Popular from '@/views/Popular/Popular.vue'
//import Loader from '@/components/Loader/Loader.vue'
//import NotFound from '@/views/NotFound/NotFound.vue'

// import Page from '@/views/Page/Page.vue'
/*const Page = defineAsyncComponent({
  loader: () => import('@/views/Page/Page.vue'),
  loadingComponent: Loader
})
// import Watchlist from '@/views/Watchlist/Watchlist.vue'
const Watchlist = defineAsyncComponent({
  loader: () => import('@/views/Watchlist/Watchlist.vue'),
  loadingComponent: Loader
})*/

//const Popular = () => import('./views/Popular/Popular.vue')
//const NotFound = () => import('./views/NotFound/NotFound.vue')
//const Page = () => import('./views/Page/Page.vue')
//const Watchlist = () => import('./views/Watchlist/Watchlist.vue')
/* eslint-enable */

//import Feed from './views/Feed/Feed.vue';
//import NotFound from './views/NotFound/NotFound.vue';
//import Page from './views/Page/Page.vue';
//import Watchlist from './views/Watchlist/Watchlist.vue';
const Feed = () => import('./views/Feed.vue')
const NotFound = () => import('./views/NotFound.vue')
const Page = () => import('./views/Page.vue')
const Watchlist = () => import('./views/Watchlist.vue')
const ErrorView = () => import('./views/ErrorView.vue')

// console.log('from the routes')

const routes = [
  { path: '/', redirect: '/popular/movies' },
  { path: '/popular/:type', component: Feed },
  { path: '/:type/:id', component: Page },
  { path: '/watchlist', component: Watchlist },
  { path: '/error', component: ErrorView },
  { path: '/:pathMatch(.*)', component: NotFound, alias: '/notfound' },
];

export default routes;
