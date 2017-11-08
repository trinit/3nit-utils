'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var defaultHandlerWrapper = function defaultHandlerWrapper(app) {
  var handler = app.getRequestHandler();
  return function (_ref, hapiReply) {
    var raw = _ref.raw,
        url = _ref.url;
    return handler(raw.req, raw.res, url).then(function () {
      return hapiReply.close(false);
    });
  };
};

var init = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var _ref2$server = _ref2.server,
        server = _ref2$server === undefined ? new _hapi2.default.Server() : _ref2$server,
        port = _ref2.port,
        app = _ref2.app,
        routes = _ref2.routes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', app.prepare().then(function () {
              server.connection({ port: port });
              server.register([]).then(function () {
                routes.forEach(function (route) {
                  return server.route(route);
                });

                server.route({
                  method: 'GET',
                  path: '/{p*}',
                  handler: defaultHandlerWrapper(app)
                });

                server.start().catch(function (error) {
                  (0, _debug2.default)('dev')('Error starting server');
                  (0, _debug2.default)('dev')(error);
                }).then(function () {
                  (0, _debug2.default)('dev')('> Ready on http://localhost:' + port);
                });
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function init(_x) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = { defaultHandlerWrapper: defaultHandlerWrapper, init: init };