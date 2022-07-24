import { useEffect, useState } from 'react';
import { Movie } from '../../models/movie';
import './updateMovie.scss';
import React, { Component } from 'react';
import { create, getItem, update } from '../../requests/requests'
import { CreateMovieDto } from '../../interfaces/createMovieDto';
import { RegisterOptions, useForm } from 'react-hook-form';
import { UpdateMovieDto } from '../../interfaces/updateMovieDto';

interface UpdateMovieParams {
    idItem: string,
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

export const Form = (props: UpdateMovieParams) => {
        
    function hideForm() {
        props.hideForm(true);
    };   


    const { register, reset, formState: { errors }, setValue, handleSubmit } = useForm<UpdateMovieDto>({
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
        update(props.idItem, data)
        hideForm();
    }    

    return (
        <div>
            <button className={'primary-button'}
                onClick={hideForm}
            >
                Cancel
            </button>
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
            </form >
        </div>
        
    );
};
