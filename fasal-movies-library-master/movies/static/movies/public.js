const imdbIds = document.querySelectorAll('.col');

imdbIds.forEach(function (id) {
  console.log(id);
  let cName = id.className;
  let i = cName.split(' ')[1];

  fetch(`https://www.omdbapi.com/?i=${i}&apikey=858e8714`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.Title);

      if (data.Poster === 'N/A') {
        poster =
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.kgfkdioyvqIrLPdA5bXckAHaE8%26pid%3DApi&f=1';
      } else {
        poster = data.Poster;
      }

      id.innerHTML = `
      <div class="card">
        <img src="${poster}" class="card-img-top" alt="..." width="400" height="400">
        <div class="card-body">
          <h5 class="card-title">${data.Title}</h5>
          <p class="card-text">${data.Plot}</p>
        </div>
      </div>
      `;
    });
});
