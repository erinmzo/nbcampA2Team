export function inputsearchFn() {
  const searchForm = document.getElementById("search");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchBar = document.getElementById("searchBar");
    const inputValue = searchBar.value;
    if (!inputValue) {
      return alert("검색어를 입력하세요");
    }
    location.href = "/index.html" + "?search=" + inputValue;
  });
}
