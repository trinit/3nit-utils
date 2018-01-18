import superagent from 'superagent'
import debug from 'debug'

const isServer = typeof window === 'undefined'

const API = process.env.NODE_ENV === 'development' ? 'http://l:4000/api'
  : isServer ? `http://localhost:${process.env.PORT}/api` : '/api'

const find = async (model) => {
  const res = await superagent.get(`${API}/${model}`)
  return res.body
}

const get = async (model, id) => {
  const res = await superagent.get(`${API}/${model}/${id}`)
  return res.body
}

const getByCode = async (model, code) => {
  const res = await superagent.get(`${API}/${model}/code/${code}`)
  return res.body
}

const getByPath = async (model, path = '/') => {
  const res = await superagent.get(`${API}/${model}/path?value=${encodeURIComponent(path)}`)
  return res.body
}

const getByKey = async (model, key) => {
  const res = await superagent.get(`${API}/${model}/key?key=${encodeURIComponent(key)}`)
  return res.body
}

const create = async (model, data) => {
  const res = await superagent.post(`${API}/${model}`, data)
  return res.body
}

const update = async (model, id, data) => {
  try {
    await superagent.put(`${API}/${model}/${id}`, data)
  } catch (e) {
    debug('dev')(e)
  }
}

const post = async (path, data) => {
  const res = await superagent.post(`${API}/${path}`, data)
  return res.body
}

const remove = async (model, id) => {
  await superagent.del(`${API}/${model}/${id}`)
  return 'removed'
}

const custom = async path => {
  const res = await superagent.get(`${API}/${path}`)
  return res.body
}

export default {find, get, getByCode, getByPath, getByKey, create, update, post, remove, custom}
