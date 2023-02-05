const { Router } = require('express')
const { check } = require('express-validator')
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require('../controllers/usuarios')
const {
  validateEmail,
  validateRole,
  existUserById,
} = require('../helpers/dbValidators')
const {
  validarJWT,
  isAdminRole,
  gotRole,
  validateFields,
} = require('../middlewares')
const Role = require('../models/role')
const router = Router()

router.get('/', usuariosGet)

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(validateRole),
    validateFields,
  ],
  usuariosPut,
)

router.post(
  '/',
  [
    check('password', 'El password debe tener al mneos 6 letras').isLength({
      min: 6,
    }),
    check('name', 'el nombre es invalido').not().isEmpty(),
    check('mail', 'Correo invalido').isEmail(),
    check('role').custom(validateRole),
    check('mail').custom(validateEmail),
    validateFields,
  ],
  usuariosPost,
)

router.delete(
  '/:id',
  [
    validarJWT,
    /* isAdminRole, */
    gotRole('ADMIN_ROLE', 'SELLS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
  ],
  usuariosDelete,
)

router.patch('/', usuariosPatch)

module.exports = router
