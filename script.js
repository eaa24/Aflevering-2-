// Henter data og gemmer det globalt
let allAlbums = [];

// Henter data fra data.json-filen
fetchData("data.json").then((data) => {
  allAlbums = data; // Gemmer albumdata
  displayAlbums(data); // Viser alle albummer ved 1. indlæsning
}).catch((error) => {
  console.error("Fejl ved hentning af data:", error);
});

// Funktion til at vise albums
function displayAlbums(albums) {
  let albumList = document.getElementById("album-list");
  albumList.innerHTML = ""; // Tømmer listen før opdatering

  // Genererer HTML-indhold for hvert album
  albums.forEach((album) => {
    albumList.innerHTML += `
      <div class="album-box">
        <h3>${album.albumName}</h3>
        <p><strong>Kunstner:</strong> ${album.artistName}</p>
        <p><strong>År:</strong> ${album.productionYear}</p>
        <p><strong>Antal sange:</strong> ${album.trackList.length}</p>
        <p><strong>Genre:</strong> ${album.genre || "Ikke angivet"}</p>
        <p><strong>Hjemmeside:</strong> <a href="${album.artistWebsite}" target="_blank">${album.artistWebsite}</a></p>
      </div>
    `;
  });
}

// Denne funktion er en Event listener, der er til dropdown-menuen for at filtrere albums
document.getElementById("genre-filter").addEventListener("change", (event) => {
  let selectedGenre = event.target.value.trim();
  let filteredAlbums = selectedGenre
    ? allAlbums.filter(album => album.genre && album.genre.toLowerCase() === selectedGenre.toLowerCase())
    : allAlbums;

  displayAlbums(filteredAlbums); // Viser de filtrerede albums
});

// Asynkron funktion til at hente JSON-data
async function fetchData(url) {
  let response = await fetch(url);
  return await response.json();
}








