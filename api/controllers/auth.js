const { response } = require('express');  // Obtengo response de express para colocarselo a res y tener todo el IntelliSense 
const { validationResult } = require('express-validator')

const crearUsuario = ( req, res = response ) =>{

    const { name, email, password } = req.body ;

    // Manejo de errores
    const errors = validationResult ( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'Crear Usuario',
        name, 
        email,
        password
    })
}

const loginUsuario = ( req, res = response ) =>{

    const { email, password } = req.body ;

    res.status(201).json({
        ok: true,
        msg: 'login Usuario',
        email,
        password
    })
}


const revalidarToken = ( req, res = response ) =>{

    res.json({
        ok: true,
        msg: 'revalidar Token'
    })
}



module.exports= {
    crearUsuario,
    loginUsuario,
    revalidarToken
}