const { response, request } = require('express')
const { Producto } = require('../models')

const crearProducto = async (req, res = response) => {
  const { isActive, usuario, nombre, ...elements } = req.body

  try {
    const productoDB = await Producto.findOne({ nombre })

    if (productoDB) {
      return res.status(400).json({
        msg: `El producto: ${nombre} , ya existe `,
      })
    }
    const data = {
      nombre,
      ...elements,
      usuario: req.usuario._id,
    }

    const producto = new Producto(data)

    await producto.save()

    const prod = await Producto.findOne({ nombre }).populate('usuario', 'name')

    res.status(200).json(prod)
  } catch (err) {
    res.send(err)
  }
}

const getProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query

  const [total, producto] = await Promise.all([
    Producto.countDocuments({ isActive: true }),
    Producto.find({ isActive: true })
      .populate('categoria', 'nombre')
      .populate('usuario', 'name')
      .skip(Number(desde))
      .limit(Number(limite)),
  ])

  res.json({
    total,
    producto,
  })
}

const getProducto = async (req, res = response) => {
  const { id } = req.params

  try {
    const producto = await Producto.findById(id)
      .populate('categoria', 'nombre')
      .populate('usuario', 'name')
    res.json(producto)
  } catch (err) {
    throw new Error(err)
  }
}

const putProduct = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const update = req.body

    const model = await Producto.findByIdAndUpdate(id, update, { new: true })
    if (!model) {
      throw new Error('No se ha encontrado el modelo')
    }

    res.send(model)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteProduct = async (req = request, res = response) => {
  const id = req.params.id

  try {
    const producto = await Producto.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    ).populate('usuario', 'name')

    res.json({
      msg: producto,
    })
  } catch (err) {
    throw new Error('producto invalido')
  }
}

module.exports = {
  crearProducto,
  getProductos,
  getProducto,
  putProduct,
  deleteProduct,
}
