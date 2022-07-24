import { useState } from 'react';
import { Movie } from '../../models/movie';
import './createForm.scss';
import React, { Component } from 'react';
import { create } from '../../requests/requests'
import { CreateMovieDto } from '../../interfaces/createMovieDto';
import { RegisterOptions, useForm } from 'react-hook-form';

interface CreateMovieParams {
   // saveMovie(newNovie: Movie): void;
    hideForm(showForm: boolean): void;
}

interface FormInput {
    label: string;
    name: keyof CreateMovieDto;
    type?: string;
    validation?: RegisterOptions;
}

const formInputs: FormInput[] = [
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

export const Form = (props: CreateMovieParams) => {
    
    function hideForm (){
        props.hideForm(true);
    };

    function onSubmit(data: CreateMovieDto) {
        create(data)
            .then(() => hideForm);
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
                                <textarea
                                    className={'create-movie-input'}
                                    placeholder={errors[item.name]?.message ?? item.label}
                                    {...register(item.name, item.validation)}
                                />
                            );
                        case 'date':
                            return <input
                                type={'date'}
                                className={'create-movie-input'}
                                {...register(item.name, item.validation)}
                            />;
                    }

                })
            }
            <button className={'primary-button'}>
                Submit
            </button>
        </form>
    );
};
