const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    // Para saber quien creo este evento, hacemos una referencia al usuario
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

// Como quiero que se vea mi Squema (No hace modificaciones en la base de datos, solo es para verlo como quiero)
EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})


module.exports = model('Evento', EventoSchema );

