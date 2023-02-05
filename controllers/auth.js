const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const { generateJWT } = require('../helpers/generateToken')
const { googleVerify } = require('../helpers/google-verify')

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

const googlrSingIn = async(req, res= response) => {

  const{id_token} = req.body;

 try {
    const {name,img,mail} = await googleVerify(id_token)

   // console.log(mail)
    let usuario= await Usuario.findOne({mail})
      
    
    if(!usuario) {
      const data = {
        name,
        mail,
        password: ':P',
        img,
        google:true,
        role:'USER_ROLE'
      }
      usuario= new Usuario(data)
      
     await usuario.save()
     
      
    }
    // si el usuario a sido borrado
    if(!usuario.isActive) {
      return res.status(400).json()
    }

    //generar un jwt
    const token = await generateJWT(usuario.id)

   res.json({
    usuario,
    token
   })
 } catch (error) {
  res.status(401).json({
    ok:false,
    msg: 'no se pudo verificar token'
  })
 }

 
}

module.exports = {
  login,
  googlrSingIn
}
