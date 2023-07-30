const express = require("express");
const follow_meSchema = require('../models/seguimiento');

const router = express.Router();

router.post('/follow_me', (req, res) => {
    //res.send('Esta es la ruta de crear usuario');
    const follow_me = new follow_meSchema(req.body);//Esto crea un nuevo usuario desde el cuerpo de la peticion
    console.log(req.body);
    follow_me
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));//Guarda el usuario en la base de datos save
});

//Obtener todos los usuarios

router.get('/follow_me', (req, res) => {
    follow_meSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener un usuario

router.get('/follow_me/:id', (req, res) => {
    const { id } = req.params;
    follow_meSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Actualizar usuario

router.put('/follow_me/:id', (req, res) => {
    const { id } = req.params;
    const { acuerdo_id, descripcion } = req.body;
    follow_meSchema
    .updateOne({ _id: id }, { $set: { acuerdo_id, descripcion }})//Se pasa el id del usuario en especifico
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar usuario

router.delete('/follow_me/:id', (req, res) => {
    const { id } = req.params;
    follow_meSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;