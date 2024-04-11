import axios from 'axios';

const APIKey = "71c6c1445dde621e0f4d34d62e2632aa";

const dirct= "https://api.themoviedb.org/3";
// Endpoint 
const trendingMoviesAPI = `${dirct}/trending/movie/day?language=en-US&api_key=${APIKey}`;
const upComingAPI = `${dirct}/movie/upcoming?language=en-US&page=1&api_key=${APIKey}`;
const topRatedAPI = `${dirct}/movie/top_rated?language=en-US&page=1&api_key=${APIKey}`;
const movieSearchAPI = `${dirct}/search/movie?api_key=${APIKey}`;

const movieDetailAPI = id => `${dirct}/movie/${id}?api_key=${APIKey}`;
const movieCreditAPI = id => `${dirct}/movie/${id}/credits?api_key=${APIKey}`;
const movieSimilarAPI = id => `${dirct}/movie/${id}/similar?api_key=${APIKey}`;

const actorDetailAPI = id => `${dirct}/person/${id}?api_key=${APIKey}`;
const actorCreditAPI = id => `${dirct}/person/${id}/movie_credits?api_key=${APIKey}`;


export const image500 = path => path? `https://image.tmdb.org/t/p/w500${path}`: null;
export const image342 = path => path? `https://image.tmdb.org/t/p/w342${path}`: null;
export const image185 = path => path? `https://image.tmdb.org/t/p/w185${path}`: null;

export const fallbackMoviePoster = '../assets/images/Searching.png';
export const fallbackPersonImage = '../assets/images/Searching.png';

// Dynamic



const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const GetTrendingMovies = () => {
    return apiCall(trendingMoviesAPI);
}

export const GetUpComingMovies = () => {
    return apiCall(upComingAPI);
}

export const GetTopRatedMovies = () => {
    return apiCall(topRatedAPI);
}

export const GetMoviesDetails = id => {
    return apiCall(movieDetailAPI(id));
}

export const GetMoviesCedits = id => {
    return apiCall(movieCreditAPI(id));
}

export const GetMoviesSimilars = id => {
    return apiCall(movieSimilarAPI(id));
}

export const GetActorDetailAPI = id => {
    return apiCall(actorDetailAPI(id));
}

export const GetActorCreditAPI = id => {
    return apiCall(actorCreditAPI(id));
}

export const GetSearchMoviesAPI = params => {
    return apiCall(movieSearchAPI, params);
}