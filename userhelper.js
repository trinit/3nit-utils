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

const hash = (salt, password) => _crypto2.default.pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64, 'sha1').toString('base64');

const saltHash = password => {
  const salt = _crypto2.default.randomBytes(16).toString('base64');
  return { salt, hash: hash(salt, password) };
};

const register = async (_ref) => {
  let email = _ref.email,
      password = _ref.password,
      customer = _ref.customer;
  return new Promise(async (resolve, reject) => {
    const User = _db2.default.model('User');
    if (!email || !password || !customer) reject('Validation failed');else if (await User.findOne({ email })) reject('User already exists');else resolve((await new User(_extends({ email, customer }, saltHash(password))).save()));
  });
};

const auth = async (_ref2) => {
  let email = _ref2.email,
      password = _ref2.password;
  return new Promise(async (resolve, reject) => {
    const User = _db2.default.model('User');
    if (!email || !password) return reject('Validation failed');
    const user = await User.findOne({ email });
    if (!user) reject('No user found');else if (hash(user.salt, password) === user.hash) resolve(user);else reject('Incorrect username or password');
  });
};

exports.default = { register, auth };