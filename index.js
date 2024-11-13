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
            <div class="card h-100" style="min-height: 400px;">
             <img src="${book.img}" class="card-img-top img-fluid object-fit-scale mt-2" style="height: 400px; alt="Book cover" />
                <div class="card-body">
                 <h5 class="card-title fs-6 text-start">${book.title}</h5>
                 <p class="card-text fs-3 fw-bolder">${book.price} €</p>
                 <a href="#" class="btn btn-primary btnDiscard">Discard</a>
                </div>
          </div>`;
        col.appendChild(cardDiv);
        const discardBtn = cardDiv.querySelector(".btnDiscard");

        discardBtn.addEventListener("click", () => {
          cardDiv.remove();
        });
      });
    })
    .catch((error) => console.log("Errore nel recupero dei dati:", error));
};

window.onload = () => {
  fetchLibrary();
};
