/* global describe, test, expect */
import hapi from '@hapi/hapi'
import server from '../src/server'

beforeAll(async done => {
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
})

describe('server', () => {
  test('init', async () => {
    expect(init.length).toBeGreaterThan(0)
  })
})
 -
