'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var hash = function hash(salt, password) {
  return _crypto2.default.pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64, 'sha1').toString('base64');
};

var saltHash = function saltHash(password) {
  var salt = _crypto2.default.randomBytes(16).toString('base64');
  return { salt: salt, hash: hash(salt, password) };
};

var register = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var email = _ref.email,
        password = _ref.password,
        customer = _ref.customer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new Promise(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                var User;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        User = _db2.default.model('User');

                        if (!(!email || !password || !customer)) {
                          _context.next = 5;
                          break;
                        }

                        reject('Validation failed');
                        _context.next = 16;
                        break;

                      case 5:
                        _context.next = 7;
                        return User.findOne({ email: email });

                      case 7:
                        if (!_context.sent) {
                          _context.next = 11;
                          break;
                        }

                        reject('User already exists');
                        _context.next = 16;
                        break;

                      case 11:
                        _context.t0 = resolve;
                        _context.next = 14;
                        return new User(_extends({ email: email, customer: customer }, saltHash(password))).save();

                      case 14:
                        _context.t1 = _context.sent;
                        (0, _context.t0)(_context.t1);

                      case 16:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2, _x3) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function register(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var auth = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
    var email = _ref4.email,
        password = _ref4.password;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', new Promise(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
                var User, user;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        User = _db2.default.model('User');

                        if (!(!email || !password)) {
                          _context3.next = 3;
                          break;
                        }

                        return _context3.abrupt('return', reject('Validation failed'));

                      case 3:
                        _context3.next = 5;
                        return User.findOne({ email: email });

                      case 5:
                        user = _context3.sent;

                        if (!user) reject('No user found');else if (hash(user.salt, password) === user.hash) resolve(user);else reject('Incorrect username or password');

                      case 7:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x5, _x6) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function auth(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = { register: register, auth: auth };