const express = require('express');

// Verificamos que los archivos existen
const { connect } = require('./utils/db');
const moviesRouter = require('./routes/movie.routes');
const cinemasRouter = require('./routes/cinema.routes');

const PORT = 3000;
const server = express();

// Middlewares para entender JSON
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Conectamos a la BBDD
connect();

// Configuración de rutas
server.use('/movies', moviesRouter);
server.use('/cinemas', cinemasRouter);

// --- CORRECCIÓN AQUÍ ---
// Antes ponía server.use('*', ...). Lo quitamos.
// Al no poner ruta, Express entiende que esto se ejecuta
// para CUALQUIER petición que no haya encontrado ruta antes.

server.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

// Control de errores (Genérico)
server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Error inesperado');
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});