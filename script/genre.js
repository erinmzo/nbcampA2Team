
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTNmNTQ0YzM0NzgxODcxMzgxMmNhOTg4MTk2ZDY4ZCIsInN1YiI6IjY2MzBhMGEwNTU0NWNhMDEyZDQzOWJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCSH53do58eERB95XaVTj4PWERd4-VPCIJGu_iMongM'
  }
};

export async function genre() {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return alert(error);
  }
};





genre.addEventListener('click', function (e) {
  e.preventDefault();
  const genreID = this.getAttribute('data-genre');)}// 클릭한 장르의 데이터를 가져옵니다.



async function movieRender() {
  const data = await genre();
  let filterId = response['results'];
  const action = filterId.filter(a => a['genre_ids'] === 28);
  const horror = filterId.filter(a => a['genre_ids'] === 28);

  const cardList = data['results'].map(({ original_title, poster_path }) => {
    return (`<div class="movie-card">
    <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster"/>
    <h2 class="movie-title">${original_title}</h2>
  </div>`);
  })
};

async function filterId(response, genre_ids)

// let action = response['results'].filter(a => a['genre_ids'] === 28);
// let horror = response['results'].filter(a => a['genre_ids'] === 27);


async function movieRender() {
  const data = await movie();
  const cardList = data['results']
    .map(({ original_title, poster_path, id }) => {
      return `
    <div class="movie-card">
      <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster" onclick="alert('${id}')"/>
      <h2 class="movie-title">${original_title}</h2>
    </div>`;
    })
    .join('');

  document.getElementById('movie-card-list').innerHTML = cardList;
}

