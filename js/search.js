const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const results = document.querySelector(".results");
const loader = document.querySelector(".loader");
const nextPage = document.getElementById("right");
const lastPage = document.getElementById("left");
const searchResults = document.querySelector(".search-result");
let globalQuery = "";

let pageNr = 1;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  pageNr = 1;
  let input = searchInput.value;
  if (input === "") {
    showToast("Input field can't be empty!");
  }

  input = input.replaceAll(" ", "_");
  globalQuery = input;
  beerSearch(input);
});

searchResults.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    localStorage.setItem("beerId", e.target.id);
    window.location.href = "/details.html";
  }
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
  showLoader();
  try {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${query}&page=${pageNr}&per_page=5`
    );
    const data = await response.json();
    displayResults(data);
    showResults();
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function displayResults(data) {
  results.innerHTML = "";
  const beers = await data;
  beers.forEach((beer) => {
    results.innerHTML += drawBeer(beer);
  });

  if (pageNr === 1) {
    lastPage.disabled = true;
  } else if (lastPage.disabled && pageNr !== 1) {
    lastPage.disabled = false;
  }

  let verified = await verifyNextPage();
  if (!verified) {
    nextPage.disabled = true;
  } else if (verified && nextPage.disabled) {
    nextPage.disabled = false;
  }
}

function drawBeer(beer) {
  let html = `<div class="card">`;
  html += `<div class="beer-image">`;

  if (beer.image_url === null) {
    html += `<img src="css\\assets\\360_F_222377066_6V7HVmRPYahGwDNf0ph2BkMk13JnonJl.jpg" alt="beer image"/>`;
  } else {
    html += `<img src="${beer.image_url}" alt="beer image"/>`;
  }
  html += `</div>`;
  html += `<div class="content">`;
  html += `<h5>${beer.name}</h5><p href="details.html" id="${beer.id}">See more &#9205;</p>`;
  html += `</div></div>`;

  return html;
}

function showLoader() {
  lastPage.disabled = true;
  nextPage.disabled = true;
  loader.style.display = "block";
  results.style.display = "none";
}

function showResults() {
  loader.style.display = "none";
  results.style.display = "flex";
}

nextPage.addEventListener("click", (e) => {
  pageNr++;
  beerSearch(globalQuery);
});

lastPage.addEventListener("click", (e) => {
  pageNr--;
  beerSearch(globalQuery);
});

async function verifyNextPage() {
  try {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${globalQuery}&page=${
        pageNr + 1
      }&per_page=5`
    );
    const data = await response.json();
    if (data.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
