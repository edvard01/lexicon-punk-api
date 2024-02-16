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
  const img = document.getElementById("beer-img");
  const name = document.getElementById("beer-name");
  const desc = document.getElementById("beer-desc");
  const abv = document.getElementById("abv");
  const volume = document.getElementById("volume");
  const ingredients = document.getElementById("ingredients");
  const hops = document.getElementById("hops");
  const food = document.getElementById("food-list");
  const brewerTips = document.getElementById("brewer-tips");
  const yeast = document.getElementById("yeast");

  if (beer.image_url === null) {
    img.src = `css\\assets\\360_F_222377066_6V7HVmRPYahGwDNf0ph2BkMk13JnonJl.jpg`;
  } else {
    img.src = beer.image_url;
  }

  name.innerHTML = beer.name;
  desc.innerHTML = beer.description;
  abv.innerHTML += beer.abv;
  volume.innerHTML += `${beer.volume.value} ${beer.volume.unit}`;

  console.log(ingredients);
  console.log(beer.ingredients.hops[0].name);
  for (let j = 0; j < beer.ingredients.malt.length; j++) {
    ingredients.innerHTML += `<li>${beer.ingredients.malt[j].amount.value} ${beer.ingredients.malt[j].amount.unit} ${beer.ingredients.malt[j].name}</li>`;
  }

  for (let k = 0; k < beer.ingredients.hops.length; k++) {
    hops.innerHTML += `<li>${beer.ingredients.hops[k].amount.value} ${beer.ingredients.hops[k].amount.unit} ${beer.ingredients.hops[k].name}</li>`;
  }

  yeast.innerHTML += `<li>${beer.ingredients.yeast}</li>`;

  for (let i = 0; i < beer.food_pairing.length; i++) {
    if (i === beer.food_pairing.lengt - 1) {
      food.innerHTML += `<li>${beer.food_pairing[i]}</li>`;
    } else {
      food.innerHTML += `${beer.food_pairing[i]} <br>`;
    }
  }

  brewerTips.innerHTML = beer.brewers_tips;
}

getBeer(beerId);
