import { type MovieData, BoxOfficeData, MovieListData} from '@/types/types';
import { type KmdbMovieData } from '@/types/kmdbtypes';
import Image from 'next/image';
import style from './movie-info.module.css';
import { ENV } from '@/env';
import Link from 'next/link';
import mock from '../mock/kmdbmovieinfo.json';
import { InputEvent } from 'react';

async function getMovieInfo (movieNm: string, openDt: string | null, director: string | null): Promise<KmdbMovieData | null> {
    let movies: KmdbMovieData[] = [];
    try {
        const encodedQuery = encodeURIComponent(movieNm); //한글 인코딩
        let movieUrl = `${ENV.API_KMDB_URL}&ServiceKey=${ENV.API_KMDB_KEY}&detail=Y&title=${encodedQuery}`;
        if (openDt && openDt != "undefined") movieUrl += `&releaseDts=${openDt}`;
        if (director && director != "undefined") movieUrl += `&director=${director}`;

        const response = await fetch(movieUrl); 
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        //mock.Data[0].Result[0]= await response.json();
        movies = data.Data[0]?.Result ?? [];
    } catch (err) {
         console.log(err);
    }
    return movies.length > 0 ? movies[0]: null;
}

export async function BoxofficeMovieInfo( {rank, rankInten, rankOldAndNew, movieCd, movieNm, openDt, audiAcc}: BoxOfficeData) {

    if (!movieNm) return <div>영화를 선택하세요.</div>;
    const openDate = openDt.replaceAll("-", "");
    const movie: KmdbMovieData | null = await getMovieInfo(movieNm, openDate, "");
    
    if (!movie || !movie.title) return <div>영화정보가 없습니다.</div>;
    const poster = movie.posters.split("|")[0];
    
    let rankNew = rankOldAndNew === "OLD"? "": "new";
    let rankColor = rankOldAndNew === "OLD"? "": "orange";
    if (rankNew !== "new"){
        if (rankInten.includes("-")) {
            rankInten = "↓ " + rankInten.replace("-", "");
            rankColor = "blue";
        } else {
            rankInten = rankInten === "0" ? "" : "↑ " + rankInten;
            rankColor = "red";
        }
    }
    rankNew = rankNew === "" ? rankInten: rankNew;

    return (
        <Link href={{
            pathname: `/movie/${movieCd}`,
            query: { movieNm: `${movieNm}`, openDt: `${openDate}`, director: '' },
            }} 
            className={style.boxoffice_container} >
                <div>
                    <Image className={style.image} src={poster} alt={`${movieNm}의 포스터`} width={120} height={140}/>
                </div>
                <div>
                    <div className={style.title}>{rank}. {movieNm}&nbsp;&nbsp;&nbsp;<span style={{color: `${rankColor}`}}>{rankNew}</span></div>
                    <div className={style.description}>개봉일: {openDt}</div>
                    <div className={style.description}>관객수: {Number(audiAcc).toLocaleString()}명</div>
                    <div className={style.description}>{movie.genre}&nbsp;|&nbsp;{movie.rating}</div>
                </div>
        </Link>
    );
}

export async function MovieListInfo( {movieCd, movieNm, openDt, directors }: MovieListData) {

    if (!movieNm) return <div>영화를 선택하세요.</div>;

    const director: string = directors?.[0]?.peopleNm;
    const openDate = openDt.replaceAll("-", "");
    const movie: KmdbMovieData | null = await getMovieInfo(movieNm, openDt.replaceAll("-", ""), director);
    
    if (!movie || !movie.title) return (
         <div>
                {/* <div className={style.title}>{movieNm}</div>
                <div className={style.description}>영화 상세정보가 없습니다.</div> */}
        </div>
    );
    // if (!movie || !movie.title) return (
    //     <div></div>
    // );

    let poster = movie.posters.split("|")[0];
    if (!poster) {
        poster = "/movie.png";
    }
    
    let rlsDate = movie.repRlsDate.replaceAll("-", "");
    if (rlsDate) {
        rlsDate = rlsDate.substring(0, 4) + "-" + rlsDate.substring(4, 6) + "-" + rlsDate.substring(6, 8);
    }
    // const rating = movie.ratings.rating;
    // const ratingGrade = rating[0]?.ratingGrade.split("||")[0];
    const directorList = movie.directors.director.map((dir) => dir.directorNm.replaceAll("!HS","").replaceAll("!HE","").trim());
    const directorName = directorList.slice(0, 5).join(", ");
    const actorList = movie.actors.actor.map((ac) => ac.actorNm);
    const actorName = actorList.slice(0, 5).join(", ");
    const awardList = movie.Awards1.split("|");
    
    let awards = ""; 
    if (awardList.length > 0 && awardList[0] !== "") {
        awards = "수상내역: [" + awardList[0];
        if (awardList.length > 1) {
            awards += "] 외 다수";
        }
    }
    
    return (
        <Link href={{
            pathname: `/movie/${movieCd}`,
            query: { movieNm: `${movieNm}`, openDt: `${openDate}`, director: `${director}` },
            }} 
            className={style.movielist_container} > 
            <div>
                <Image className={style.image} src={poster} alt={`${movieNm}의 포스터`} width={200} height={250}/>
            </div>
            <div>
                <div className={style.title}>{movieNm}</div>
                <div className={style.description}>요약정보: {movie.use} | {movie.genre} | {movie.runtime}분 | {movie.rating} | {movie.nation} </div>
                <div className={style.description}>개봉일: {rlsDate}</div>
                <div className={style.description}>제작년도: {movie.prodYear}년</div>
                <div className={style.description}>감독: {directorName}</div>
                <div className={style.description}>배우: {actorName}</div>
                <div className={style.description}>{awards}</div>
            </div>
        </Link>
    );
}

export async function MovieInfo( {movieCd, movieNm, openDt, director}: MovieData) {

    if (!movieNm) return <div>영화를 선택하세요.</div>;
    // console.log(directors[0]);
    // const director: string = directors?.[0]?.peopleNm;
    const movie: KmdbMovieData | null = await getMovieInfo(movieNm, openDt.replaceAll("-", ""), director);
    //console.log(movie);
   
    if (!movie || !movie.title) return (
        <div className={style.container}>
            <div className={style.title}>{movieNm}</div>
            <div>영화 상세정보가 없습니다.</div>
        </div>
    );
    const posterList = movie.posters.split("|").slice(0,9);
    let poster = posterList[0];
    if (!poster) {
        poster = "/movie.png";
    }
    
    const stllsList = movie.stlls.split("|").slice(0,12);

    let rlsDate = movie.repRlsDate.replaceAll("-", "");
    if (rlsDate) {
        rlsDate = rlsDate.substring(0, 4) + "-" + rlsDate.substring(4, 6) + "-" + rlsDate.substring(6, 8);
    }
  
    const directorList = movie.directors.director.map((dir) => dir.directorNm.replaceAll("!HS","").replaceAll("!HE","").trim());
    const directorName = directorList.slice(0, 5).join(", ");
    const actorList = movie.actors.actor.map((ac) => ac.actorNm);
    const actorName = actorList.slice(0, 5).join(", ");
    const vod = movie.vods.vod[0]?.vodUrl;

    return (
        <div>
            <div className={style.movie_container}>
                <div>
                    <Image className={style.image_detail} src={poster} alt={`${movieNm}의 포스터`} width={220} height={300}/>
                </div>
                <div>
                    <div className={style.title}>{movieNm}</div>
                    <div className={style.description}>요약정보: {movie.use} | {movie.genre} | {movie.runtime}분 | {movie.rating} | {movie.nation} </div>
                    <div className={style.description}>개봉일: {rlsDate}</div>
                    <div className={style.description}>제작년도: {movie.prodYear}년</div>
                    <div className={style.description}>감독: {directorName}</div>
                    <div className={style.description}>배우: {actorName}</div>
                    <div className={style.description}>URL: <a href={movie.kmdbUrl} target='_blank'>{movie.kmdbUrl}</a></div>
                    <div className={style.description}>VOD: <a href={vod} target='_blank'>{vod}</a></div>
                </div>
            </div>
            <div className={style.plot_container}>
                <div className={style.title}>시놉시스</div>
                <div className={style.plot_description}>
                    {movie.plots.plot[0]?.plotText}
                </div>
            </div>
            <div className={style.plot_container}>
                <div className={style.title}>포스터</div>
                <div className={style.poster_container}>
                    {posterList.map ((poster) => {
                        return poster 
                        ? <Image key={poster} className={style.image_detail_stlls} src={poster} alt={`${movieNm}의 포스터`} width={180} height={200} />                      
                        : <div></div>
                    })}
                </div>
            </div>

            <div className={style.plot_container}>
                <div className={style.title}>스틸컷</div>
                <div className={style.poster_container}>
                    {stllsList.map ((stlls) => { 
                        return stlls ? <Image key={stlls} className={style.image_detail_stlls} src={stlls} alt={`${movieNm}의 스틸컷`} width={130} height={150} /> : <div></div>
                    })}
                </div>
            </div>
        </div> 
    );
}