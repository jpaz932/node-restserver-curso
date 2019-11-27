// puerto
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// base de datos
let urlDB;

if(process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/cafe';
else
    urlDB = process.env.MONGO_URI;

// vencimiento jsonwebtoken
process.env.CADUCIDAD_TOKEN = '1h';

// semilla de autenticacion
process.env.SEED = process.env.SEED || 'secret-desarrollo';


process.env.NODE_URLDB = urlDB;
