import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Rodrigo'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }
};

// se crea un store (redux/state/auth/uid)
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store= {store}>
        <NoteScreen />
    </Provider>
);

describe('Pruebas en <NoteScreen />', () => {
   
    test('debe de mostarse correctamente', () => {
       
        expect(wrapper).toMatchSnapshot();

    });


    test('debe de disparar el activeNote', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        // expect(activeNote).toHaveBeenCalled();

        // se evalua solamente la ultima llamada
        expect(activeNote).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'Mundo',
                title: 'Hola de nuevo',
                id: 1234,
                date: 0
            }
        );

    });
    
});
