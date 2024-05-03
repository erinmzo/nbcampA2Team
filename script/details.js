document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id"); //URL 쿼리 스트링 받아오기
  fetchMovieDetails(movieId);
  creditApi(movieId);
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk5ZmRhOWE3MjY4ZTAwMTE3MTVhMjcxYjMzMTAwNSIsInN1YiI6IjY2MTdhMzllN2Q0MWFhMDE3ZDAwNzkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.svBiDsUi6VuVUKtPq8DVrEd7G6rkepmITGwi_94lCk8",
  },
};

async function fetchMovieDetails(movieId) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
    const response = await fetch(url, options);
    const movie = await response.json();
    displayMovieDetails(movie);
  } catch (error) {
    return alert("영화 정보를 불러오는 데 실패했습니다.", error);
  }
}

async function creditApi(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      options
    );
    const data = await response.json();
    creditRender(data);
  } catch (error) {
    console.log("영화 정보를 불러오는 데 실패했습니다.", error);
    return [];
  }
}

function displayMovieDetails(movie) {
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("overview").textContent = movie.overview;
  document.getElementById("genre").textContent = movie.genres
    .map((genre) => genre.name)
    .join(", "); // 장르 배열을 문자열로 변환
  document.getElementById("release-date").textContent = movie.release_date;
  document.getElementById("runtime").textContent = movie.runtime + " 분";
  document.getElementById("rating").textContent = movie.vote_average.toFixed(1);

  const detailsSection = document.getElementById("main");
  detailsSection.style.backgroundImage = `linear-gradient(transparent, black 90%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
}

function creditRender(data) {
  const castList = data.cast;
  const slicedCast = castList.slice(0, 4);
  const actorBox = document.querySelector(".actor-box");
  const actorFr = document.createDocumentFragment();
  slicedCast.forEach((cast) => {
    const actorImg = cast.profile_path;
    const castingName = cast.character;
    const actorName = cast.name;
    const actorBox = document.createElement("li");
    actorBox.innerHTML = `
    <div class="actor-img">
      <img
      src="https://image.tmdb.org/t/p/original//${actorImg}"
      alt="${actorName}"
      />
    </div>
    <div class="actor-info">
      <span class="casting">${castingName}</span>
      <span class="actor-name">${actorName}</span>
    </div>`;
    actorFr.appendChild(actorBox);
  });
  actorBox.appendChild(actorFr);
}
