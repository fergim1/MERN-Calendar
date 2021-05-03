const { response } = require('express')
const Evento = require('../models/Evento')


const getEventos = async ( req, res = response ) => {

    const eventos = await Evento.find()
                                        .populate('user', 'name')


    res.json({
            ok: true,
            eventos
        }) 
}

const crearEvento = async ( req, res = response ) => {
    
    const evento = new Evento ( req.body );
    
    try {        
        evento.user= req.uid;
        const eventoGuardado = await evento.save();        
        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })        
    }  
}




const actualizarEventos = async ( req, res = response ) => {

    const eventoID = req.params.id;
    const user = req.uid

    try {
        const evento = await Evento.findById( eventoID );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se puede modificar el evento, porque no existe ningún evento con ese id'
            })
        }

        // Verifico si la persona que creó el evento es la misma que lo queire modificar
        if ( evento.user.toString() !== user) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de modificar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: user
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoID, nuevoEvento, {new: true})
        //  El objeto ultimo { new: true} lo pongo para que me devuelva el objeto actualizado, sino me devuelve el anterior de actualizar
        
       return res.json({
            ok: true,
            evento: eventoActualizado
        })        

        
    } catch (error) {
        console.log(error);
       return  res.status(500).json({
            ok:false,
            msg: ' Hable con el administrador'
        })
        
    }
}




const eliminarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const user = req.uid;

    try {
        const evento = await Evento.findById( eventoId );

        if ( !evento)  {
            return res.status(404).json({
                ok: false,
                msg: 'No se puede eliminar el evento, porque no existe un evento con ese id'
            })
        }

        if ( evento.user.toString() !== user ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findOneAndDelete( eventoId );

        return res.json({
            ok: true,
            msg: 'Evento Eliminado'
        })

        
    } catch (error) {
        
    }
}



module.exports = {
    getEventos,
    crearEvento,
    actualizarEventos,
    eliminarEvento
}