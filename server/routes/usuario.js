const express = require('express');
const bcrypt  = require('bcrypt');
const _       = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = Usuario({
        nombre:   body.nombre,
        email:    body.email,
        password: bcrypt.hashSync(body.password, 10),
        role:     body.role
    });

    usuario.save((err, usuarioDB) => {

        if(err)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.put('/usuario/:id', function(req, res) {

    let id   = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

        if(err)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    let limit = req.query.limit || 5;

    desde = Number(desde);
    limit = Number(limit);

    Usuario.find({estado:true}, 'nombre email estado').skip(desde).limit(limit).exec((err, usuarios) => {

        if(err)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Usuario.count({estado:true}, (err, conteo) => {

            res.json({
                ok: true,
                usuarios,
                conteo
            })

        });


    });

});

app.delete('/usuario/:id', function(req, res) {

    let id   = req.params.id;
    let body = _.pick(req.body, ['estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioBorrado) => {

        if(err)
        {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioBorrado)
        {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

    // Eliminar usuario
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //
    //     if(err)
    //     {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //
    //     if(!usuarioBorrado)
    //     {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }
    //
    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });
    //
    // });

})

module.exports = app;
