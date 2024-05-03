document.addEventListener('DOMContentLoaded', function () {
  movie();
  movieRender();
});

window.onscroll = function () {
  document
    .getElementsByClassName('btn_gotop')
    .addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTNmNTQ0YzM0NzgxODcxMzgxMmNhOTg4MTk2ZDY4ZCIsInN1YiI6IjY2MzBhMGEwNTU0NWNhMDEyZDQzOWJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCSH53do58eERB95XaVTj4PWERd4-VPCIJGu_iMongM',
  },
};

export async function movie() {
  const url =
    'https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1';

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return alert(error);
  }
}

async function movieRender() {
  const data = await movie();
  const cardList = data['results']

    .map(({ title, poster_path, id }) => {
      return `<div class="movie-card">
      <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster" onclick="alert('${id}')"/>
      <h2 class="movie-title">${title}</h2>
    </div>`;
    })
    .join('');

  document.getElementById('movie-card-list').innerHTML = cardList;
}

