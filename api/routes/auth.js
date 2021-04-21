/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const express = require('express');
const router = express.Router();
const { check }=  require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');



router.post(
    '/new',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password').isLength({min: 6}).withMessage('El password debe contener al menos 6 caracteres'),
        validarCampos
    ],
    crearUsuario );


router.post(
    '/',
    [
        check('email').isEmail().withMessage('El email es obligatorio'),
        check('password')
            .isLength({ min: 5 }).withMessage('El password debe contener al menos 6 caracteres')
            .matches(/\d/).withMessage('must contain a number'),
        validarCampos
    ],
    loginUsuario );

router.get('/renew', revalidarToken );


module.exports = router;