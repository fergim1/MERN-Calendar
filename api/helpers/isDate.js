const moment = require('moment')


const isDate = ( value ) => {
    
    if ( !value ) {
        return false;
    }
    
    const fecha = moment();
    
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
}

module.exports= {
    isDate
}