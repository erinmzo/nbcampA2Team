document.getElementById("up-btn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTNmNTQ0YzM0NzgxODcxMzgxMmNhOTg4MTk2ZDY4ZCIsInN1YiI6IjY2MzBhMGEwNTU0NWNhMDEyZDQzOWJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCSH53do58eERB95XaVTj4PWERd4-VPCIJGu_iMongM",
  },
};

export async function movie() {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return alert(error);
  }
}

async function movieData() {
  const data = await movie();
  movieRender(data);
  movieMainRender(data[0]);
}

function movieMainRender(movie) {
  const mainTitle = document.getElementById("title");
  const contents = `
    <div class="container">
      <div class="rating">Rating ${movie.vote_average.toFixed(2)} / 10</div>
      <h1>${movie.title}</h1>
      <p>${movie.overview}</p>
    </div>
  `;
  mainTitle.style.backgroundImage = `linear-gradient(transparent 0%, #0E4ECC 60%, black 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
  mainTitle.innerHTML = contents;
}

export async function movieRender(movie) {
  const cardList = movie
    .map(({ title, poster_path, id }) => {
      return `<div class="movie-card">
      <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster" onclick="alert('${id}')"/>
      <h2 class="movie-title">${title}</h2>
    </div>`;
    })
    .join("");

  document.getElementById("movie-card-list").innerHTML = cardList;
}
movieData();
