import './createForm.scss';
import React, { Component } from 'react';
import { create } from '../../requests/requests';
import { CreateMovieDto } from '../../interfaces/createMovieDto';
import { RegisterOptions, useForm } from 'react-hook-form';
import { formInputs } from '../arrayInputsForm';

interface CreateMovieParams {
    hideForm(showForm: boolean): void;
}

export const Form = (props: CreateMovieParams) => {
    
    function hideForm (){
        props.hideForm(true);
    };

    function onSubmit(data: CreateMovieDto) {
        create(data);
        hideForm();
    }

    const { register, formState: { errors }, handleSubmit } = useForm<CreateMovieDto>({
        defaultValues: {},
        reValidateMode: 'onChange',
        mode: 'onBlur',
    });

    return (
        <form className={'add-movie__form'}
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                formInputs.map((item, index) => {
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
