const express = require("express");
const User = require('../models/usuario');

const router = express.Router();

router.post('/users', async (req, res) => {

    try {
      const user = new User(req.body);
      console.log(req.body);
      await user.save();
      res.json(user);
      console.log(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Obtener todos los usuarios
  
  router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Obtener un usuario por su ID

  router.get('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Actualizar un usuario por su ID

  router.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido_paterno, apellido_materno, matricula, rfc, email, password, token } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, {
        nombre,
        apellido_paterno,
        apellido_materno,
        matricula,
        rfc,
        email,
        password,
        token
      }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Eliminar un usuario por su ID

  router.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;