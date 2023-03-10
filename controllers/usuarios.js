const { response, request } = require('express');
const { schema } = require('../models/usuario.js');
const Usuario = require('../models/usuario.js')
const bcryptjs = require('bcryptjs');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usuariosPost = async(req, res = response) => {

    const {name, role, password, mail} = req.body;
    const usuario = new Usuario({name, role, password, mail})
    
    
    //encriptar la contraseña
    const salt=  bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password.toString(),salt)
    
    //guardar en db
    await usuario.save();
    res.json({
        msg: 'post API - usuariosPost', 
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}