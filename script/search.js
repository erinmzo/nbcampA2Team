import { movie } from "./index.js";

async function searchFn() {
  const data = await movie();
  const dataList = data.results;

  const searchForm = document.getElementById("search");
  searchForm.addEventListener("submit", (event) => {
    //     // 검색했을때 새로고침 x
    event.preventDefault();
    const searchBar = document.getElementById("searchBar");
    const inputValue = searchBar.value;
    const filteredData = dataList.filter((movie) => {
      console.log(movie.title);
      return movie.title.includes(inputValue);
    });

    //다시 그리기
    if (filteredData.length > 0) {
      const cardList = filteredData
        .map(({ title, poster_path, id }) => {
          return `
        <div class="movie-card">
          <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster" onclick="alert('${id}')"/>
          <h2 class="movie-title">${title}</h2>
        </div>`;

        })
        .join("");
      document.getElementById("movie-card-list").innerHTML = cardList;
    } else {
      return alert("검색한 영화가 없습니다.");
    }
  });
}
searchFn();
