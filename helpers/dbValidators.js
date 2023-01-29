const Rols = require('../models/role');
const Usuario = require('../models/usuario');

const validateRole = async(role = '') => {
    console.log(role,'este es el role')
    const existeRol = await Rols.findOne({ role });
    console.log(existeRol,'este es existeRol')
    if ( !existeRol ) {
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const validateEmail = async( mail = '' ) => {

    // Verificar si el mail existe
    const existeEmail = await Usuario.findOne({ mail });
    if ( existeEmail ) {
        throw new Error(`El mail: ${ mail }, ya está registrado`);  
    }
}

module.exports= {
    validateRole,
    validateEmail 
}