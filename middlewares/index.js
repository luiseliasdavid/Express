const validaJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')
const ValidaCampos = require('../middlewares/validateFields')
const ValidaArchivos= require('../middlewares/validar-archivo')

module.exports={
    ...validaJWT,
    ...validaRoles,
    ...ValidaCampos,
    ...ValidaArchivos
}