const beerId = localStorage.getItem("beerId");

async function getBeer(id) {
  try {
    const response = await fetch("https://api.punkapi.com/v2/beers/" + id);
    const data = await response.json();

    console.log(data);
    displayDetails(data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function displayDetails(data) {
  const beer = await data[0];
  const name = document.getElementById("beer-name");
  const desc = document.getElementById("beer-desc");
  const abv = document.getElementById("abv");
  const volume = document.getElementById("volume");
  const ingredients = document.getElementById("ingredients");
  const hops = document.getElementById("hops");
  const food = document.getElementById("food");
  const brewerTips = document.getElementById("brewer-tips");

  name.innerHTML = beer.name;
  desc.innerHTML = beer.description;
  abv.innerHTML = beer.abv;
  volume.innerHTML = `${beer.volume.value} ${beer.volume.unit}`;

  ingredients.innerHTML = beer.ingredients.malt.join(", ");
  hops.innerHTML = beer.ingredients.hops.join(", ");

  for (let i = 0; i < beer.food_pairing.length; i++) {
    if (i === beer.food_pairing.lengt - 1) {
      food.innerHTML += beer.food_pairing[i];
    } else {
      food.innerHTML += `${beer.food_pairing[i]} <br>`;
    }
  }

  brewerTips.innerHTML = beer.brewers_tips;
}

getBeer(beerId);
