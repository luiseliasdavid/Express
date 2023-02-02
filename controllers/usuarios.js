const { response, request } = require('express')
const { schema } = require('../models/usuario.js')
const Usuario = require('../models/usuario.js')
const bcryptjs = require('bcryptjs')

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query
  //verificar si las querys son numeros
  const isNumber = () => {
    let lim = /^\d+$/.test(limite)
    let des = /^\d+$/.test(desde)
    if (lim === true && des === true) {
      return true
    } else return false
  }
  if (isNumber() === false) {
    return res.status(400).send(`Parametros invalidos`)
  }

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ isActive: true }),
    Usuario.find({ isActive: true }).skip(Number(desde)).limit(Number(limite)),
  ])

  res.json({
    total,
    usuarios,
  })
}

const usuariosPost = async (req, res = response) => {
  const { name, role, password, mail } = req.body
  const usuario = new Usuario({ name, role, password, mail })

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10)
  usuario.password = bcryptjs.hashSync(password.toString(), salt)

  //guardar en db
  await usuario.save()
  res.json({
    msg: 'post API - usuariosPost',
    usuario,
  })
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, mail, ...resto } = req.body
  console.log(_id)
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })

  res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - usuariosPatch',
  })
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params

  const usuario = await Usuario.findByIdAndUpdate(id,{ isActive: false },{ new: true })
  const usuarioAutenticado = req.usuario

  res.json({
    usuario,
    usuarioAutenticado,
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
}
