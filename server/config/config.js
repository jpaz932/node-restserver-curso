// puerto
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// base de datos
let urlDB;

if(process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/cafe';
else
    urlDB = 'mongodb+srv://jpaz93:3yYZGsUs8JeKAcBg@cluster0-lbp6t.mongodb.net/cafe';


process.env.NODE_URLDB = urlDB;
