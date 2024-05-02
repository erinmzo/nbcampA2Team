document.addEventListener('DOMContentLoaded', movie);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTNmNTQ0YzM0NzgxODcxMzgxMmNhOTg4MTk2ZDY4ZCIsInN1YiI6IjY2MzBhMGEwNTU0NWNhMDEyZDQzOWJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCSH53do58eERB95XaVTj4PWERd4-VPCIJGu_iMongM'
  }
};

async function movie() {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1';

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
movieRender();

window.onscroll = function () {
  let scroll = document.documentElement.scrollTop || document.body.scrollTop;
  let gotop = document.getElementsByClassName('.btn_gotop');
  if (scrollPosition > 700) {
    btnGoTop.style.display = 'block';
  } else {
    btnGoTop.style.display = 'none';
  }
  document.querySelector('.btn_gotop').addEventListener('click', function (event) {
    // 기본 이벤트를 방지합니다 (예: 링크 이동)
    event.preventDefault();

    // 부드럽게 상단으로 스크롤합니다.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

