const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

async function iniciar(){
    await app.listen();

    const port = process.env.PORT || 3001;

    app.listen(port, () => console.log('Servidor funcionando en el puerto', port));

    mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Conectado a la Base de Datos de MongoDB Atlas')).catch((error) => console.error(error));    
}
iniciar();
