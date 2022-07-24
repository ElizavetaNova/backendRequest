import axios from 'axios';
import { Movie } from '../models/movie';
import { CollectionDto } from '../interfaces/collectionDto';
import { MovieList } from '../models/movieList';
import { CreateMovieDto } from '../interfaces/createMovieDto';
import { UpdateMovieDto } from '../interfaces/updateMovieDto';

const api = axios.create({ baseURL: 'http://students.dev.thewhite.ru/api' });
api.defaults.headers.common['Content-Type'] = 'application/json';
api.interceptors.request.use((config) => {
    if (config.headers)
        config.headers['Authorization'] = '36d6c5ae-df3f-444c-afcd-425c611f096e';

    return config;
});

export function pageMy(page: number, size: number) {
    const params = { page, size };
    return api.get<CollectionDto<MovieList>>('movies/page-my', { params })
        .then(res => res.data);
}

export function deleteMovie(id: string) {
    return api.post(`movies/${id}/delete`);
}

export function create(dto: CreateMovieDto) {
    return api.post<Movie>('movies/create', dto)
        .then(res => res.data);
}

export function update(id: string, dto: UpdateMovieDto) {
    return api.post<Movie>(`movies/${id}/update`, dto)
        .then(res => res.data);
}

export function getItem(id: string) {
    return api.get<Movie>(`movies/${id}`)
        .then(res => res.data);
}
