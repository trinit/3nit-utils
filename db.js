'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const key = {
  type: String,
  unique: true,
  trim: true,
  index: true
};

const models = [];
const instance = [];

const init = async (mongoose, uri, schemas) => new Promise(async (resolve, reject) => {
  mongoose.Promise = global.Promise;
  (0, _debug2.default)('db')('Connecting to db');
  mongoose.connect(uri, { useMongoClient: true });
  const db = mongoose.connection;
  db.on('error', () => (0, _debug2.default)('db')('⚠️ Error connecting to database'));
  db.once('open', () => {
    (0, _debug2.default)('db')('⚡️ Connected to database');
    instance.push(mongoose);
    schemas.forEach((_ref) => {
      let name = _ref.name,
          path = _ref.path,
          schema = _ref.schema;

      mongoose.model(name, schema);
      models.push({ path, Model: mongoose.model(name) });
    });
    resolve();
  });
});

const mongoose = () => instance[0];

exports.default = { init, key, models, mongoose };