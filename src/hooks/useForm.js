import { useState } from 'react';

export const useForm = (initialState = {}) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    };

    const handleInputChange = ({target}) => {

        setValues({
            ...values,
            [target.name]: target.value
        });

    }; 

    // values: estado del formulario
    // handleInputChange: para cambiar los valores del formulario
    return [values, handleInputChange, reset];

};