// 탑버튼
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

async function genre() {
  const url = "https://api.themoviedb.org/3/genre/movie/list";
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return alert(error);
  }
}

async function movieData() {
  const movieList = await movie();
  movieRender(movieList);
  movieMainRender(movieList[0]);
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
  mainTitle.style.backgroundImage = `linear-gradient(transparent 0%, black 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
  mainTitle.innerHTML = contents;
  mainTitle.addEventListener("click", () => {
    moveCommentPage(movie.id);
  });
}
function moveCommentPage(id) {
  location.href = "./pages/details.html?id=" + id;
}

export async function movieRender(movieList) {
  const cardList = movieList
    .map(({ title, poster_path, id }) => {
      return `<div class="movie-card" data-id="${id}">
      <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster" />
      <h2 class="movie-title">${title}</h2>
    </div>`;
    })
    .join("");

  document.getElementById("movie-card-list").innerHTML = cardList;
}

//클릭하면 서브페이지로 이동
const movieCard = document.querySelectorAll(".movie-card");
movieCard.forEach((el) => {
  el.addEventListener("click", () => {
    moveCommentPage(el.dataset.id);
  });
});

const navList = document.querySelectorAll(".nav-bar li");
navList.forEach((list) => {
  list.addEventListener("click", (event) => {
    const categoryName = event.target.textContent;
    navList.forEach((list) => {
      list.classList.remove("active");
    });

    event.target.classList.add("active");
    categoryFn(categoryName);
  });
});

async function categoryFn(categoryName) {
  const genreData = await genre();
  const movieList = await movie();
  const genreList = genreData.genres;

  if (categoryName === "All") {
    movieRender(movieList);
  } else {
    const filteredGenreArray = genreList.filter((genre) => {
      return genre.name === categoryName;
    });
    const filterId = filteredGenreArray[0].id;
    const filterdMovie = movieList.filter((movie) =>
      movie.genre_ids.includes(filterId)
    );
    const movieCardList = document.getElementById("movie-card-list");

    if (!filterdMovie.length) {
      movieCardList.style.display = "block";
      movieCardList.innerHTML = "<div>영화가 없습니다.</div>";
    } else {
      movieCardList.style.display = "grid";
      movieRender(filterdMovie);
    }
  }
}

// 이름순 정렬
const byNamed = document.getElementById("name-btn");
byNamed.addEventListener("click", async () => {
  const byNamedList = await movie();
  byNamedList.sort((a, b) =>
    a.title < b.title ? -1 : a.title > b.title ? 1 : 0
  );
  movieRender(byNamedList);
});

// 별점순 정렬
const byRating = document.getElementById("rating-btn");
byRating.addEventListener("click", async () => {
  const byRatingList = await movie();
  byRatingList.sort((a, b) =>
    a.vote_average < b.vote_average
      ? 1
      : a.vote_average > b.vote_average
      ? -1
      : 0
  );
  movieRender(byRatingList);
});

// 정렬 버튼 클릭시
const sortBtn = document.getElementById("toggle-btn");
const optionBtn = document.querySelectorAll(".option-btn");
sortBtn.addEventListener("click", () => {
  optionBtn.forEach((el) => {
    if (el.style.display === "" || el.style.display === "none") {
      el.style.display = "flex";
    } else {
      el.style.display = "none";
    }
  });
});

movieData();
