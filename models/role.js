const {Schema, model} = require('mongoose')

const RoleSchema = Schema({
    rols: {
        type: String,
        required: [true,'el rol es obligatorio'],

        
    }
})

module.exports= model('Rols',RoleSchema) 