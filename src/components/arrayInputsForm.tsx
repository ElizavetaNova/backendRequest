import { useForm } from 'react-hook-form';
import { CreateMovieDto } from '../interfaces/createMovieDto';
import { FormInput } from '../interfaces/formInput';

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
            }
        },
    },
];

export function FormInputsDisplay () {
    const { register, formState: { errors } } = useForm<CreateMovieDto>({
        defaultValues: {},
        reValidateMode: 'onChange',
        mode: 'onBlur',
    });
    return (
        <div>
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
        </div>
)}