import React, { useEffect, useState } from 'react';
import { Calendar , momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarModal } from './CalendarModal';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/uiAction';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from './AddNewFab';
import { DeleteEventFab } from './DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer


export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month');

    useEffect(() => {        
        dispatch ( eventStartLoading() )
    }, [ dispatch ])
    
    const onDoubleClick = (e ) => {
        dispatch ( uiOpenModal() )
        
    } 
    const onSelectEvent = (e ) => {
        dispatch( eventSetActive( e ))
    } 
    
    const onViewChange = (e ) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    } 

    const onSelectSlot = ( e ) => {
        dispatch ( eventClearActiveEvent() )
    }
    
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
                onSelectEvent={ onSelectEvent }
                onSelectSlot= { onSelectSlot }
                selectable= { true }
                view= { lastView }
                onView= { onViewChange }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab/>

            {
                (activeEvent)  && <DeleteEventFab/>
            }

            <CalendarModal/>
        </div>
    )
}
