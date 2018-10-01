import debug from 'debug'
import {parse} from 'qs'
import moment from 'moment'

const find = async ({Model, filters}) =>
  new Promise(async (resolve, reject) => {
    try {
      /* Example:
        const query = 'filters%5Bxxx%5D%5BfilterVal%5D=zzz&filters%5BpublicationId%5D%5BfilterType%5D=TEXT&filters%5BpublicationId%5D%5Bcomparator%5D=LIKE&filters%5BpublicationId%5D%5BcaseSensitive%5D=false&page=2&sizePerPage=10&sortField=yyy&sortOrder=desc'
        const filters = {
        filters: {
          xxx: {
            filterVal: 'zzz',
            filterType: 'TEXT',
            comparator: 'LIKE',
            caseSensitive: 'false'
          }
        },
        page: '2',
        sizePerPage: '10',
        sortField: 'yyy',
        sortOrder: 'desc'
      } */

      debug('dev')(parse(filters))
      const data = parse(filters)
      const filterQuery = data.filters
      const {sortField, sortOrder} = data
      const page = parseInt(data.page)
      const sizePerPage = parseInt(data.sizePerPage)

      const query = {}
      for (const key in filterQuery) {
        const value = filterQuery[key]
        if (typeof value === 'string' || typeof numericalValue === 'number' || typeof numericalValue === 'boolean') {
          query[key] = value
        } else {
          if (value.comparator === 'LIKE') {
            if (value.filterType === 'TEXT') {
              query[key] = {$regex: new RegExp(value.filterVal, 'i')}
            }
            if (value.filterType === 'DATE') {
              if (value.filterVal.comparator === '=') {
                query[key] = {$gte: moment(value.filterVal.date).add(-1, 'd'), $lt: moment(value.filterVal.date).add(0, 'd')}
              }
              if (value.filterVal.comparator === '>') {
                query[key] = {$gt: value.filterVal.date}
              }
              if (value.filterVal.comparator === '>=') {
                query[key] = {$gte: value.filterVal.date}
              }
              if (value.filterVal.comparator === '<') {
                query[key] = {$lt: value.filterVal.date}
              }
              if (value.filterVal.comparator === '<=') {
                query[key] = {$lte: value.filterVal.date}
              }
            }
          }
          if (value.comparator === '=') {
            query[key] = value.filterVal
          }
        }
      }

      const limit = sizePerPage || 10
      const skip = page ? (page - 1) * sizePerPage : 0
      const sort = sortField ? (sortOrder === 'desc' ? '-' + sortField : sortField) : '-created'

      debug('dev')('query:')
      debug('dev')(query)
      debug('dev')('limit:')
      debug('dev')(limit)
      debug('dev')('skip:')
      debug('dev')(skip)
      debug('dev')('sort:')
      debug('dev')(sort)

      const count = await Model.count(query)

      const items = await Model
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean()

      resolve({filters: parse(filters), count, items})
    } catch (e) {
      console.log('Error in find')
      console.error(e)
      reject(e)
    }
  })

export default {find}
