const express = require('express');
const userSchema = require('../models/usuario');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
    const {nombre, apellido_p, apellido_m, matricula, rfc, email, password} = req.body;
    const user = new userSchema({
        nombre: nombre,
        apellido_p: apellido_p,
        apellido_m: apellido_m,
        matricula: matricula,
        rfc: rfc, 
        email: email,
        password: password
    });

    user.password = await user.encryptPassword(user.password);
    await user.save();
    console.log(user);

});

router.get('/navigation_auth', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token){
        return res.status(401).json({
            auth: false,
            message: 'No tienes acceso para iniciar al sistema: Missing token'
        });
    }
    const secret_key = req.body.rfc;

    const decoded = jwt.verify(token, secret_key);
    console.log(decoded);
    
    const user = await userSchema.findById(decoded.id, {password: 0});//Con password: 0 - no devuelve el password
    if (!user){
        return res.status(404).send('No se encontro el usuario');
    }
    res.json(user);
});

router.post('/signin', async (req, res, next) => {
    const {matricula, rfc} = req.body;
    console.log(matricula, rfc);
    //const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
    const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
    if (!user || !validateRfc(rfc)) {
        return res.status(401).json({auth: false, token: null});
    }

    const rfc_valid = validateRfc(rfc);
    console.log(rfc_valid);
    
    if (!rfc_valid) {
        return res.status(401).json({auth: false, token: null});
    }

    const secret_key = rfc;
    const token = jwt.sign({ id: user._id }, secret_key, {
        expiresIn: 3 * 365 * 24 * 60 * 60
    });
    
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(hashedToken);

});

function validateRfc(rfc) {
    const rfcRegex = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
    if (!rfcRegex.test(rfc)) {
      return false;
    }
    return true;
}

router.post('/dashboard', async (req, res, next) => {
  const {matricula, rfc} = req.body;
  console.log(matricula, rfc);
  //const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
  
  const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
  if (!user || !validateRfc(rfc)) {
      return res.status(401).json({auth: false, token: null});
  }
  const rfc_valid = validateRfc(rfc);
  console.log(rfc_valid);
  
  if (!rfc_valid) {
      return res.status(401).json({auth: false, token: null});
  }

  const secret_key = rfc;
  const token = jwt.sign({ id: user._id }, secret_key, {
      expiresIn: 3 * 365 * 24 * 60 * 60
  });
  
  //CARPETA TEMPORAL
  const tempFolderPath = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath);
  }

  // Guardar el token en un archivo JSON dentro de la carpeta temporal
  const tokenFilePath = path.join(tempFolderPath, 'token.json');
  fs.writeFileSync(tokenFilePath, JSON.stringify({ token }));

  // Responder con el token
  console.log(token);
  res.json({ auth: true, token });

});
function validateRfc(rfc) {
  const rfcRegex = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
  if (!rfcRegex.test(rfc)) {
    return false;
  }
  return true;
}

const pdfFolderPath = path.join(__dirname, '../pdf');
if (!fs.existsSync(pdfFolderPath)) {
  fs.mkdirSync(pdfFolderPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pdfFolderPath);
  },
  filename: function (req, file, cb) {
    const idM = req.params.idM; 
    const fileName = `archivo-${idM}.pdf`; 
    const filePath = path.join(pdfFolderPath, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post('/save-pdf/:idM', upload.single('pdf'), (req, res) => {
  const pdfFile = req.file;
  if (!pdfFile) {
    return res.status(400).json({ message: 'PDF file is required' });
  }
  res.json({ message: 'PDF saved successfully' });
});

module.exports = router;