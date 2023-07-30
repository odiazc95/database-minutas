const express = require("express");
const agreementSchema = require('../models/acuerdo');

const router = express.Router();

router.post('/agreement', (req, res) => {
    //res.send('Esta es la ruta de crear usuario');
    const agreement = new agreementSchema(req.body);//Esto crea un nuevo usuario desde el cuerpo de la peticion
    console.log(req.body);
    agreement
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));//Guarda el usuario en la base de datos save
});

//Obtener todos los usuarios

router.get('/agreement', (req, res) => {
    agreementSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener un usuario

router.get('/agreement/:id', (req, res) => {
    const { id } = req.params;
    agreementSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Actualizar usuario

router.put('/agreement/:id', (req, res) => {
    const { id } = req.params;
    const { minuta_id, responsablec_id, responsabler_id, acuerdo, fecha, descripcion, estatus, reporte_estado } = req.body;
    agreementSchema
    .updateOne({ _id: id }, { $set: {minuta_id, responsablec_id, responsabler_id, acuerdo, fecha, descripcion, estatus, reporte_estado }})//Se pasa el id del usuario en especifico
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar usuario

router.delete('/agreement/:id', (req, res) => {
    const { id } = req.params;
    agreementSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;