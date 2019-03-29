import superagent from 'superagent'
import superagentQueue from 'superagent-d2l-queue'
import {stringify} from 'qs'
// import debug from 'debug'

const isServer = typeof window === 'undefined'

const setToken = value => (token = value)
let token

const API = process.env.NODE_ENV === 'development'
  ? process.env.API_ENDPOINT ? process.env.API_ENDPOINT : 'http://l:4000/api'
  : isServer ? `http://localhost:${process.env.PORT}/api` : '/api'

const find = async (model, filters) => {
  const query = filters ? '/find/' + stringify(filters) : ''
  const res = await superagent
    .get(`${API}/${model}${query}`)
    .use(superagentQueue({queue: []}))
    .set('Authorization', `${token}`)
  return res.body
}

const get = async (model, id) => {
  const res = await superagent
    .get(`${API}/${model}/${id}`)
    .use(superagentQueue({queue: []}))
    .set('Authorization', `${token}`)
  return res.body
}

const getByCode = async (model, code) => {
  const res = await superagent
    .get(`${API}/${model}/code/${code}`)
    .use(superagentQueue({queue: []}))
    .set('Authorization', `${token}`)
  return res.body
}

const getByPath = async (model, path = '/') => {
  const res = await superagent
    .get(`${API}/${model}/path?value=${encodeURIComponent(path)}`)
    .use(superagentQueue({queue: []}))
    .set('Authorization', `${token}`)
  return res.body
}

const getByKey = async (model, key) => {
  const res = await superagent
    .get(`${API}/${model}/key?key=${encodeURIComponent(key)}`)
    .use(superagentQueue({queue: []}))
    .set('Authorization', `${token}`)
  return res.body
}

const create = async (model, data) => {
  const res = await superagent
    .post(`${API}/${model}`, data)
    .set('Authorization', `${token}`)
  return res.body
}

const update = async (model, id, data) => {
  const res = await superagent
    .put(`${API}/${model}/${id}`, data)
    .set('Authorization', `${token}`)
  return res.body
  /* } catch (e) {
    debug('dev')(e)
  } */
}

const post = async (path, data) => {
  const res = await superagent
    .post(`${API}/${path}`, data)
    .set('Authorization', `${token}`)
  return res.body
}

const remove = async (model, id) => {
  await superagent
    .del(`${API}/${model}/${id}`)
    .set('Authorization', `${token}`)
  return 'removed'
}

const custom = async (path, filters) => {
  const query = filters ? '/' + stringify(filters) : ''
  const res = await superagent
    .get(`${API}/${path}${query}`)
    .use(superagentQueue({queue: []}))
    .set('Authorization', `${token}`)
  return res.body
}

export default {setToken, find, get, getByCode, getByPath, getByKey, create, update, post, remove, custom}
