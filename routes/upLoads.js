const { Router } = require('express')
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagenes, mostrarImagen, actualizarImagenesCloudinary } = require('../controllers/upLoads');
const { coleccionesPermitidas } = require('../helpers/dbValidators');
const { validateFields,validarArchivosASubir } = require('../middlewares');



const router = Router();


router.post('/', validarArchivosASubir,cargarArchivos)

router.put('/:coleccion/:id', [
    validarArchivosASubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['usuarios', 'productos'])),
    validateFields
],  actualizarImagenesCloudinary)
//actualizarImagenes)

router.get('/:coleccion/:id' ,[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['usuarios', 'productos'])),
    validateFields
], mostrarImagen )

module.exports = router;