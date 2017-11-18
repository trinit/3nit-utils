import crypto from 'crypto'

const hash = (salt, password) =>
  crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64'), 10000, 64, 'sha1').toString('base64')

const saltHash = password => {
  const salt = crypto.randomBytes(16).toString('base64')
  return {salt, hash: hash(salt, password)}
}

const register = async ({User, email, password}) =>
  new Promise(async (resolve, reject) => {
    if (!email || !password) reject(new Error('Validation failed'))
    else if (await User.findOne({email})) reject(new Error('User already exists'))
    else resolve(await new User({email, ...saltHash(password)}).save())
  })

const auth = async ({User, email, password}) =>
  new Promise(async (resolve, reject) => {
    if (!email || !password) return reject(new Error('Validation failed'))
    const user = await User.findOne({email})
    if (!user) reject(new Error('No user found'))
    else if (hash(user.salt, password) === user.hash) resolve(user)
    else reject(new Error('Incorrect username or password'))
  })

export default {register, auth, hash, saltHash}
