/* global describe, test, expect */
import hapi from '@hapi/hapi'
import server from '../src/server'

describe('server', () => {
  test('init', async () => {
    const app = {
      prepare: () => new Promise((resolve, reject) => resolve()),
      getRequestHandler: () => {}
    }
    const init = await server.init({
      server: new hapi.Server(),
      port: 4000,
      app,
      routes: []
    })
    expect(init.length).toBeGreaterThan(0)
  })
})
