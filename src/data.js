/* global localStorage */
import superagent from 'superagent'
import debug from 'debug'

const isServer = typeof window === 'undefined'

const API = process.env.NODE_ENV === 'development'
  ? process.env.API_ENDPOINT ? process.env.API_ENDPOINT : 'http://l:4000/api'
  : isServer ? `http://localhost:${process.env.PORT}/api` : '/api'

const find = async (model, token = localStorage.getItem('token')) => {
  const res = await superagent
    .get(`${API}/${model}`)
    .set('Authorization', `${token}`)
  return res.body
}

const get = async (model, id, token = localStorage.getItem('token')) => {
  const res = await superagent
    .get(`${API}/${model}/${id}`)
    .set('Authorization', `${token}`)
  return res.body
}

const getByCode = async (model, code, token = localStorage.getItem('token')) => {
  const res = await superagent
    .get(`${API}/${model}/code/${code}`)
    .set('Authorization', `${token}`)
  return res.body
}

const getByPath = async (model, path = '/', token = localStorage.getItem('token')) => {
  const res = await superagent
    .get(`${API}/${model}/path?value=${encodeURIComponent(path)}`)
    .set('Authorization', `${token}`)
  return res.body
}

const getByKey = async (model, key, token = localStorage.getItem('token')) => {
  const res = await superagent
    .get(`${API}/${model}/key?key=${encodeURIComponent(key)}`)
    .set('Authorization', `${token}`)
  return res.body
}

const create = async (model, data, token = localStorage.getItem('token')) => {
  const res = await superagent
    .post(`${API}/${model}`, data)
    .set('Authorization', `${token}`)
  return res.body
}

const update = async (model, id, data, token = localStorage.getItem('token')) => {
  try {
    await superagent
      .put(`${API}/${model}/${id}`, data)
      .set('Authorization', `${token}`)
  } catch (e) {
    debug('dev')(e)
  }
}

const post = async (path, data, token = localStorage.getItem('token')) => {
  const res = await superagent
    .post(`${API}/${path}`, data)
    .set('Authorization', `${token}`)
  return res.body
}

const remove = async (model, id, token = localStorage.getItem('token')) => {
  await superagent
    .del(`${API}/${model}/${id}`)
    .set('Authorization', `${token}`)
  return 'removed'
}

const custom = async (path, token = localStorage.getItem('token')) => {
  const res = await superagent
    .get(`${API}/${path}`)
    .set('Authorization', `${token}`)
  return res.body
}

export default {find, get, getByCode, getByPath, getByKey, create, update, post, remove, custom}
