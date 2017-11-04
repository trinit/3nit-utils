'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _toys = require('toys');

var _toys2 = _interopRequireDefault(_toys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const wrap = _toys2.default.handler;

const ping = () => `pong`;

const GET = (path, handler) => ({ method: 'GET', path, handler: wrap(handler) });
const PUT = (path, handler) => ({ method: 'PUT', path, handler: wrap(handler) });
const POST = (path, handler) => ({ method: 'POST', path, handler: wrap(handler) });

const base = (_ref) => {
  let path = _ref.path,
      Model = _ref.Model;
  return [_extends({}, GET(`/api/${path}`, async (req, reply) => reply((await Model.find().sort('sequence -date -delivery').populate('user').batchSize(10000))))), _extends({}, GET(`/api/${path}/code/{code}`, async (req, reply) => reply((await Model.findOne({ code: req.params.code }))))), _extends({}, GET(`/api/${path}/path`, async (req, reply) => reply((await Model.findOne({ path: req.query.value }))))), _extends({}, GET(`/api/${path}/{id}`, async (req, reply) => reply((await Model.findOne({ _id: req.params.id }))))), _extends({}, POST(`/api/${path}`, async (req, reply) => {
    delete req.payload._id;
    const result = await new Model(req.payload).save();
    reply(result);
  })), _extends({}, PUT(`/api/${path}/{id}`, async (req, reply) => {
    await Object.assign((await Model.findOne({ _id: req.params.id })), req.payload).save();
    reply('Update complete');
  }))];
};

exports.default = { ping, base, GET, PUT, POST };