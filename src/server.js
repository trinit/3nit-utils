import debug from 'debug'
import hapi from 'hapi'

const defaultHandlerWrapper = app => {
  const handler = app.getRequestHandler()
  return ({ raw, url }, hapiReply) => handler(raw.req, raw.res, url).then(() => hapiReply.close(false))
}

const init = async ({server = new hapi.Server(), port, app, routes}) =>
  app.prepare().then(() => {
    server.connection({ port })
    server.register([]).then(() => {
      routes.forEach(route => server.route(route))

      server.route({
        method: 'GET',
        path: '/{p*}',
        handler: defaultHandlerWrapper(app)
      })

      server.start().catch(error => {
        debug('dev')('Error starting server')
        debug('dev')(error)
      }).then(() => {
        debug('dev')('> Ready on http://localhost:' + port)
      })
    })
  })

export default {defaultHandlerWrapper, init}
