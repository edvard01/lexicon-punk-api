async function getRandomBeer() {
  try {
    const response = await fetch("https://api.punkapi.com/v2/beers/random ");
    const data = await response.json();

    console.log(data);
    displayBeer(data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function displayBeer(data) {
  const img = document.getElementById("beer-img");
  const name = document.getElementById("beer-name");
  const beer = await data[0];
  name.innerHTML = beer.name;
  img.src = beer.image_url;
}

getRandomBeer();
