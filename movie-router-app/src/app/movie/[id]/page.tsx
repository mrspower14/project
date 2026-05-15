import style from './page.module.css';
import { type MovieData } from '@/types/types';
//import Image from 'next/image';
import movie from '@/mock/movieinfo.json';
import { ENV } from '@/env';
import { MovieInfo } from '@/components/movie-info';
export default async function Page({params, searchParams}: 
    { params: Promise<{id: string}>, 
      searchParams: Promise<{ movieNm: string, openDt: string, director: string } > }) {

    //const movieinfo: MovieData = movie.movieInfoResult.movieInfo;
    const { id } =  await params;
    const { movieNm, openDt, director } = await searchParams;

    const movieData: MovieData = {movieCd:id, movieNm, openDt, director: director};

    return (
        <div>
            <MovieInfo {...movieData} />
        </div>
    );
}