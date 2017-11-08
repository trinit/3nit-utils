'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var key = {
  type: String,
  unique: true,
  trim: true,
  index: true
};

var models = [];
var instance = [];

var init = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(mongoose, uri, schemas) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new Promise(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                var db;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        mongoose.Promise = global.Promise;
                        (0, _debug2.default)('db')('Connecting to db');
                        mongoose.connect(uri, { useMongoClient: true });
                        db = mongoose.connection;

                        db.on('error', function () {
                          return (0, _debug2.default)('db')('⚠️ Error connecting to database');
                        });
                        db.once('open', function () {
                          (0, _debug2.default)('db')('⚡️ Connected to database');
                          instance.push(mongoose);
                          schemas.forEach(function (_ref3) {
                            var name = _ref3.name,
                                path = _ref3.path,
                                schema = _ref3.schema;

                            mongoose.model(name, schema);
                            models.push({ path: path, Model: mongoose.model(name) });
                          });
                          resolve();
                        });

                      case 6:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function init(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var mongoose = function mongoose() {
  return instance[0];
};

exports.default = { init: init, key: key, models: models, mongoose: mongoose };