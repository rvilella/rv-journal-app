import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import {firebase} from '../firebase/firebase-config';

import { login } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    // bandera de chequeo de usuario existente, se inicializa en true
    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        // observable que esta pendiente de los cambios de user
        firebase.auth().onAuthStateChanged(async(user) => {
            
            // evalua si el user existe
            if (user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            }else {
                setIsLoggedIn(false);
            }

            // ya termina de chequear si existe un usuario
            setChecking(false);

        });
        
    }, [dispatch, setChecking, setIsLoggedIn])

    if(checking){
        return(
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route */}
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect
                        to="/auth/login"
                    />
                </Switch>
            </div>
        </Router>
    )
}
