const bookArray = [];

const fetchLibrary = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((responseObj) => {
      if (responseObj) {
        return responseObj.json();
      }
    })
    .then((bookObj) => {
      console.log(bookObj);

      bookObj.forEach((book) => {
        const col = document.getElementById("rowDiv");
        const cardDiv = document.createElement("div");
        cardDiv.className = "col";
        cardDiv.innerHTML = `
            <div class="card">
             <img src="${book.img}" class="card-img-top" alt="..." />
                <div class="card-body">
                 <h5 class="card-title">${book.title}</h5>
                 <p class="card-text">${book.price} €</p>
                 <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
          </div>`;
        col.appendChild(cardDiv);
      });
    });
};

window.onload = () => {
  fetchLibrary();
};
