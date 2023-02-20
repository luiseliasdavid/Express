const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require('express')
const { model } = require('mongoose')
const { subirArchivo } = require('../helpers/subir-archivos')

const { Usuario, Producto } = require('../models')

const cargarArchivos = async (req, res = response) => {
  //imagenes
  try {
    const nombre = await subirArchivo(req.files, undefined, carpeta)
    res.json({ nombre })
  } catch (error) {
    res.status(400).json({
      msg: 'extencion no permitida',
    })
  }
}

const actualizarImagenes = async (req, res = response) => {
  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        })
      }
      break
    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        })
      }

      break

    default:
      return res.status(500).json({ msg: 'datos sin validar' })
  }
  // Limpiar imágenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen)
    }
  }

  //se guarda la imagen y se le asigna a la img del modelo
  const nombre = await subirArchivo(req.files, undefined, coleccion)
  modelo.img = nombre

  await modelo.save()

  res.json({ modelo })
}

const actualizarImagenesCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        })
      }
      break
    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        })
      }

      break

    default:
      return res.status(500).json({ msg: 'datos sin validar' })
  }
  // Limpiar imágenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.')
    cloudinary.uploader.destroy( public_id )
  }
  const { tempFilePath } = req.files.archivo
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
  modelo.img = secure_url
  await modelo.save()

  res.json(modelo)

  //se guarda la imagen y se le asigna a la img del modelo
  /*   const nombre = await subirArchivo(req.files, undefined, coleccion)


 */
}

  const mostrarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params

    let modelo

    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id)
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`,
          })
        }
        break
      case 'productos':
        modelo = await Producto.findById(id)
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`,
          })
        }

        break

      default:
        return res.status(500).json({ msg: 'datos sin validar' })
    }
    // Limpiar imágenes previas
    if (modelo.img) {
      // Hay que borrar la imagen del servidor
      const pathImagen = path.join(
        __dirname,
        '../uploads',
        coleccion,
        modelo.img,
      )
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
      }
    }
    const pathName = path.join(__dirname, '../assets/no-image.jpg')
    return res.sendFile(pathName)
  }


module.exports = {
  cargarArchivos,
  actualizarImagenes,
  mostrarImagen,
  actualizarImagenesCloudinary,
}
