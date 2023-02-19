const Rols = require('../models/role')
const Usuario = require('../models/usuario')

const { Categoria, Producto } = require('../models')
const { collection } = require('../models/role')


const existeCategoria = async (id) => {
  const catById = await Categoria.findById(id)
  if (!catById) {
    throw new Error(`la categoria con  id: ${id},no existe`)
  }
}
const existeProducto = async (id) => {
  console.log('hola')
  const prodById = await Producto.findById(id)
  console.log(prodById)
  if (!prodById) {
    throw new Error(`la producto con  id: ${id},no existe`)
  }
}

const validateRole = async (role = '') => {
  //create an array with uniques values of property role
  const roles = await Rols.distinct('role')

  const rolExist = roles.find((item) => item === role)
  if (!rolExist) {
    throw new Error(`El rol ${role} no está registrado en la BD`)
  }
  /*   const existeRol = await Rols.findOne({ role });
  console.log(existeRol)
  if ( !existeRol ) {
      throw new Error(`El rol ${ role } no está registrado en la BD`);
  } */
}

const validateEmail = async (mail = '') => {
  const existeEmail = await Usuario.findOne({ mail })
  if (existeEmail) {
    throw new Error(`El mail: ${mail}, ya está registrado`)
  }
}

const existUserById = async (id) => {
  //Verificar si el usuario existe

  const userById = await Usuario.findById(id)
  if (!userById) {
    throw new Error(`El id: ${id},no existe999`)
  }
}
const existProductById = async (id) => {
  //Verificar si el usuario existe

  const prodById = await Producto.findById(id)
  if (!prodById) {
    throw new Error(`El producto con id: ${id},no existe`)
  }
}
const categoryAllredyExist = async (nombre = '') => {
  //Verificar categoria ya existe

  const categoryByName = await Categoria.findOne({ nombre })
  if (categoryByName) {
    throw new Error(`La categoria: ${nombre},ya existe`)
  }
}
const productAllredyExist = async (nombre = '') => {
  //Verificar categoria ya existe

  const productByName = await Categoria.findOne({ nombre })
  if (productByName) {
    throw new Error(`La categoria: ${nombre},ya existe`)
  }
}

//validar colecciones permitidas
const coleccionesPermitidas = (coleccion='', colecciones=[]) => {
   
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(`la coleccion ${coleccion} no es permitida, ${colecciones}`)
  }
  return true
}

module.exports = {
  validateRole,
  validateEmail,
  existUserById,
  existeCategoria,
  categoryAllredyExist,
  existeProducto,
  productAllredyExist,
  existProductById,
  coleccionesPermitidas
}
