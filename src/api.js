import queryhelper from './queryhelper'

const ping = () => `pong`

const method = (type, path, handler, options) => {
  if (typeof options === 'boolean') {
    // backwards compatibility
    return {method: type, path, handler, options: {auth: options}}
  }
  return {method: type, path, handler, options}
}
const GET = (path, handler, options) => method('GET', path, handler, options)
const PUT = (path, handler, options) => method('PUT', path, handler, options)
const POST = (path, handler, options) => method('POST', path, handler, options)
const DELETE = (path, handler, options) => method('DELETE', path, handler, options)

const base = ({path, Model}) => [
  {
    ...GET(`/api/${path}`, async (req, reply) =>
      Model.find().sort('sequence -date -created -delivery').populate('user').batchSize(10000))
  },
  {...GET(`/api/${path}/find/{filters}`, async ({params: {filters}}) => {
    try { return await queryhelper.find({Model, filters}) } catch (e) { return e }
  })},
  {
    ...GET(`/api/${path}/code/{code}`, async (req, reply) =>
      Model.findOne({code: req.params.code}))
  },
  {
    ...GET(`/api/${path}/path`, async (req, reply) =>
      Model.findOne({path: req.query.value}))
  },
  {
    ...GET(`/api/${path}/key`, async (req, reply) =>
      Model.findOne({key: req.query.key}))
  },
  {
    ...GET(`/api/${path}/{id}`, async (req, reply) =>
      Model.findOne({_id: req.params.id}))
  },
  {
    ...POST(`/api/${path}`, async (req, reply) => {
      delete req.payload._id
      const result = await new Model(req.payload).save()
      return result
    })
  },
  {
    ...DELETE(`/api/${path}/{id}`, async (req, reply) =>
      Model.remove({_id: req.params.id}))
  },
  {
    ...PUT(`/api/${path}/{id}`, async (req, reply) => {
      await Object.assign(
        await Model.findOne({_id: req.params.id}), req.payload
      ).save()
      return 'Update complete'
    })
  }
]

export default {ping, base, GET, PUT, POST, DELETE}
