const express         = require('express');
const {verificaToken} = require('../middlewares/autenticacion');
let app               = express();
let Producto          = require('../models/producto');

// Obtener Productos
app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({disponible: true})
    .skip(desde).limit(5)
    .sort('nombre')
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre')
    .exec((err, categorias) => {

        if(err)
        {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categorias
        })

    });
});

// buscar producto
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let expresionReg = new RegExp(termino, 'i');

    Producto.find({nombre: expresionReg})
    .populate('categoria', 'nombre')
    .exec((err, productos) => {
        if(err)
        {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productos
        })
    })

});

// Obtener Producto por id
app.get('/productos/:id', verificaToken, (req, res) => {
    let id   = req.params.id

    Producto.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre')
    .exec((err, producto) => {

        if(err)
        {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!producto)
        {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe'
                }
            });
        }

        res.json({
            ok: true,
            producto
        });

    });
});

// Crear Productos
app.post('/productos', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, producto) => {

        if(err)
        {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!producto)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto
        });

    });
});

// Actualizar Productos
app.put('/productos/:id', verificaToken, (req, res) => {
    let id   = req.params.id
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, {new: true}, (err, producto) => {

        if(err)
        {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!producto)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto
        });

    });
});

// Eliminar Productos
app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, {new: true}, (err, producto) => {

        if(err)
        {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!producto)
        {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            producto
        });

    });

});

module.exports = app;
