import crypto from 'crypto'

const mongoose = require('mongoose')

const hash = (salt, password) =>
  crypto.pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64, 'sha1').toString('base64')

const saltHash = password => {
  const salt = crypto.randomBytes(16).toString('base64')
  return {salt, hash: hash(salt, password)}
}

const register = async ({email, password, customer}) =>
  new Promise(async (resolve, reject) => {
    const User = mongoose.model('User')
    if (!email || !password || !customer) reject('Validation failed')
    else if (await User.findOne({email})) reject('User already exists')
    else resolve(await new User({email, customer, ...saltHash(password)}).save())
  })

const auth = async ({email, password}) =>
  new Promise(async (resolve, reject) => {
    const User = mongoose.model('User')
    if (!email || !password) return reject('Validation failed')
    const user = await User.findOne({email})
    if (!user) reject('No user found')
    else if (hash(user.salt, password) === user.hash) resolve(user)
    else reject('Incorrect username or password')
  })

export default {register, auth}
