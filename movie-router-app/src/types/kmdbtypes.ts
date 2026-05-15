
interface Director {
    directorNm: string
}
interface Directors {
    director: Director[],
}
interface Actor {
    actorNm: string
}
interface Actors {
    actor: Actor[]
}
interface Plot {
    plotLang: string,
    plotText: string,
}
interface Plots {
    plot: Plot[]
}

interface Vod {
    vodUrl: string
}
interface Vods {
    vod: Vod[]
}

// interface Rating {
//     ratingGrade: string,
// }
// interface Ratings {
//     rating: Rating[];
// }
export interface KmdbMovieData {
    DOCID: string,
    movieSeq: string,
    title: string,
    prodYear: string,
    directors: Directors,
    actors: Actors,
    nation: string,
    company: string,
    plots: Plots,
    runtime: string,
    rating: string,
    //ratings: Ratings[],
    genre: string,
    kmdbUrl: string,
    type: string,
    use: string, 
    repRlsDate: string,
    posters: string,
    stlls: string,
    audiAcc: string,
    Awards1: string,
    vods: Vods,
}