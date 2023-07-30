const express = require("express");
const minuteSchema = require('../models/minuta');

const router = express.Router();

router.post('/minutes', (req, res) => {
    //res.send('Esta es la ruta de crear usuario');
    const minute = new minuteSchema(req.body);//Esto crea un nuevo usuario desde el cuerpo de la peticion
    console.log(req.body);
    minute
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));//Guarda el usuario en la base de datos save
});

//Obtener todos los usuarios

router.get('/minutes', (req, res) => {
    minuteSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener un usuario

router.get('/minutes/:id', (req, res) => {
    const { id } = req.params;
    minuteSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Actualizar usuario

router.put('/minutes/:id', (req, res) => {
    const { id } = req.params;
    const {responsable, usuario_id,  asunto, fecha, hora, tema, area, lugar, descripcion, conclusion, estatus } = req.body;
    minuteSchema
    .updateOne({ _id: id }, { $set: { responsable, usuario_id, asunto, fecha, hora, tema, area, lugar, descripcion, conclusion, estatus }})//Se pasa el id del usuario en especifico
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar usuario

router.delete('/minutes/:id', (req, res) => {
    const { id } = req.params;
    minuteSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;