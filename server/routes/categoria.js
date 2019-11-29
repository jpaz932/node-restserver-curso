const express       = require('express');
let app             = express();
let Categoria       = require('../models/categoria');
let {verificaToken, verificarAdmin} = require('../middlewares/autenticacion');

// Ver Categorias
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
    .sort('nombre')
    .populate('usuario', 'nombre email')
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

// Ver Categoria por id
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id   = req.params.id

    Categoria.findById(id, (err, categoria) => {

        if(err)
        {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoria)
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
            categoria
        });

    });

});

// Crear categoria
app.post('/categoria', [verificaToken, verificarAdmin], (req, res) => {
    let body = req.body;

    let categoria = Categoria({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if(err)
        {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

// Actualizar categoria
app.put('/categoria/:id', [verificaToken, verificarAdmin], (req, res) => {
    let id   = req.params.id
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, {new: true}, (err, categoria) => {

        if(err)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!categoria)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria
        });

    });

});

// Eliminar categoria
app.delete('/categoria/:id', [verificaToken, verificarAdmin], (req, res) => {
    let id   = req.params.id

    Categoria.findByIdAndRemove(id, (err, categoria) => {
        if(err)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!categoria)
        {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Eliminada con exito',
            categoria
        });

    });

});

module.exports = app;
