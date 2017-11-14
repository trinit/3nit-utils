/* global describe, test, expect */

import Toys from 'toys'
import api from '../src/api'

const wrap = Toys.handler

describe('api', () => {
  test('ping', () => {
    expect(api.ping()).toBe('pong')
  })

  test('GET', () => {
    expect(
      JSON.stringify(api.GET('test', () => {})))
        .toEqual(JSON.stringify({handler: wrap(() => {}), method: 'GET', path: 'test'}))
  })

  test('PUT', () => {
    expect(
      JSON.stringify(api.PUT('test', () => {})))
        .toEqual(JSON.stringify({handler: wrap(() => {}), method: 'PUT', path: 'test'}))
  })

  test('POST', () => {
    expect(
      JSON.stringify(api.POST('test', () => {})))
        .toEqual(JSON.stringify({handler: wrap(() => {}), method: 'POST', path: 'test'}))
  })

  test('base', () => {
    const path = 'test'
    const Model = {}
    const result = JSON.stringify(api.base({path, Model}))

    expect(result).toEqual(JSON.stringify([
      {
        ...api.GET(`/api/${path}`, () => {})
      },
      {
        ...api.GET(`/api/${path}/code/{code}`, () => {})
      },
      {
        ...api.GET(`/api/${path}/path`, () => {})
      },
      {
        ...api.GET(`/api/${path}/{id}`, () => {})
      },
      {
        ...api.POST(`/api/${path}`, () => {})
      },
      {
        ...api.PUT(`/api/${path}/{id}`, () => {})
      }
    ]))
  })
})
