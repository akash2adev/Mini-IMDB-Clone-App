const API_KEY = '5164fe45'; // Replace with your OMDB API key
const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('results');

// Fetch and display search results
searchBar.addEventListener('input', async () => {
  const query = searchBar.value.trim();
  if (!query) {
    resultsContainer.innerHTML = '';
    return;
  }
  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  const data = await response.json();
  if (data.Response === 'True') {
    displayResults(data.Search);
  } else {
    resultsContainer.innerHTML = `<p class="text-danger">No results found</p>`;
  }
});

// Display search results
function displayResults(movies) {
  resultsContainer.innerHTML = movies
    .map(
      (movie) => `
      <div class="col-md-4">
        <div class="card mb-3">
          <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
          <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <button class="btn btn-primary" onclick="addToFavourites('${movie.imdbID}')">Add to Favourites</button>
            <a href="movie.html?id=${movie.imdbID}" class="btn btn-secondary">More Info</a>
          </div>
        </div>
      </div>
    `
    )
    .join('');
}

// Add to favourites
function addToFavourites(imdbID) {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  if (!favourites.includes(imdbID)) {
    favourites.push(imdbID);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Added to favourites!');
  } else {
    alert('Already in favourites!');
  }
}
