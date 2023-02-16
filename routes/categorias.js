const { Router, response } = require('express')
const { check } = require('express-validator')
const { crearCategoria, categorysGet, getCategory, putCategory, deleteCategory } = require('../controllers/categorias')
const { existeCategoria, existUserById, categoryAllredyExist } = require('../helpers/dbValidators')
const { validarJWT, gotRole, isAdminRole } = require('../middlewares')



const { validateFields } = require('../middlewares/validateFields')

const router = Router()

//obtener todas las categorias - publico
router.get('/', categorysGet)

//una categoria por id - publico
router.get('/:id',[
  check('id','No es un id de mongo valido').isMongoId(),
  check('id').custom( existeCategoria ),
  validateFields
],
 getCategory)
//crear categoria
router.post('/', 
  validarJWT,
  check('nombre','el nombre es requerido').not().isEmpty(),
  validateFields,
  crearCategoria,
)
//actualizar categoria
router.put('/:id',
[
  validarJWT,
  isAdminRole,
  check('id').isMongoId(),
  check('id','el usuario no existe').custom(existUserById),
  check('nombre','La categoria ya existe').custom( categoryAllredyExist ),
  validateFields
],
putCategory)

//borrar categoria
router.delete('/:id', 
[
  validarJWT,
  isAdminRole,
  check('id').isMongoId(),
  check('id').custom(existeCategoria),
  check('usuario','El usuario no es valido').custom( existUserById ),
  validateFields
], 
deleteCategory
)

module.exports = router
