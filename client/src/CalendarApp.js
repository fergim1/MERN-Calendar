import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouter } from './components/routers/AppRouter';




export const CalendarApp = () => {
    return (
            <Provider store={ store }>
                <AppRouter/>
            </Provider>            
    )
}
