import './createForm.scss';
import { create } from '../../requests/requests';
import { CreateMovieDto } from '../../interfaces/createMovieDto';
import { useForm } from 'react-hook-form';
import { FormInputsDisplay } from '../arrayInputsForm';

interface CreateMovieParams {
    hideForm(showForm: boolean): void;
}

export const Form = (props: CreateMovieParams) => {
    
    function hideForm (){
        props.hideForm(true);
    }

    function onSubmit(data: CreateMovieDto) {
        create(data);
        hideForm();
    }

    const { handleSubmit } = useForm<CreateMovieDto>({
        defaultValues: {},
        reValidateMode: 'onChange',
        mode: 'onBlur',
    });

    return (
        <form className={'add-movie__form'}
            onSubmit={handleSubmit(onSubmit)}
        >
            
            <FormInputsDisplay />
                    
            
            <button className={'primary-button'}>
                Submit
            </button>
        </form>
    );
};
