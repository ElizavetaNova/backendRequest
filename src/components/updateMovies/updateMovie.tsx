import './updateMovie.scss';
import { update } from '../../requests/requests';
import { CreateOrUpdateMovieDto } from '../../interfaces/createOrUpdateMovieDto';
import { FormInputsDisplay } from '../arrayInputsForm';

interface UpdateMovieParams {
    idItem: string,
    hideForm(showForm: boolean): void;
}

export const Form = (props: UpdateMovieParams) => {
        
    function hideForm() {
        props.hideForm(true);
    }

    function onSubmit(data: CreateOrUpdateMovieDto) {
        if (!props.idItem) return;
        update(props.idItem, data);
        hideForm();
    }    

    return (
        <div>
            <button
                className={'primary-button'}
                onClick={hideForm}
            >
                Cancel
            </button>

            <FormInputsDisplay onSubmit={onSubmit} idItem={props.idItem} />
            
        </div>
        
    );
};
