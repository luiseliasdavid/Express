const validaJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')
const ValidaCampos = require('../middlewares/validateFields')

module.exports={
    ...validaJWT,
    ...validaRoles,
    ...ValidaCampos
}