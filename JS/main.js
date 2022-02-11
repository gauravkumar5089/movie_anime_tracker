const API_key = "api_key=5d04012bc4d5ad4443c7e8a9c0b416ac";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const popular = BASE_URL + "/discover/movie?sort_by=popularity.des&" + API_key;
const upcoming = BASE_URL + "/discover/movie?sort_by=popularity.des&" + API_key;
const anime = "https://api.jikan.moe/v4/anime?q=&sfw";
const tv_shows = BASE_URL + "/discover/tv?sort_by=popularity.des&" + API_key;
const webseries =
  BASE_URL + "/discover/movie?sort_by=popularity.des&" + API_key;
const topRated =
  BASE_URL +
  "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&" +
  API_key;

const trendingSwiper = document.getElementById("trending-movies");
const topRatedSection = document.getElementById("top-rated");
const animeSection = document.getElementById("anime");
const upcomingSection = document.getElementById("upcoming");
const webseriesSection = document.getElementById("webseries");
const tv_showsSection = document.getElementById("tv-shows");

getmovies(topRated, topRatedSection);
getmovies(upcoming, upcomingSection);
getmovies(tv_shows, tv_showsSection);
getmovies(anime, animeSection);
getmovies(webseries, webseriesSection);
getMoviesInSlider(popular);

function getMoviesInSlider(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showMoviesInSlider(data.results);
    });
}

function showMoviesInSlider(data) {
  trendingSwiper.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date, genre_ids } = movie;
    const swiperSlide = document.createElement("div");
    const release_year = release_date.substr(0, 4);
    const g_id = genre_ids[0];
    swiperSlide.classList.add("swiper-slide");
    swiperSlide.innerHTML = `
    <div class="movie-card">
      <div class="movie-poster">
      <img src="${IMG_URL + poster_path}" alt="${title}">
      </div>
      <div class="movie-info">
      <div class="movie-year">${release_year}</div>
      <div class="movie-name">${title}</div>
      <div class="movie-genre">${getgenre(g_id)}</div>
      <div class="movie-rating">
      <span class="green">${vote_average}</span>
      <i class="fas fa-star star"></i>
    </div>
    `;
    trendingSwiper.appendChild(swiperSlide);
  });
}

function getmovies(url, movie_type) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showmovies(data.results, movie_type);
    });
}

function getcolor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showmovies(data, movie_type) {
  movie_type.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date, genre_ids } = movie;
    const movieCard = document.createElement("div");
    const release_year = release_date.substr(0, 4);
    const g_id = genre_ids[0];
    movieCard.classList.add("movie-card");
    movieCard.classList.add("scale");
    movieCard.innerHTML = `
    <div class="movie-poster">      
        <img src="${IMG_URL + poster_path}" alt="${title}">
    </div>
    <div class="movie-info">
            <div class="movie-year">${release_year}</div>
            <div class="movie-name">${title}</div>
            <div class="movie-genre">${getgenre(g_id)}</div>
            <div class="movie-rating"><span class="${getcolor(
              vote_average
            )}">${vote_average}</span><i class="fas fa-star star"></i></div>
    </div>`;
    movie_type.appendChild(movieCard);
  });
}

function getgenre(id) {
  if (id == 28) {
    return "Action";
  } else if (id == 12) {
    return "Adventure";
  } else if (id == 16) {
    return "Animation";
  } else if (id == 35) {
    return "Comedy";
  } else if (id == 80) {
    return "Crime";
  } else if (id == 99) {
    return "Documentary";
  } else if (id == 18) {
    return "Drama";
  } else if (id == 10751) {
    return "Family";
  } else if (id == 14) {
    return "Fantasy";
  } else if (id == 36) {
    return "History";
  } else if (id == 27) {
    return "Horror";
  } else if (id == 10402) {
    return "Music";
  } else if (id == 9648) {
    return "Mystery";
  } else if (id == 10749) {
    return "Romance";
  } else if (id == 878) {
    return "Science Fiction";
  } else if (id == 10770) {
    return "TV movie";
  } else if (id == 53) {
    return "Thriller";
  } else if (id == 10752) {
    return "War";
  } else if (id == 37) {
    return "Western";
  } else {
    return "Not a movie";
  }
