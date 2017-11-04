'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultHandlerWrapper = app => {
  const handler = app.getRequestHandler();
  return (_ref, hapiReply) => {
    let raw = _ref.raw,
        url = _ref.url;
    return handler(raw.req, raw.res, url).then(() => hapiReply.close(false));
  };
};

const init = async (_ref2) => {
  var _ref2$server = _ref2.server;
  let server = _ref2$server === undefined ? new _hapi2.default.Server() : _ref2$server,
      port = _ref2.port,
      app = _ref2.app,
      routes = _ref2.routes;
  return app.prepare().then(() => {
    server.connection({ port });
    server.register([]).then(() => {
      routes.forEach(route => server.route(route));

      server.route({
        method: 'GET',
        path: '/{p*}',
        handler: defaultHandlerWrapper(app)
      });

      server.start().catch(error => {
        (0, _debug2.default)('dev')('Error starting server');
        (0, _debug2.default)('dev')(error);
      }).then(() => {
        (0, _debug2.default)('dev')('> Ready on http://localhost:' + port);
      });
    });
  });
};

exports.default = { defaultHandlerWrapper, init };