const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({ msg: 'no hay token' })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY)
    //leer el usuario que corresponde al uid
    const usuario = (req.usuario = await Usuario.findById(uid))
    if (!usuario) {
      return res.status(401).json({
        msg: 'token no valido, usuario no activo / no hay usuario',
      })
    }
    //verificar si el uid tiene isActive: true
    if (!usuario.isActive) {
      return res.status(401).json({
        msg: 'token no valido, usuario no activo',
      })
    }

    req.usuario = usuario

    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({
      msg: 'token no valido',
    })
  }
}

module.exports = {
  validarJWT,
}
