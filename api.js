'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _toys = require('toys');

var _toys2 = _interopRequireDefault(_toys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var wrap = _toys2.default.handler;

var ping = function ping() {
  return 'pong';
};

var GET = function GET(path, handler) {
  return { method: 'GET', path: path, handler: wrap(handler) };
};
var PUT = function PUT(path, handler) {
  return { method: 'PUT', path: path, handler: wrap(handler) };
};
var POST = function POST(path, handler) {
  return { method: 'POST', path: path, handler: wrap(handler) };
};

var base = function base(_ref) {
  var path = _ref.path,
      Model = _ref.Model;
  return [_extends({}, GET('/api/' + path, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, reply) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = reply;
              _context.next = 3;
              return Model.find().sort('sequence -date -delivery').populate('user').batchSize(10000);

            case 3:
              _context.t1 = _context.sent;
              return _context.abrupt('return', (0, _context.t0)(_context.t1));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }())), _extends({}, GET('/api/' + path + '/code/{code}', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, reply) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = reply;
              _context2.next = 3;
              return Model.findOne({ code: req.params.code });

            case 3:
              _context2.t1 = _context2.sent;
              return _context2.abrupt('return', (0, _context2.t0)(_context2.t1));

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }())), _extends({}, GET('/api/' + path + '/path', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, reply) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = reply;
              _context3.next = 3;
              return Model.findOne({ path: req.query.value });

            case 3:
              _context3.t1 = _context3.sent;
              return _context3.abrupt('return', (0, _context3.t0)(_context3.t1));

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }())), _extends({}, GET('/api/' + path + '/{id}', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, reply) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = reply;
              _context4.next = 3;
              return Model.findOne({ _id: req.params.id });

            case 3:
              _context4.t1 = _context4.sent;
              return _context4.abrupt('return', (0, _context4.t0)(_context4.t1));

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }())), _extends({}, POST('/api/' + path, function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, reply) {
      var result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              delete req.payload._id;
              _context5.next = 3;
              return new Model(req.payload).save();

            case 3:
              result = _context5.sent;

              reply(result);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
      return _ref6.apply(this, arguments);
    };
  }())), _extends({}, PUT('/api/' + path + '/{id}', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, reply) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = Object;
              _context6.next = 3;
              return Model.findOne({ _id: req.params.id });

            case 3:
              _context6.t1 = _context6.sent;
              _context6.t2 = req.payload;
              _context6.next = 7;
              return _context6.t0.assign.call(_context6.t0, _context6.t1, _context6.t2).save();

            case 7:
              reply('Update complete');

            case 8:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }()))];
};

exports.default = { ping: ping, base: base, GET: GET, PUT: PUT, POST: POST };