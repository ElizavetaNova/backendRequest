import './createForm.scss';
import { create } from '../../requests/requests';
import { CreateOrUpdateMovieDto } from '../../interfaces/createOrUpdateMovieDto';
import { FormInputsDisplay } from '../arrayInputsForm';

interface CreateMovieParams {
    hideForm(showForm: boolean): void;
}

export const Form = (props: CreateMovieParams) => {
    
    function hideForm (){
        props.hideForm(true);
    }

    function onSubmit(data: CreateOrUpdateMovieDto) {
        create(data);
        hideForm();
    }
        
    return (
        <FormInputsDisplay onSubmit={onSubmit} idItem={null} />
    );
};
