import debug from 'debug'

const key = {
  type: String,
  unique: true,
  trim: true,
  index: true
}

const models = []

const init = async (mongoose, uri, schemas) =>
  new Promise(async (resolve, reject) => {
    mongoose.Promise = global.Promise
    debug('db')('Connecting to db')
    mongoose.connect(uri, {useMongoClient: true})
    const db = mongoose.connection
    db.on('error', () => debug('db')('⚠️ Error connecting to database'))
    db.once('open', () => {
      debug('db')('⚡️ Connected to database')
      schemas.forEach(({name, path, schema}) => {
        mongoose.model(name, schema)
        models.push({path, Model: mongoose.model(name)})
      })
      resolve()
    })
  })

export default {init, key, models}
