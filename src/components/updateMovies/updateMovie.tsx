import { useEffect} from 'react';
import './updateMovie.scss';
import { getItem, update } from '../../requests/requests';
import { useForm } from 'react-hook-form';
import { UpdateMovieDto } from '../../interfaces/updateMovieDto';
import { formInputs } from '../arrayInputsForm';

interface UpdateMovieParams {
    idItem: string,
    hideForm(showForm: boolean): void;
}

export const Form = (props: UpdateMovieParams) => {
        
    function hideForm() {
        props.hideForm(true);
    }

    const { register, reset, formState: { errors }, handleSubmit } = useForm<UpdateMovieDto>({
        defaultValues: {},
        reValidateMode: 'onChange',
        mode: 'onBlur',
    });

    useEffect(() => {
        if (!props.idItem) return;

        getItem(props.idItem)
            .then((item) => {
                reset(item);
            });

    }, [props.idItem]);

    function onSubmit(data: UpdateMovieDto) {
        if (!props.idItem) return;
        update(props.idItem, data);
        hideForm();
    }    

    return (
        <div>
            <button className={'primary-button'}
                onClick={hideForm}
            >
                Cancel
            </button>
            <form className={'update-movie__form'}
                onSubmit={handleSubmit(onSubmit)}
            >
                {
                    formInputs.map((item) => {
                        switch (item.type) {
                        case undefined:
                            return <>
                                <input
                                    className={'update-movie-input'}
                                    placeholder={item.label}
                                    {...register(item.name, item.validation)}
                                />
                                {
                                    errors[item.name]?.message &&
                                    <p className="error">
                                        {errors[item.name]?.message}
                                    </p>
                                }
                            </>;
                        case 'textarea':
                            return (
                                <>
                                    <textarea
                                        className={'create-movie-input'}
                                        placeholder={errors[item.name]?.message ?? item.label}
                                        {...register(item.name, item.validation)}
                                    />
                                    {
                                        errors[item.name]?.message &&
                                        <p className="error">
                                            {errors[item.name]?.message}
                                        </p>
                                    }
                                    
                                </>);
                        case 'date':
                            return( <>
                                <input
                                    type={'date'}
                                    className={'create-movie-input'}
                                    {...register(item.name, item.validation)}
                                />
                                {
                                    errors[item.name]?.message &&
                                        <p className="error">
                                            {errors[item.name]?.message}
                                        </p>
                                }
                            </>);
                        case 'number':
                            return ( <>
                                <input
                                    type={'number'}
                                    className={'create-movie-input'}
                                    {...register(item.name, item.validation)}
                                />
                                {
                                    errors[item.name]?.message &&
                                        <p className="error">
                                            {errors[item.name]?.message}
                                        </p>
                                }
                            </>);
                        }

                    })
                }
                <div className={'form-filler'}></div>
                <button className={'primary-button'}>
                    Submit
                </button>
            </form >
        </div>
        
    );
};
