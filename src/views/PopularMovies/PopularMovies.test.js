const axios = require('axios')
jest.mock('axios')

describe('PopularMovies component', () => {
  test('should not fetch data', async ()  => {
    expect(axios.mock.calls.length).toEqual(0)
  })
})