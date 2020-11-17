import axios from "axios";

const apiKey = "fe476699fbac239102ffd3a2f065c098";
const url = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;

export const fetchMovies = async () => {
  try {
    const { data } = await axios.get(nowPlayingUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";

    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularity"],
      title: m["title"],
      posters: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchGenre = () => {};

export const fetchMovieByGenre = () => {};

export const fetchPerson = () => {};

export const fetchTopratedMovie = () => {};

export const fetchMovieDetail = () => {};

export const fetchMovieVideos = () => {};

export const fetchCasts = () => {};

export const fetchSimilarMovie = () => {};
