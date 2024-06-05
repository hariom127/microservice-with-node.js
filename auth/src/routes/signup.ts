import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError, validateRequest } from '@ms_ticking/common'
import { User } from '../models/user'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 to 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //check existing user
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('email is use')
      throw new BadRequestError('Eamil already registered')
    }

    const user = User.build({ email, password })
    await user.save()

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    )

    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  },
)

export { router as signupRouter }
