import debug from 'debug'

const key = {
  type: String,
  unique: true,
  trim: true,
  index: true
}

const models = []
const instance = []

const init = async (mongoose, uri, schemas) =>
  new Promise(async (resolve, reject) => {
    mongoose.Promise = global.Promise
    debug('db')('Connecting to db')
    mongoose.connect(uri, {useNewUrlParser: true})
    const db = mongoose.connection
    db.on('error', e => {
      console.error(e)
      debug('db')(`⚠️ Error connecting to database on uri ${uri}`)
    })
    db.once('open', () => {
      debug('db')('⚡️ Connected to database')
      instance.push(mongoose)
      schemas.forEach(({name, path, schema}) => {
        mongoose.model(name, schema)
        models.push({path, Model: mongoose.model(name)})
      })
      resolve()
    })
  })

const mongoose = () => instance[0]

export default {init, key, models, mongoose}
