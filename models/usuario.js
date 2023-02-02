const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  mail: {
    type: String,
    required: [true, 'Mail is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
})

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id,...usuario } = this.toObject()
  usuario.uid = _id
  return usuario
}

module.exports = model('Usuario', UsuarioSchema)
