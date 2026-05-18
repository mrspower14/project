import { type MovieData, BoxOfficeData, MovieListData} from '@/types/types';
import { type KmdbMovieData } from '@/types/kmdbtypes';
import Image from 'next/image';
import style from './movie-info.module.css';
import { ENV } from '@/env';
import Link from 'next/link';
import mock from '../mock/kmdbmovieinfo.json';


export async function MovieList( movie: KmdbMovieData) {

    const poster = movie.posters.split("|")[0];
    let rlsDate = movie.repRlsDate.replaceAll("-", "");
    if (rlsDate) {
        rlsDate = rlsDate.substring(0, 4) + "-" + rlsDate.substring(4, 6) + "-" + rlsDate.substring(6, 8);
    }
    // const rating = movie.ratings.rating;
    // const ratingGrade = rating[0]?.ratingGrade.split("||")[0];
    const movieTitle = movie.title.replaceAll("!HS","").replaceAll("!HE","").trim();
    const directorList = movie.directors.director.map((dir) => dir.directorNm.replaceAll("!HS","").replaceAll("!HE","").trim());
    const directorName = directorList.slice(0, 5).join(", ");
    const actorList = movie.actors.actor.map((ac) => ac.actorNm);
    const actorName = actorList.slice(0, 5).join(", ");
    
    return (
        <Link href={{
            pathname: `/movie/${movie.DOCID}`,
            query: { movieNm: `${movieTitle}`, openDt: `${rlsDate}`, director: `${directorList[0]}` },
            }} 
            className={style.movielist_container} > 
            <div>
                <Image className={style.imamge} src={poster} alt={`${movieTitle}의 포스터`} width={200} height={250}/>
            </div>
            <div>
                <div className={style.title}>{movieTitle}</div>
                <div className={style.description}>요약정보: {movie.use} | {movie.genre} | {movie.runtime}분 | {movie.rating} | {movie.nation} </div>
                <div className={style.description}>개봉일: {rlsDate}</div>
                <div className={style.description}>제작년도: {movie.prodYear}년</div>
                <div className={style.description}>감독: {directorName}</div>
                <div className={style.description}>배우: {actorName}</div>
            </div>
        </Link>
    );
}
