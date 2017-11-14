/* global describe, test, expect */

import superagent from 'superagent'
import mock from './config/mock'

import data from '../src/data'
require('superagent-mock')(superagent, mock)

describe('api', () => {
  test('find', async () => {
    expect(await data.find('test')).toEqual({items: []})
  })

  test('get/id', async () => {
    expect(await data.find('test/id')).toEqual({})
  })
})
