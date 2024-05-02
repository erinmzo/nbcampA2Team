const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk5ZmRhOWE3MjY4ZTAwMTE3MTVhMjcxYjMzMTAwNSIsInN1YiI6IjY2MTdhMzllN2Q0MWFhMDE3ZDAwNzkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.svBiDsUi6VuVUKtPq8DVrEd7G6rkepmITGwi_94lCk8",
  },
};

async function fetchMovieDetails(movieID) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;
    const response = await fetch(url, options);
    const movie = await response.json();
    displayMovieDetails(movie);
  } catch (error) {
    return alert("영화 정보를 불러오는 데 실패했습니다.", error);
  }
}

function displayMovieDetails(movie) {
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("overview").textContent = movie.overview;
  document.getElementById("genre").textContent = movie.genres.map((genre) => genre.name).join(", "); // 장르 배열을 문자열로 변환
  document.getElementById("release-date").textContent = movie.release_date;
  document.getElementById("runtime").textContent = movie.runtime + " min";
  document.getElementById("rating").textContent = movie.vote_average.toFixed(1);

  const detailsSection = document.querySelector("main");
  detailsSection.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
}

document.addEventListener("DOMContentLoaded", function () {
  const testMovieId = "693134"; // 임시로 작동하는지 확인. 파이트 클럽 영화의 ID
  fetchMovieDetails(testMovieId);
  // const movieId = new URLSearchParams(window.location.search).get("id"); // URL 쿼리 스트링 받아오기
  // fetchMovieDetails(movieId);
});

async function creditApi() {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/693134/credits?language=ko-KR", options);
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.log("영화 정보를 불러오는 데 실패했습니다.", error);
    return [];
  }
}

async function creditRender() {
  const castList = await creditApi();
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

creditRender();
