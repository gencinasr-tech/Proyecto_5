const mongoose = require('mongoose');

// URL local de tu base de datos.
// 'proyecto-peliculas' es el nombre que tendrá la BBDD en Mongo.
const DB_URL = 'mongodb://localhost:27017/proyecto-peliculas';

const connect = async () => {
    try {
        // Intentamos conectar
        await mongoose.connect(DB_URL);
        console.log('✅ Conectado a la BBDD MongoDB con éxito');
    } catch (error) {
        console.error('❌ Error conectando a la BBDD:', error);
    }
};

module.exports = { connect };