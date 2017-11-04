'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isServer = typeof window === 'undefined';

const API = process.env.NODE_ENV === 'development' ? 'http://l:4000/api' : isServer ? 'http://localhost:8046/api' : '/api';

const find = async model => {
  const res = await _superagent2.default.get(`${API}/${model}`);
  return res.body;
};

const get = async (model, id) => {
  const res = await _superagent2.default.get(`${API}/${model}/${id}`);
  return res.body;
};

const getByCode = async (model, code) => {
  const res = await _superagent2.default.get(`${API}/${model}/code/${code}`);
  return res.body;
};

const getByPath = async function (model) {
  let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

  const res = await _superagent2.default.get(`${API}/${model}/path?value=${encodeURIComponent(path)}`);
  return res.body;
};

const create = async (model, data) => {
  const res = await _superagent2.default.post(`${API}/${model}`, data);
  return res.body;
};

const update = async (model, id, data) => {
  try {
    await _superagent2.default.put(`${API}/${model}/${id}`, data);
  } catch (e) {
    (0, _debug2.default)('dev')(e);
  }
};

const post = async (path, data) => {
  const res = await _superagent2.default.post(`${API}/${path}`, data);
  return res.body;
};

const custom = async path => {
  const res = await _superagent2.default.get(`${API}/${path}`);
  return res.body;
};

exports.default = { find, get, getByCode, getByPath, create, update, post, custom };