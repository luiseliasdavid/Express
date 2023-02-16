const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'el nombre es obligatorio'],
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
})

CategoriaSchema.methods.toJSON = function() {
    const { __v, isActive, ...data  } = this.toObject();
    return data;
}

module.exports = model('Categoria', CategoriaSchema)
