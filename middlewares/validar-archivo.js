const { response } = require('express')

const validarArchivosASubir = (req, res = response, next) => {
  //validar que existan los files
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msg: 'No hay archivos en la peticion --validarArchivoSubir',
    })
  }

  next()
}

module.exports = {
  validarArchivosASubir,
}
