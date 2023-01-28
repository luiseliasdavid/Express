const { Router } = require('express')
const { body, check } = require('express-validator')
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require('../controllers/usuarios')
const { validateFields } = require('../middlewares/validateFields')
const Role = require('../models/role')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post(
  '/',
  [
    check('password', 'El passwor de be tener al mneos 6 letras').isLength({
      min: 6,
    }),
    check('name', 'el nombre es invalido').not().isEmpty(),
    check('mail', 'Correo invalido').isEmail(),
    check( 'rol', 'No es un rol valido' ).isIn(['VENTAS_ROLE','ADMIN_ROLE', 'USER_ROLE']),
    //checkear porque rompe la aplicacion
    /* check('role').custom( async(role='') => {
     const roleExist = await Role.findOne({role})
     if (!roleExist) throw new Error(`the role ${role} doesent exist`) 
    }), */
    validateFields,
  ],
  usuariosPost,
)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router
