const { response, request } = require('express')
const { existUserById, existeCategoria } = require('../helpers/dbValidators')
const { Categoria } = require('../models')

//obtener categorias -- paginado -- populate

const categorysGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query

  const [total, categoria] = await Promise.all([
    Categoria.countDocuments({ isActive: true }),
    Categoria.find({ isActive: true })
      .populate('usuario','name')
      .skip(Number(desde))
      .limit(Number(limite)),
  ])

  res.json({
    total,
    categoria,
  })
}

//obtener  categoria -- populate {}
const getCategory = async (req, res = response) => {
  const { id } = req.params

  try {
    const category = await Categoria.findById(id).populate('usuario', 'name')
    res.json(category)
  } catch (err) {
    throw new Error(err)
  }
}

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase()

  const categoriaDB = await Categoria.findOne({ nombre })

  if (categoriaDB) {
    return res.status(400).json({
      msg: `la categoria ${categoriaDB} , ya existe `,
    })
  }
  const data = {
    nombre,
    usuario: req.usuario._id,
  }

  const categoria = new Categoria(data)

  await categoria.save()

  res.status(200).json(categoria)
}

// actualizar categoria
const putCategory = async (req = request, res = response) => {
  const id = req.params.id
  const nuevoNombre = req.body.nombre.toUpperCase()
  const usuarioNuevo = req.body.usuario

  try {
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { nombre: nuevoNombre },
      { new: true },
    ).populate('usuario','name')

    res.json({
      msg: categoria,
    })
  } catch (err) {
    throw new Error('usuario o categoria invalida')
  }
}
// borrar categoria
const deleteCategory = async (req = request, res = response) => {
  const id = req.params.id

  try {
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    )

    res.json({
      msg: categoria,
    })
  } catch (err) {
    throw new Error('usuario o categoria invalida')
  }
}

//borrar categoria  (estado a false)

module.exports = {
  categorysGet,
  crearCategoria,
  getCategory,
  putCategory,
  deleteCategory,
}
