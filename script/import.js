document.addEventListener("DOMContentLoaded", function () {
  var footerElement = document.querySelector("header");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../pages/components/header.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      footerElement.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
});

document.addEventListener("DOMContentLoaded", function () {
  var footerElement = document.querySelector("footer");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../pages/components/footer.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      footerElement.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
});