// 박스오피스 영화정보
export interface BoxOfficeData {
    rank: string,
    rankInten: string,
    rankOldAndNew: string,
    movieCd: string,
    movieNm: string,
    openDt: string,
    audiAcc: string
}

// 감독 정보
interface Directors {
    peopleNm: string
}
// 국가 정보
interface Nations {
    nationNm: string
}
// 장르 정보
interface Genres {
    genreNm: string
}
// 장르 정보
interface Actors {
    peopleNm: string
}

// 관람등급 정보
interface Audits {
    watchGradeNm: string
}

// 영화리스트 
export interface MovieListData {
    movieCd: string,
    movieNm: string,
    openDt: string,
    typeNm: string,
    nationAlt: string,
    genreAlt: string,
    directors: Directors[]
}

// 영화 상세정보 
export interface MovieData {
    movieCd: string,
    movieNm: string,
    // showTm: string,
    openDt: string,
    // typeNm: string,
    director: string,
    // nations: Nations[],
    // genres: Genres[],
    // directors: Directors[],
    // actors: Actors[],
    // audits: Audits[],
}
