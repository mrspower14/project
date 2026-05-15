
import { type MovieListData } from '@/types/types';
import { type KmdbMovieData } from '@/types/kmdbtypes';
import { MovieListInfo } from '@/components/movie-info';
import { ENV } from '@/env';
import style from 'page.module.css';
import mock from '../../../mock/movielist.json'
import kmdbmock from '../../../mock/kmdbmovieinfo.json'

export default async function Page({searchParams}: {searchParams: Promise<{q?:string}>}) {

    const {q} = await searchParams;
    let url = `${ENV.API_KOBIS_URL}/movie/searchMovieList?key=${ENV.API_KOBIS_KEY}&itemPerPage=30`;
    if (q) {
        url += `&movieNm=${q}`;
    }

    const response = await fetch(url); 
    const data = await response.json();
    const movies: MovieListData[] = data.movieListResult.movieList;

    return (
        <div className="search_movie_container">
            <h4>검색결과: {movies.length}건</h4>

            {movies.map ((movie) => {
                return <MovieListInfo key={movie.movieCd} {...movie}/>
            })}
        </div>
    );
}