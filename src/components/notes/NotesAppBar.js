import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const {active} = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    const handlePictureClick = () => {
        // # --> busca por el id
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        // console.log(e);
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
            // para que se resetee el valor y permita subir una misma imagen a 2 notas
            document.querySelector('#fileSelector').value = '';
        }
    }

    return (
        <div className="notes__appbar">
            <span>14 de enero de 2021</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />

            <div>
                <button 
                    className="btn"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
