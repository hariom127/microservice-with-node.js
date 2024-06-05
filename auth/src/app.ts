import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signupRouter } from './routes/signup'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { errorHandler, NotFoundError } from '@ms_ticking/common'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false, //encruption false
    //cookie is only set for https connection
    secure: process.env.NODE_ENV !== 'test', //if NODE_ENV is test set secure:false
  }),
)
app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

//when route not found throw a error using NotFoundError class
app.all('*', async (req, res) => {
  throw new NotFoundError()
})
app.use(errorHandler)

export { app }
