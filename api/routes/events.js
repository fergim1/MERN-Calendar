/*
    Rutas de Usuarios / Events
    host + /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEventos, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


const router = Router();

//Todas tienen que pasar por la validacion del JWT
// Por lo tanto de aca para abajo, todas las rutas tienen que pasar por dicha validación 
router.use( validarJWT );

// Obtener los eventos
router.get('/', getEventos )

// Crear un nuevo eventos
router.post
(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        // check solo te genera un objeto con los errores, para que pare todo si algo no pasa los check debo llamar al middleware validarcampos
        validarCampos 
    ],
     crearEvento
)

// Actualizar un evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        // check solo te genera un objeto con los errores, para que pare todo si algo no pasa los check debo llamar al middleware validarcampos
        validarCampos 
    ],
    actualizarEventos )

// Borrar un evento
router.delete('/:id', eliminarEvento )


module.exports = router;