import { movie } from './index.js';

async function searchFn() {
  const data = await movie();
  const dataList = data.results;
  const searchForm = document.getElementById('search');
  searchForm.addEventListener('submit', (event) => {
//     // 검색했을때 새로고침 x
    event.preventDefault();
    const searchBar = document.getElementById('searchBar');
    const inputValue = searchBar.value;
    const filteredData = dataList.filter((movie) => {
      console.log(movie.title);
      return movie.title.includes(inputValue);
    })

    //다시 그리기
    const cardList = filteredData.map(({ original_title, poster_path, id }) => {
        return `
        <div class="movie-card">
          <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster" onclick="alert('${id}')"/>
          <h2 class="movie-title">${original_title}</h2>
        </div>`;
      })
      .join('');
    
    document.getElementById('movie-card-list').innerHTML = cardList;

    });
//   // 검색 구현
//   const movieCards = document.querySelectorAll('.movie-card')
//   // const title = document.querySelector('.movie-title').textContent
//   movieCards.forEach(card => {
//     if (title.toLowerCase().includes(inputValue)) {
//       card.style.display = 'block';
//     } else {
//       card.style.display = 'none';
//     }
}

searchFn();
