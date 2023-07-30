const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const follow_meSchema = new Schema({
    acuerdo_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agreement',
        required: true
    },
    descripcion:{
        type: String,
        maxlength: 300,
        required: true
    }
});

module.exports = model('follow_me', follow_meSchema);