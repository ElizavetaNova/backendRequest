import React, { Component, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import deleteIcon from '../../images/close.svg';
import { MovieList } from '../../models/movieList';
import './movies.scss';
import { pageMy, deleteMovie } from '../../requests/requests'

const pageSize: number = 10;
//function getListPage(lenghtList: number, countDisplayElements: number) {
//    let listPage = [];
//    const countPage = Math.ceil(lenghtList / countDisplayElements)
//    for (let i = 1; i <= countPage; i++) {
//        listPage.push(i);
//    }
//    return listPage
//}

export function Movies() {
    const [moviesList, setMoviesList] = useState<MovieList[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        pageMy(currentPage-1, pageSize)
            .then(movies => {
                setMoviesList(movies.items);
                setTotalPages(Math.ceil(movies.totalCount / pageSize));
            });
    }, [currentPage]);
    function deleteMovieByID(id: string) {
        deleteMovie(id)
            .then(x => {
                const copyMoviesList = [...moviesList];
                const indexToRemove = copyMoviesList.findIndex(x => x.id === id);
                copyMoviesList.splice(indexToRemove, 1);
                setMoviesList(copyMoviesList);
            });
    }

    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    function onOpenNewPage(numberNewPage: number) {
        setCurrentPage(numberNewPage);
    }

    return (
        <div>
            <table
                className={'app-table table-movies'}
            >
                <thead
                    className={'table-movies__thead'}
                >
                    <tr>
                        <th>Title</th>
                        <th>Rate</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    moviesList.map((movie: MovieList) => (
                    
                        <tr
                            key={movie.id}
                            className={'table-movies__item movies-item'}
                        >
                            <td
                                className={'movies-item__td item-td'}
                            >{movie.title}</td>
                            <td
                                className={'movies-item__td item-td'}
                            >{movie.rate}</td>
                            <td
                                className={'movies-item__td item-td'}
                            >{movie.date}</td>
                            
                            <td
                                className={'movies-item__td item-td'}
                            >
                                <button
                                    onClick={() => deleteMovieByID(movie.id)}
                                >
                                    <img className={'item-td__img'} src={deleteIcon} alt={'delete'} />
                                </button>
                            </td>
                        </tr>
                    
                    ))
                }
            </table>
            <div
                className={'app-pages'}
            >
            {
                pages.map((page: number, index: number) =>

                     <button
                        className={'app-pages__btn'}
                        key={index}
                        onClick={() => onOpenNewPage(page)}
                     >
                            {page}
                     </button>
                )
            }
            </div>
        </div>
    );
};
