const newBeerBtn = document.getElementById("new-beer");

async function getRandomBeer() {
  try {
    showLoader();
    const response = await fetch("https://api.punkapi.com/v2/beers/random ");
    const data = await response.json();

    console.log(data);
    displayBeer(data);
    hideLoader();
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function displayBeer(data) {
  const img = document.getElementById("beer-img");
  const name = document.getElementById("beer-name");
  const beer = await data[0];
  name.innerHTML = beer.name;
  if (beer.image_url === null) {
    img.src = `assets\\360_F_222377066_6V7HVmRPYahGwDNf0ph2BkMk13JnonJl.jpg`;
  } else {
    img.src = beer.image_url;
  }
}

getRandomBeer();

function showLoader() {
  const imgLoader = document.getElementById("img-loader");
  const beerImg = document.getElementById("beer-img");
  const beerName = document.getElementById("beer-name");
  const link = document.getElementById("details-link");
  console.log(beerImg);

  imgLoader.style.display = "block";
  beerImg.style.display = "none";
  beerName.style.display = "none";
  link.style.display = "none";
}

function hideLoader() {
  const imgLoader = document.getElementById("img-loader");
  const beerImg = document.getElementById("beer-img");
  const beerName = document.getElementById("beer-name");
  const link = document.getElementById("details-link");

  imgLoader.style.display = "none";
  beerImg.style.display = "block";
  beerName.style.display = "block";
  link.style.display = "block";
}

newBeerBtn.addEventListener("click", (e) => {
  getRandomBeer();
});
