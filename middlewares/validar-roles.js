const { response, request } = require('express')

const isAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(501).json({
      msg: 'Se quiere verificar el rol sin verificar el token primero',
    })
  }

  const { role, name } = req.usuario
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} No es administrador`,
    })
  }

  next()
}

const gotRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(501).json({
        msg: 'Se quiere verificar el rol sin verificar el token primero',
      })
    }

    if (!roles.includes(req.usuario.role)) {
      return res.status(401).json({
        msg: `el servicio requiere uno de estos roles ${roles} `,
      })
    }
    next()
  }
}

module.exports = {
  isAdminRole,
  gotRole,
}
