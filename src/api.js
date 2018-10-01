import queryhelper from './queryhelper'

const ping = () => `pong`

const GET = (path, handler, auth) => ({method: 'GET', path, handler, config: {auth: auth}})
const PUT = (path, handler, auth) => ({method: 'PUT', path, handler, config: {auth: auth}})
const POST = (path, handler, auth) => ({method: 'POST', path, handler, config: {auth: auth}})
const DELETE = (path, handler, auth) => ({method: 'DELETE', path, handler, config: {auth: auth}})

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
