import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
  
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../../components/auth/LoginScreen';
import { CalendarScreen } from '../../components/calendar/CalendarScreen';
import { startChecking } from '../../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoute } from './PrivateRoutes';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoutes 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                        // si uid = null , !!null = false
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen } 
                        isAuthenticated={ !!uid }
                        // si uid es un string , !!null = true

                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
