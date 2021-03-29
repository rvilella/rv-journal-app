import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { firebase } from '../../firebase/firebase-config';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';

act

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
};

// se crea un store (redux/state/auth/uid)
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
    
    test('debe de llamar el login si se está autenticado', async() => {

        let user;
    
        // funcion async para disparar la autenticación de firebase
        await act(async() => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            // console.log(userCred);

            const wrapper = mount(
                <Provider store= {store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );

        });

        // expect(login).toHaveBeenCalledWith();
        expect(login).toHaveBeenCalledWith('sRzHuhN6t9UQFHZearDfW3C35ii1', null);

    });
    
});
