const jwt = require('jsonwebtoken');

// verificar token
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if(err)
        {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido!'
                }
            });
        }

        req.usuario = decoded.usuario
        next();

    });

};

// verificar admin rol
let verificarAdmin = (req, res, next) => {

    let usuario = req.usuario;

    if(usuario.role == 'ADMIN_ROLE')
    {
        next();
    }
    else
    {
        return res.json({
            ok: false,
            err: {
                message: 'Usuario no tiene permisos admin'
            }
        });
    }

};

module.exports = {
    verificaToken,
    verificarAdmin
}
