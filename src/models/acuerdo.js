const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const agreementSchema = new Schema({
    minuta_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'minute',
        required: true
    },
    responsablec_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    responsabler_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    acuerdo:{
        type: String,
        required: true
    },
    fecha:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        maxlength: 300,
        required: true
    },
    estatus:{
        type: String,
        enum: ['Pendiente','Terminado','Cancelado'],
    }
});

module.exports = model('agreement', agreementSchema);