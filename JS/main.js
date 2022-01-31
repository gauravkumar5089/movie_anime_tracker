const API_key = "api_key=5d04012bc4d5ad4443c7e8a9c0b416ac";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const popular = BASE_URL + "/discover/movie?sort_by=popularity.des&" + API_key;
const topRated =
  BASE_URL +
  "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&" +
  API_key;

const trendingSection = document.getElementById("trending-movies");
const topRatedSection = document.getElementById("top-rated");

getmovies(popular, trendingSection);
getmovies(topRated, topRatedSection);

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
    const { title, poster_path, vote_average, overview } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
    <div class="movie-poster">      
        <img src="${IMG_URL + poster_path}" alt="${title}">
    </div>
    <div class="movie-info">
            <div class="movie-year">2020</div>
            <div class="movie-name">${title}</div>
            <div class="movie-genre">Action</div>
            <div class="movie-rating"><span class="${getcolor(
              vote_average
            )}">${vote_average}</span><i class="fas fa-star star"></i></div>
    </div>`;
    movie_type.appendChild(movieCard);
  });
}
