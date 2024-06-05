import mongoose from 'mongoose'
import { Password } from '../services/password'
/**
 * an interface that described the properties that are required for creating a new user
 */
interface UserAttrs {
  email: string
  password: string
}

/**
 * an interface that described the properties that a user modal has
 * ex. tell ts a build Function has inside UserModal
 * soc we can use it like this User.build
 * using UserModal interface we exract all existing userSchema property and add one additional property to it called build-function
 */
interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc //build return a user that mines a refrance of UserDoc so the type is UserDoc
}

/**
 * an interface that described the properties that a user-document(user table row) has
 */
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // filter response
    toJSON: {
      transform(doc, ret) {
        ;(ret.id = ret._id), delete ret._id, delete ret.password
      },
      versionKey: false,
    },
  },
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  ;``

  done()
})

//build is just a custom name we can set name as we want
//schemaName.statics.FnName this is a way we can add and use a function from this model without exporting sepratly and check types as per TS likes this ==> schemaName.FnName(param:typecheck)

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}
const User = mongoose.model<any, UserModal>('User', userSchema)

export { User }
