const fetchLibrary = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((responseObj) => {
      if (responseObj) {
        return responseObj.json();
      }
    })
    .then((bookObj) => {
      //ciclo gli oggetti ottenuti
      bookObj.forEach((book) => {
        //prendo i nodi che mi servono o li creo
        const row = document.getElementById("rowDiv");
        const cardDiv = document.createElement("div");
        //assegno classe col al div della card e gli aggiungo il contenuto html
        cardDiv.className = "col";
        cardDiv.innerHTML = `
            <div class="card h-100">
             <img src="${book.img}" class="card-img-top img-fluid object-fit-scale mt-2" style="height: 400px; alt="Book cover" />
                <div class="card-body">
                 <h5 class="card-title fs-6 text-start">${book.title}</h5>
                 <p class="card-text fs-3 fw-bolder">${book.price} €</p>
                 <a href="#" class="btn btn-primary btnDiscard">Discard</a>
                 <a href="#" class="btn btn-secondary btnCart">Buy now <i class="bi bi-cart3"></i></a>
                </div>
          </div>`;
        //inserisco la card nella row
        row.appendChild(cardDiv);
        //aggiunta discard button e listener
        const discardBtn = cardDiv.querySelector(".btnDiscard");

        discardBtn.addEventListener("click", () => {
          cardDiv.remove();
        });
        const addToCartBtn = cardDiv.querySelector(".btnCart");
        const cartRow = document.getElementById("cartRowDiv");
        //aggiunta add to cart button e listener
        addToCartBtn.addEventListener("click", () => {
          //aggiungo la card nella row del carrello
          cartRow.appendChild(cardDiv);
          discardBtn.remove(); //rimuovo il discard button
          //cambio il testo del bottone aggiungi a carrello
          addToCartBtn.innerHTML = 'Remove from Cart<i class="bi bi-cart3"></i>';
          addToCartBtn.addEventListener("click", () => {
            cardDiv.remove(); //il bottone rimuove la card selezionata
          });
        });
      });
    })
    .catch((error) => alert("Errore nel recupero dei dati. Riprova più tardi.")); //gestione errore nel fetch
};

window.onload = () => {
  fetchLibrary(); //richiedo i dati al caricamento pagina
};
