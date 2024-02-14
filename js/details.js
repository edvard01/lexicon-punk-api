const beerId = localStorage.getItem("beerId");

async function getBeer(id) {
  try {
    const response = await fetch("https://api.punkapi.com/v2/beers/" + id);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

getBeer(beerId);
