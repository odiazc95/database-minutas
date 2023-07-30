const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const minuteSchema = new Schema({
    responsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    usuario_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    asunto:{
        type: String,
        required: true
    },
    fecha:{
        type: String,
        required: true
    },
    hora:{
        type: String, 
        required: true
    },
    tema:{
        type: String,
        required: true
    },
    area:{
        type: String,
        required: true
    },
    lugar:{
        type: String,
        required: true
    },
    descripcion:{
        type: String
    },
    conclusion:{
        type: String
    },
    estatus:{
        type: String,
        enum: ['Activo', 'Inactivo'],
        required: true
    }
});

module.exports = model('minute', minuteSchema);