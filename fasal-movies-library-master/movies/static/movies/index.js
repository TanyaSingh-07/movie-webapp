const searchBtn = document.getElementById('search-btn');
const input = document.getElementById('title');
const searchCard = document.getElementById('search-card');
const createListCard = document.querySelector('#list-view');
const plusIcon = document.getElementById('plus');
const form = document.getElementById('form-view');
const createBtn = document.getElementById('create-btn');
const cancelBtn = document.getElementById('cancel-btn-danger');

const playlistView = document.getElementById('playlist-view');
const emptyView = document.querySelector('#empty-view');
const errorView = document.querySelector('#error-view');

const playlistId = document.getElementById('playlist-id');
const watchlistBtn = document.getElementById('watchlist-btn');

plusIcon.addEventListener('click', (event) => {
  createListCard.style.display = 'none';
  form.style.display = 'block';
});

cancelBtn.addEventListener('click', (event) => {
  event.preventDefault();
  createListCard.style.display = 'block';
  form.style.display = 'none';
});

input.addEventListener('input', () => {
  searchBtn.disabled = input.value.length === 0;

  if (input.value.length === 0) {
    createListCard.style.display = 'block';
    errorView.style.display = 'none';
    document.querySelector('#checklist').style.display = 'none';
    playlistView.style.display = 'block';
  }
});

searchBtn.addEventListener('click', (event) => {
  // console.log('Clicked!');
  event.preventDefault();
  title = input.value;

  // Your API KEY here
  fetch(`https://www.omdbapi.com/?t=${title}&apikey=http://www.omdbapi.com/?i=tt3896198&apikey=3d3be421`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Error === 'Movie not found!') {
        errorView.innerHTML = '';
        errorView.style.display = 'block';
        createListCard.style.display = 'none';
        playlistView.style.display = 'none';
        searchCard.style.display = 'block';

        const errorCard = document.createElement('div');
        errorCard.innerHTML = `
        <div class="card" style="width: 18rem; margin: auto; padding: 0.5em">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTetH5irKICQOU0J-Xqr9aCU64wbYE-0xNNyg&usqp=CAU" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Movie Not Found.</h5>
          </div>
        </div>
        `;

        errorView.appendChild(errorCard);
      } else {
        errorView.style.display = 'none';
        createListCard.style.display = 'none';
        playlistView.style.display = 'none';
        searchCard.innerHTML = '';

        const movieCard = document.createElement('div');

        let poster;
        if (data.Poster === 'N/A') {
          poster =
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.kgfkdioyvqIrLPdA5bXckAHaE8%26pid%3DApi&f=1';
        } else {
          poster = data.Poster;
        }

        addButton =
          '<button class="btn btn-primary" id="add-btn">Add to MovieList</button>';

        movieCard.innerHTML = `
        <div class="card" style="width: 18rem; margin: auto; padding: 0.5em">
        <img src=${poster} class="card-img-top" alt="Image not available">
        <div class="card-body">
          <h5 class="card-title">${data.Title}</h5>
          <p class="card-text">${data.Plot}</p>
        </div>
        `;

        searchCard.appendChild(movieCard);

        document.querySelector('#checklist').style.display = 'block';
        watchlistBtn.addEventListener('click', (event) => {
          playlistId.value = data.imdbID;
          let key = playlistId.value;
          console.log(key);
        });
      }
    });
});
