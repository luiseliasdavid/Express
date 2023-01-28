const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema ({
    name: {
        type: String,
        required: [true,'Name is required']
    },
    mail: {
        type: String,
        required: [true,'Mail is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Password is required'],
    },
    img: {
        type: String
    },
    role:{
        type: String,
        required: true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    google:{
    type: Boolean,
    default:false
    }


})

module.exports= model('Usuario', UsuarioSchema)