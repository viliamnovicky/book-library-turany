export const loadUserStats = (data) => {
  const modal = document.querySelector('.modal');
  const modalInner = document.querySelector('.modal__inner');

  data.map((book) => {
    modalInner.insertAdjacentHTML(
      'beforeend',
      `<div class="flip-card">
        <div class="flip-card__inner">
          <div class="flip-card__front">
            <img class="flip-card__img" src="${
            book.book.coverImage.startsWith('http')
              ? book.book.coverImage
              : '/img/books/' + book.book.coverImage
            }" alt="book ${book.book.name} ${book.book.author}">
          </div>
          <div class="flip-card__back">
            <h4><span>Dielo:</span> ${book.book.name}</h4>
            <h4><span>Autor:</span> ${book.book.author}</h4>
            <h4><span>Pridané:</span> ${new Date(book.wasAdded).getDay() + 1}.${
            new Date(book.wasAdded).getMonth() + 1
            }.${new Date(book.wasAdded).getFullYear()}</h4>
            <h4><span>Dátum vydania:</span> ${new Date(book.book.releaseDate).getDay() + 1}.${
              new Date(book.book.releaseDate).getMonth() + 1
              }.${new Date(book.book.releaseDate).getFullYear()}</h4>
            <h4><span>ISBN:</span> ${book.book.ISBN}</h4>
          </div>
        </div>
      </div>`
    );
  });
};
