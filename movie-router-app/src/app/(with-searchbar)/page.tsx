import Image from "next/image";
import styles from "./page.module.css";
import { ENV } from '@/env';
import { type BoxOfficeData } from "@/types/types";
import { BoxofficeMovieInfo } from "@/components/movie-info";
import mock from '../../mock/boxofficelist.json'

// 메인페이지 
export default async function Home() {
  //브라우저에서 fetch
  const recentSunday = getRecentSunday();
  const movieUrl = `${ENV.API_KOBIS_URL}/boxoffice/searchWeeklyBoxOfficeList?key=${ENV.API_KOBIS_KEY}&weekGb=0&targetDt=${recentSunday}`;
  const response = await fetch(movieUrl, {cache: 'force-cache'}); 
  
  const data = await response.json();
  const movies: BoxOfficeData[] = data.boxOfficeResult.weeklyBoxOfficeList;

  const boxofficeType: string = data.boxOfficeResult.boxofficeType;
  const showRange: string[] = data.boxOfficeResult.showRange.split('~');
  const dispRange: string = `${showRange[0].slice(0, 4)}년 ${showRange[0].slice(4, 6)}월 ${showRange[0].slice(6, 8)}일` + " ~ " 
                         +  `${showRange[1].slice(0, 4)}년 ${showRange[1].slice(4, 6)}월 ${showRange[1].slice(6, 8)}일`;
  const yearWeek: string = data.boxOfficeResult.yearWeekTime.substring(4,6);

  return (
    <div className={styles.container}> 
      <div className={styles.boxoffice_title_container}>
        <h4>[{boxofficeType}]</h4>
        <h5>⦿ {yearWeek}주차 ({dispRange})</h5>
      </div>
      <div>
        { movies.map((movie) => <BoxofficeMovieInfo key={movie.movieCd} {...movie} /> )}
      </div>
    </div>
  );
}

// 최근 일요일 구하기 
function getRecentSunday() {
  const d = new Date();
  const day = d.getDay();         // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const diff = d.getDate() - day; // 현재 날짜에서 요일 차이만큼 뺌
  
  const sunday = new Date(d.setDate(diff));
  
  // YYYYMMDD 형식으로 반환
  return sunday.toISOString().substring(0, 10).replaceAll("-","");
}