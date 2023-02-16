const { Router, response } = require('express')
const { check } = require('express-validator')
const { crearProducto, getProductos, getProducto, putProduct, deleteProduct } = require('../controllers/productos')
const { existeProducto, existUserById, productAllredyExist, existProductById } = require('../helpers/dbValidators')
const { validarJWT, isAdminRole } = require('../middlewares')



const { validateFields } = require('../middlewares/validateFields')

const router = Router()

//crear producto
router.post('/',
validarJWT,
check('nombre','el nombre es requerido').not().isEmpty(),
validateFields,
crearProducto,
)

//Obtener productos -publico
router.get('/',getProductos)

//una producto por id - publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProducto ),
    validateFields
  ],getProducto
 )

//actualizar producto
router.put('/:id',[
  validarJWT,
  isAdminRole,
  check('id').isMongoId(),
  check('id','el usuario no existe').custom(existProductById),
  check('nombre','El Producto ya existe').custom( productAllredyExist ),
  validateFields
],
putProduct)

//borrar producto
router.delete('/:id', 
[
  validarJWT,
  isAdminRole,
  check('id').isMongoId(),
  check('id').custom(existProductById),
 // check('usuario','El usuario no es valido').custom( existUserById ),
  validateFields
], 
deleteProduct)

module.exports = router