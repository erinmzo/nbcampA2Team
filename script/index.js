const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTNmNTQ0YzM0NzgxODcxMzgxMmNhOTg4MTk2ZDY4ZCIsInN1YiI6IjY2MzBhMGEwNTU0NWNhMDEyZDQzOWJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCSH53do58eERB95XaVTj4PWERd4-VPCIJGu_iMongM"
  },
};
async function movie() {
  const url = `https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=1`;

  const response = await fetch(url, options);
  const data = await response.json();

  const cardList = data['results'].map(({ original_name, poster_path, id }) => {
    return `<div class="movie-card"> 
      <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster" onclick="alert('${id}')"/>
      <h2 class="movie-title">${original_name}</h2>
    </div>`;
  }).join(''); // 배열을 하나의 문자열로 연결

  document.querySelector('.movie-card-list').innerHTML = cardList;
}
movie().catch((err) => console.log(err));
