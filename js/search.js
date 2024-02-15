const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
let pageNr = 1;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  pageNr = 1;
  let input = searchInput.value;
  if (input === "") {
    showToast("Input field can't be empty!");
  }

  input = input.replaceAll(" ", "_");
  beerSearch(input);
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = message;
  toast.className = "show";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 2500);
}

async function beerSearch(query) {
  try {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${query}&page=${pageNr}&per_page=9`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error: ", error);
  }
}
