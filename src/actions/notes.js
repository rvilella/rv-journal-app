import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

// react-journal


export const startNewNote = () => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid;
       
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        
            dispatch(activeNote(doc.id, newNote));
            dispatch(addNewNote(doc.id, newNote));

        } catch (error) {
            console.log(error);
        }

    }    
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refresNote(note.id, note));

        Swal.fire('Saved', note.title, 'success');

    }
}

export const refresNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note
    }
})

export const startUploading = (file) => {
    return async(dispatch, getState) => {
        // const activeNote = getState().notes.active;
        const {active: activeNote} = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        // console.log(fileUrl);
        dispatch(startSaveNote(activeNote))

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        
        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})