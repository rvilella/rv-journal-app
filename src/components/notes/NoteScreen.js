import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active: note} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {title, body, id} = formValues;

    // almacena una variable mutable que no va a renderizar todo el compente si cambia
    const activeId = useRef(note.id);

    // referencia al url de la imagen, para que cuando cambie vuelva a resetear el estado de la nota
    const activeUrl = useRef(note.url)

    useEffect(() => {
        
        // evalua si la nota activa es distinta de la almacenada previamente
        // con current se evalua el valor actual
        if(note.id !== activeId.current) {
            // se redibuja el formulario con la nueva nota activa
            reset(note);
            // se establece el valor actual del activeId
            activeId.current = note.id;
        }
        if(note.url !== activeUrl.current) {
            reset(note);
            activeUrl.current = note.url;
        }

    }, [note, reset])

    useEffect(() => {
       
        dispatch(activeNote(formValues.id, {...formValues}));

    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id));
        Swal.fire('Deleted', note.title, 'success')
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title} 
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    autoComplete="off"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {        
                
                    (note.url) &&
                    <div className="notes__image">
                        <img
                            src={note.url}
                            alt="imagen"
                        />

                    </div>
                }

            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}
