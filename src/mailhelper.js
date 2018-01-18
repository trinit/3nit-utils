/* import db from '3nit-utils/db'
import nodemailer from 'nodemailer'
import debug from 'debug'

const mongoose = db.mongoose()
const Mail = mongoose.model('Mail')
const Config = mongoose.model('Config')

const options = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  auth: process.env.SMTP_AUTH ? {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASS
  } : false
}

const DEBUG = process.env.SMTP_DEBUG

const transporter = nodemailer.createTransport(options) */

const send = ({mail, to, link}) =>
  new Promise(async (resolve, reject) => {
    resolve('to do')
    /* try {
      if (DEBUG) {
        debug('dev')('Send e-mail')
        debug('dev')(options)
      }

      const template = await Mail.findOne({key: mail})
      const appUrl = await Config.findOne({key: 'appUrl'})
      const message = {
        from: template.from,
        to,
        subject: template.subject,
        html: template.body
      }
      if (link) message.html = message.html.replace(/%link%/g, link)
      if (appUrl) message.html = message.html.replace(/%appUrl%/g, appUrl.config)
      try {
        transporter.sendMail(message, (e, info) => {
          e && console.error(e)
          resolve(e || info)
        })
      } catch (e) {
        console.error(e)
        reject(e)
      }
    } catch (e) {
      console.error(e)
      reject(e)
    } */
  })

export default {send}
