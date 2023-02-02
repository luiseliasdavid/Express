const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generateJWT } = require('../helpers/generateToken')

const login = async (req, res = response) => {
  const { mail, password } = req.body

  try {
    //verificar si el modelo existe
    const usuario = await Usuario.findOne({ mail })
    if (!usuario) {
      return res
        .status(400)
        .json({ msg: 'usuario / password son incorrectos -correo' })
    }
    //verificar si usuario esta activo
    console.log(usuario)
    if (!usuario.isActive) {
      return res
        .status(400)
        .json({ msg: 'usuario / password son incorrectos -isActive: false' })
    }

    //verificar si la contraseña es valida
    
    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / contraseña invalidos -password',
      })
    }
    const token = await generateJWT(usuario.id)
    
   /*  const data = await Usuario.findOne({ mail }, '-isActive') */
    res.json({
      usuario,
      token
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Comuniquese con el administrador',
    })
  }
}

module.exports = {
  login,
}
