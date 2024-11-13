const fetchLibrary = () => {
  // Recupera i titoli dei libri dal localStorage, se esistono
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Funzione per aggiornare il carrello visibile
  const updateCartUI = () => {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; // Pulisce la lista prima di aggiornarla
    cartItems.forEach((item) => {
      const newLi = document.createElement("li");
      newLi.textContent = item; // Aggiunge il nome del libro al carrello
      cartList.appendChild(newLi);
    });
  };

  // Chiamata fetch per ottenere i dati dei libri
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((responseObj) => {
      if (responseObj) {
        return responseObj.json();
      }
    })
    .then((bookObj) => {
      bookObj.forEach((book) => {
        const row = document.getElementById("rowDiv");
        const cardDiv = document.createElement("div");
        const bookName = book.title;

        // Assegno la classe al div della card e aggiungo il contenuto HTML
        cardDiv.className = "col";
        cardDiv.innerHTML = `
            <div class="card h-100">
              <img src="${book.img}" class="card-img-top img-fluid object-fit-scale mt-2" style="height: 400px;" alt="Book cover" />
              <div class="card-body">
                <h5 class="card-title fs-6 text-start text-truncate">${book.title}</h5>
                <p class="card-text fs-3 fw-bolder">${book.price} €</p>
                <a href="#" class="btn btn-primary btnDiscard">Discard <i class="bi bi-trash3"></i></a>
                <a href="#" class="btn btn-secondary btnCart">Buy now <i class="bi bi-cart3"></i></a>
              </div>
            </div>`;

        // Inserisco la card nella row
        row.appendChild(cardDiv);

        const discardBtn = cardDiv.querySelector(".btnDiscard");
        const buyNowBtn = cardDiv.querySelector(".btnCart");

        // Aggiunta del bottone "discard" per rimuovere la card
        discardBtn.addEventListener("click", () => {
          cardDiv.remove();
        });

        // Aggiunta del bottone "Buy now" per aggiungere al carrello
        buyNowBtn.addEventListener("click", () => {
          // Aggiungo il titolo del libro nell'array cartItems e controllo che il titolo non sia già presente
          if (!cartItems.includes(bookName)) {
            cartItems.push(bookName);
            // Salviamo l'array aggiornato nel localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            // Aggiungiamo il libro al carrello visibile
            updateCartUI();
          }
        });
      });

      // Dopo aver caricato tutti i libri, aggiorno la UI del carrello con gli elementi salvati
      updateCartUI();
    })
    .catch((error) => alert("Errore nel recupero dei dati. Riprova più tardi.")); // Gestione errore nel fetch
};

// Quando la pagina viene caricata, esegui la funzione del fetch
window.onload = () => {
  fetchLibrary(); // Richiamo i dati dei libri
};
