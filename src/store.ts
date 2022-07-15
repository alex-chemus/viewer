import { InjectionKey } from 'vue';
import { Store, createStore } from 'vuex';
import { IPage } from "./features/page"
/*
  стор нужен для кеширования данных о фильме, чтобы не отправлять запрос.
  данные:
    - объект фильма/серика для его страницы
    - карточки фильмы/серика для главной страницы и вотчлиста
*/

export interface State {
  pages: IPage[],
  apiKey: string,
  url: string,
  isDarkTheme: boolean
}

export type Key = InjectionKey<Store<State>>

export const store = createStore<State>({
  state: {
    pages: [],
    apiKey: 'k_zealvkev',
    url: 'https://imdb-api.com/en/API',
    isDarkTheme: false,
  },

  mutations: {
    addPage(state, value: IPage) {
      state.pages.push(value);
    },
  },

  getters: {
    getPage(state) {
      return (id: string) => state.pages.find((item) => item.id === id);
    },

    hasPage(state) {
      return (id: string) => !!state.pages.find((item) => item.id === id);
    },

    url(state) {
      return state.url;
    },

    apiKey(state) {
      return state.apiKey;
    },
  },
});

// export default initStore
