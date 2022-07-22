import { useState } from 'react';
import { Movie } from '../../models/movie';
import './form.scss';

interface CreateMovieParams {
    saveMovie(newNovie: Movie): void;
    hiddenForm(showForm: boolean): void;
}

export const Form = (props: CreateMovieParams) => {
    const [title, setTitle] = useState<string>('');
    const [rate, setRate] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const [movie, setMovie] = useState<Movie>({
        id: '',
        title: '',
        rate: 0,
        comment: '',
        date: ''
    });
    const onHiddenForm = () => {
        props.hiddenForm(true);
    };
    const onSaveMovie = () => {
        props.saveMovie(movie);
        setMovie({
            id: '',
            title: '',
            rate: 0,
            comment: '',
            date: ''
        });

    };

    return (
        <form className={'add-movie__form'} >

            <label>Title : </label>
            <input type="text"
                value={title}
                name={'title'}
                onChange={(event) => {
                    setTitle(event.target.value);
                    setMovie({
                        id: '',
                        title: title,
                        rate: rate,
                        comment: comment,
                        date: date
                    });
                }
                }
            />

            <label>Rate : </label>
            <input type="number"
                value={rate}
                name={'rate'}
                max={5}
                min={0}
                onChange={(event) => {
                    setRate(Number(event.target.value));
                    setMovie({
                        id: '',
                        title: title,
                        rate: rate,
                        comment: comment,
                        date: date
                    });
                }}
            />

            <label>Date : </label>
            <input type="date"
                value={date}
                name={'date'}
                onChange={(event) => {
                    setDate(event.target.value);
                    setMovie({
                        id: '',
                        title: title,
                        rate: rate,
                        comment: comment,
                        date: date
                    });
                }}
            />

            <label>Description : </label>
            <textarea
                value={comment}
                name={'comment'}
                onChange={(event) => {
                    setComment(event.target.value);
                    setMovie({
                        id: '',
                        title: title,
                        rate: rate,
                        comment: comment,
                        date: date
                    });
                }}
            />

            <input type="submit" value="Save" onClick={(event) => {
                event.preventDefault();
                onSaveMovie();
                onHiddenForm();
            }}
            />
        </form>
    );
};
