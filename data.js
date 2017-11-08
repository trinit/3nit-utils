'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isServer = typeof window === 'undefined';

var API = process.env.NODE_ENV === 'development' ? 'http://l:4000/api' : isServer ? 'http://localhost:8046/api' : '/api';

var find = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(model) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _superagent2.default.get(API + '/' + model);

          case 2:
            res = _context.sent;
            return _context.abrupt('return', res.body);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function find(_x) {
    return _ref.apply(this, arguments);
  };
}();

var get = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(model, id) {
    var res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _superagent2.default.get(API + '/' + model + '/' + id);

          case 2:
            res = _context2.sent;
            return _context2.abrupt('return', res.body);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function get(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getByCode = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(model, code) {
    var res;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _superagent2.default.get(API + '/' + model + '/code/' + code);

          case 2:
            res = _context3.sent;
            return _context3.abrupt('return', res.body);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getByCode(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var getByPath = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(model) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
    var res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _superagent2.default.get(API + '/' + model + '/path?value=' + encodeURIComponent(path));

          case 2:
            res = _context4.sent;
            return _context4.abrupt('return', res.body);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getByPath(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

var create = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(model, data) {
    var res;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _superagent2.default.post(API + '/' + model, data);

          case 2:
            res = _context5.sent;
            return _context5.abrupt('return', res.body);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function create(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var update = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(model, id, data) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _superagent2.default.put(API + '/' + model + '/' + id, data);

          case 3:
            _context6.next = 8;
            break;

          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6['catch'](0);

            (0, _debug2.default)('dev')(_context6.t0);

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 5]]);
  }));

  return function update(_x10, _x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var post = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(path, data) {
    var res;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _superagent2.default.post(API + '/' + path, data);

          case 2:
            res = _context7.sent;
            return _context7.abrupt('return', res.body);

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function post(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var custom = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(path) {
    var res;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _superagent2.default.get(API + '/' + path);

          case 2:
            res = _context8.sent;
            return _context8.abrupt('return', res.body);

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function custom(_x15) {
    return _ref8.apply(this, arguments);
  };
}();

exports.default = { find: find, get: get, getByCode: getByCode, getByPath: getByPath, create: create, update: update, post: post, custom: custom };