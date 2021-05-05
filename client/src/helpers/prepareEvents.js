import moment from 'moment'

export const prepareEvents = ( events = [] ) => {

    return events.map(
        (evento) => ({
            ...evento,
            start: moment ( evento.start).toDate(),
            end: moment ( evento.end).toDate(),

        })
    )


}