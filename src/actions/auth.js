import Swal from 'sweetalert2';

import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) =>{

        // setTimeout(() => {
            
        //     dispatch(login(123, 'Pedro'));

        // }, 3500);

        dispatch(startLoading());

        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        })
        .catch(e => {
            console.log(e);
            // acá se ejecuta por si el usuario escribe algo mal
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        })

    }
}

export const startRegisterWithNameEmailPassword = (name, email, password) => {

    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {

                await user.updateProfile({displayName: name})

                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error')
            })
    }

}

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
               )
            });

    }
}

export const login = (uid, displayName) => {
    return{
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());

        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
})
