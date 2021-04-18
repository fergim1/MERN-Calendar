import React, { useState } from 'react';
import { Calendar , momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/uiAction';
import { eventSetActive } from '../../actions/events';

moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const events = [{
    title: 'Cumpleaños de Dante',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Fernando'
    }
}]

export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month')

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacy: 0.8,
            display: 'block',
            color: 'white',
        }
        return {
            style
        }
    }

    const onDoubleClick = (e ) => {
        console.log(e)
        dispatch ( uiOpenModal() )

    } 
    const onSelect = (e ) => {
        console.log(e)
        dispatch(eventSetActive( e ))
    } 

    const onViewChange = (e ) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
        console.log(e)
    } 
    
    return (
        <div className='calendar-screen'>
            <Navbar/>

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages= { messages }
                eventPropGetter= { eventStyleGetter }
                onDoubleClickEvent= { onDoubleClick }
                onSelectEvent={ onSelect }
                view= { lastView }
                onView= { onViewChange }
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal/>
        </div>
    )
}
