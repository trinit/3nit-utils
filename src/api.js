import Toys from 'toys'
const wrap = Toys.handler

const ping = () => `pong`

const GET = (path, handler) => ({method: 'GET', path, handler: wrap(handler)})
const PUT = (path, handler) => ({method: 'PUT', path, handler: wrap(handler)})
const POST = (path, handler) => ({method: 'POST', path, handler: wrap(handler)})
const DELETE = (path, handler) => ({method: 'DELETE', path, handler: wrap(handler)})

const base = ({path, Model}) => [
  {
    ...GET(`/api/${path}`, async (req, reply) =>
      reply(await Model.find().sort('sequence -date -delivery').populate('user').batchSize(10000)))
  },
  {
    ...GET(`/api/${path}/code/{code}`, async (req, reply) =>
      reply(await Model.findOne({code: req.params.code})))
  },
  {
    ...GET(`/api/${path}/path`, async (req, reply) =>
      reply(await Model.findOne({path: req.query.value})))
  },
  {
    ...GET(`/api/${path}/{id}`, async (req, reply) =>
      reply(await Model.findOne({_id: req.params.id})))
  },
  {
    ...POST(`/api/${path}`, async (req, reply) => {
      delete req.payload._id
      const result = await new Model(req.payload).save()
      reply(result)
    })
  },
  {
    ...DELETE(`/api/${path}/{id}`, async (req, reply) =>
      reply(await Model.remove({_id: req.params.id})))
  },
  {
    ...PUT(`/api/${path}/{id}`, async (req, reply) => {
      await Object.assign(
        await Model.findOne({_id: req.params.id}), req.payload
      ).save()
      reply('Update complete')
    })
  }
]

export default {ping, base, GET, PUT, POST, DELETE}
