/*
  стор нужен для кеширования данных о фильме, чтобы не отправлять запрос.
  данные:
    - объект фильма/серика для его страницы
    - карточки фильмы/серика для главной страницы и вотчлиста
*/

const initStore = {
  state: {
    pages: [],
    moviesCards: [],
    seriesCards: [],
    apiKey: 'k_zealvkev',
    url: 'https://imdb-api.com/en/API'
  },

  mutations: {
    addPage(state, value) {
      state.pages.push(...value)
    },

    addMoviesCards(state, value) {
      state.moviesCards.push(...value)
    },

    addSeriesCards(state, value) {
      state.seriesCards.push(...value)
    }
  }
}

export default initStore