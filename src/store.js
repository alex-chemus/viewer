/*
  стор нужен для кеширования данных о фильме, чтобы не отправлять запрос.
  данные:
    - объект фильма/серика для его страницы
    - карточки фильмы/серика для главной страницы и вотчлиста
*/

const initStore = {
  state: {
    pages: [],
    cards: []
  },

  mutations: {
    addPage(state, value) {
      state.pages.push(value)
    },

    addCard(state, value) {
      state.cards.push(value)
    },
  }
}

export default initStore