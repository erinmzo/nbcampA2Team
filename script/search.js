import { movie, movieRender } from "./index.js";

async function searchFn() {
  const data = await movie();
  const dataList = data;
  const searchForm = document.getElementById("search");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchBar = document.getElementById("searchBar");
    const inputValue = searchBar.value;
    const filteredData = dataList.filter((movie) => {
      console.log(movie.title);
      return movie.title.includes(inputValue);
    });
    if (filteredData.length > 0) {
      movieRender(filteredData);
    } else {
      alert("검색한 영화가 없습니다.");
    }
  });
}
searchFn();
