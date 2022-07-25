import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreateOrUpdateMovieDto } from '../interfaces/createOrUpdateMovieDto';
import { FormInput } from '../interfaces/formInput';
import { getItem } from '../requests/requests';

export const formInputs: FormInput[] = [
    {
        label: 'Title',
        name: 'title',
        validation: {
            required: {
                value: true,
                message: 'This field is required',
            },
            pattern: {
                value: /\w{1,30}/,
                message: 'Invalid',
            },
        },
    },
    {
        label: 'Rate movie',
        name: 'rate',
        validation: {
            required: {
                value: true,
                message: 'This field is required',
            },
            min: 0,
            max: 5,
            valueAsNumber: true,
        },
    },
    {
        label: 'Leave your comment',
        name: 'comment',
        type: 'textarea',
    },
    {
        label: 'Premier date',
        name: 'date',
        type: 'date',
        validation: {
            required: {
                value: true,
                message: 'This field is required',
            },
        },
    },
];

interface CreateOrUpdateMovieParams {
    onSubmit(data: CreateOrUpdateMovieDto): void;
    idItem: string | null;
}

export const FormInputsDisplay = (props: CreateOrUpdateMovieParams) => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm<CreateOrUpdateMovieDto>({
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

    return (
        <form
            className={'add-movie__form'}
            onSubmit={handleSubmit(props.onSubmit)}
        >
            {
                formInputs.map((item) => {
                    switch (item.type) {
                        case undefined:
                            return <>
                                <input
                                    className={'create-movie-input'}
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
                            return (
                                <>
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
                                </>
                            );
                    }
                })
            }
            <button className={'primary-button'}>
                Submit
            </button>
        </form>
    );
};
