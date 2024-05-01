const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk5ZmRhOWE3MjY4ZTAwMTE3MTVhMjcxYjMzMTAwNSIsInN1YiI6IjY2MTdhMzllN2Q0MWFhMDE3ZDAwNzkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.svBiDsUi6VuVUKtPq8DVrEd7G6rkepmITGwi_94lCk8",
  },
};

async function creditApi() {
  const { cast } = await fetch(
    "https://api.themoviedb.org/3/movie/693134/credits?language=en-US",
    options
  ).then((response) => response.json());

  return cast;
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
