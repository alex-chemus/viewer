/*
  стор нужен для кеширования данных о фильме, чтобы не отправлять запрос.
  данные:
    - объект фильма/серика для его страницы
    - карточки фильмы/серика для главной страницы и вотчлиста
*/

const initStore = {
  state: {
    pages: [],
    apiKey: 'k_zealvkev',
    url: 'https://imdb-api.com/en/API'
  },

  mutations: {
    addPage(state, value) {
      state.pages.push(value)
    },
  },

  getters: {
    getPage(state) {
      return id => state.pages.find(item => item.id === id)
    },

    hasPage(state) {
      return id => !!state.pages.find(item => item.id === id)
    },

    url(state) {
      return state.url
    },

    apiKey(state) {
      return state.apiKey
    }
  }
}

export default initStore