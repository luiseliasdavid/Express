const { Router } = require('express')
const { body, check,  } = require('express-validator')
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require('../controllers/usuarios')
const { validateEmail, validateRole } = require('../helpers/dbValidators')
const { validateFields,} = require('../middlewares/validateFields')
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
    /* check('mail', 'Correo invalido').isEmail(), */
    /* check( 'role', 'No es un rol valido' ).isIn(['VENTAS_ROLE','ADMIN_ROLE', 'USER_ROLE']), */
    check('role').custom( validateRole),  
    /* check('mail').custom(validateEmail), */ 
    //checkear porque rompe la aplicacion
    validateFields,
  ],
  usuariosPost,
)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router
