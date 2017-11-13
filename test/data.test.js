/* global describe, test, expect, beforeAll */

import hapi from 'hapi'
// import data from '../src/data'
import debug from 'debug'

beforeAll(async (done) => {
  const port = 4000
  const server = new hapi.Server()
  server.connection({ port })
  server.register([]).then(() => {
    // routes.forEach(route => server.route(route))

    server.start().catch(error => {
      debug('dev')('Error starting server')
      debug('dev')(error)
    }).then(() => {
      debug('dev')('> Ready on http://localhost:' + port)
      done()
    })
  })
})

describe('api', () => {
  test('find', () => {
    expect(0).toEqual(0)
  })
})
