const key = {
  type: String,
  unique: true,
  trim: true,
  index: true
}

const models = []

const init = async (mongoose, uri) =>
  new Promise(async (resolve, reject) => {
    mongoose.Promise = global.Promise

    const {Schema} = mongoose
    const {Types} = Schema
    const {String, Number, Mixed, ObjectId} = Types
    mongoose.connect(uri, {useMongoClient: true})
    console.log('Connecting to db')
    const db = mongoose.connection
    db.on('error', console.error.bind(console, '⚠️ Error connecting to database'))
    db.once('open', () => {
      console.log('⚡️ Connected to database')
      mongoose.model('Setting', new Schema({
        key,
        value: Mixed
      }))
      mongoose.model('Product', new Schema({
        key,
        group: String,
        nl: String,
        fr: String,
        unit: String,
        type: String,
        basic: Boolean,
        nutrition: Mixed
      }))

      mongoose.model('Customer', new Schema({
        code: {
          type: String,
          unique: true,
          trim: true,
          index: true
        },
        name: String,
        name2: String,
        email: String,
        website: String,
        lang: String,
        active: Boolean,
        status: String,
        vat: String,
        activation: String,
        assort: String,
        canOrder: String,
        addresses: Array
      }))

      mongoose.model('Page', new Schema({
        key,
        path: String,
        settings: Mixed,
        template: String,
        sequence: Number
      }))

      mongoose.model('User', new Schema({
        email: String,
        customer: String,
        salt: String,
        hash: String,
        created: {
          type: Date,
          default: Date.now
        }
      }))

      mongoose.model('Order', new Schema({
        date: {
          type: Date,
          default: Date.now
        },
        email: String,
        name: String,
        zip: String,
        delivery: Date,
        items: Mixed,
        user: {
          type: ObjectId,
          ref: 'User'
        },
        status: {
          type: String,
          default: 'created'
        },
        recurrence: Number
      }))

      models.push(...[{path: 'settings', Model: mongoose.model('Setting')},
      {path: 'products', Model: mongoose.model('Product')},
      {path: 'pages', Model: mongoose.model('Page')},
      {path: 'orders', Model: mongoose.model('Order')},
      {path: 'users', Model: mongoose.model('User')},
      {path: 'customers', Model: mongoose.model('Customer')}])

      resolve()
    })
  })

export default {init, models}
