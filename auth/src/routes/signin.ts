import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError } from '@ms_ticking/common'
import { validateRequest } from '@ms_ticking/common'
import { User } from '../models/user'
import { Password } from '../services/password'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('Invalied email or password')
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password,
    )
    if (!passwordMatch) {
      throw new BadRequestError('Invalied email or password')
    }
    // generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    )

    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(existingUser)
  },
)

export { router as signinRouter }
