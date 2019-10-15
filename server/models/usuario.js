const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es rol valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Este campo es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Este campo es requerido']
    },
    password: {
        type: String,
        required: [true, 'Este campo es requerido']
    },
    img: String,
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Eliminar password para que no se vea cuando se rotorne el usuario creado
usuarioSchema.methods.toJSON = function()
{
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('Usuario', usuarioSchema);
