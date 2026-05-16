require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimiter = require('express-rate-limit');
const routes = require('./routes'); 

const app = express();

app.set('trust proxy', 1);

// Limitador de peticiones para evitar ataques
const limiter = rateLimiter({
    windowMs: 30 * 60 * 1000, // 30 minutos
    max: 1000, 
    message: { 
        success: false, 
        error: {
            code: 'LIMITE_EXTENDIDO',
            message: 'Has alcanzado el límite de solicitudes. Por favor, inténtalo de nuevo más tarde.'
        }
    }
}); 

// Middlewares de seguridad y utilidades
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev')); // Esto te mostrará las peticiones en la terminal
app.use(express.json()); // Vital para que Postman pueda enviar JSON
app.use(express.static('public'));

// Conexión de rutas con el prefijo /api/v1
app.use('/api/v1', limiter);
app.use('/api/v1', routes);

// Respuesta por defecto si entran a /api/v1 sin endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "¡Bienvenido a la API de Entre Páginas y Amigos! v1 en línea."
    });
});

// Manejo de Rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'RUTA_NO_ENCONTRADA',
            message: `La ruta ${req.originalUrl} no existe.`
        }
    });
});

// Manejo de errores globales del servidor (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: {
            code: 'ERROR_INTERNO',
            message: 'Ha ocurrido un error interno en el servidor.'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});