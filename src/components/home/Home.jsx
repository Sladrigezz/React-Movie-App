import React, { useEffect, useState } from "react";
import {
  fetchGenre,
  fetchMovieByGenre,
  fetchMovies,
  fetchPersons,
} from "../../service";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export function Home() {
  const [nowPlaying, setNewPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNewPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre());
      setPersons(await fetchPersons());
    };
    fetchAPI();
  }, []);

  const movies = nowPlaying.slice(0, 10).map((item, index) => {
    return (
      <div style={{ height: 500, width: "100%" }} key={index}>
        <div className="carousel-center">
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          <i
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#f4c10f" }}
          ></i>
        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          {item.title}
        </div>
      </div>
    );
  });

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button type="button" className="btn btn-outline-info">
          {item.name}
        </button>
      </li>
    );
  });

  const movieList = movieByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img src={item.poster} alt={item.title} className="img-fluid"></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rating: {item.rating} </p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  const trendingPersons = persons.slice(0, 4).map((p, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          src={p.profileImg}
          alt={p.name}
          className="img-fluid rounded-circle mx-auto d-block"
        />
        <p className="font-weight-bold text-center">{p.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          Trending for {p.known}
        </p>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <RBCarousel
            autoplay={true}
            pauseOnVisibility={true}
            slidesshowSpeed={5000}
            version={4}
            indicators={false}
          >
            {movies}
          </RBCarousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>
      <div className="row mt-3">{movieList}</div>
      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TRENDING PERSONS ON THIS WEEK
          </p>
        </div>
      </div>
      <div className="row nt-3">{trendingPersons}</div>
    </div>
  );
}
