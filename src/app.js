//para ser utilizado, escribir 'npm install' en consola, y luego 'npm run dev' para la ejecución

//configuracion de un sv basico de node.js con express

//Se importan las bibliotecas
const express = require('express');
const path = require('path');
const morgan = require('morgan');

//se configura express
const app = express();
app.use(express.json());

//se importa la ruta 
const Route = require('./ruta');

//configuracion de morgan para ver las peticiones 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))


//se configuran las rutas
app.use('/', Route);

//inicio del sv en el puerto 3000
app.listen(3000, () => {
    console.log('Server on port 3000');
});