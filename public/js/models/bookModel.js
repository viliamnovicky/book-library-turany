import axios from 'axios';

export const state = {
  book: {},
  search: {
    query: '',
    results: [],
    page: 1,
    //resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadFilteredBooks = async (filter = 'name', name, author) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/books/?sort=${filter}&fields=name,author,coverImage,slug&queries=${name},${author}`,
    });

    if (res.data.status === 'success') {
      const books = res.data.data.data;
      document.querySelector('.books').textContent = '';
      document.querySelectorAll('.form__input').forEach(input => input.value = '');

      books.map((book) => {
        document.querySelector('.books').insertAdjacentHTML(
          'beforeend',
          `
        <a class="book" id = "${book.id}" href="/${book.slug}">
            <img src="${book.coverImage.startsWith('http')
            ? book.coverImage
            : '/img/books/' + book.coverImage
          }" alt="book" class="img img__book-cover">
            <div class="book__cont">
                <h3 class="book__name">${book.name}</h3>
                <h4 class="book__author">${book.author}</h4>
            </div>
            <button class="btn btn__primary btn__book-details">detail</button>
        </a>
        `
        );
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
};

export const showBookDetailsToAdmin = async (book) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/v1/books/${book}`
    })

    if (res.data.status === 'success') {
      const book = res.data.data.data
      const bookInfo = document.getElementById("book-info")
      const bookActions = document.querySelector(".profile__stat--actions")

      bookInfo.textContent=""
      bookInfo.insertAdjacentHTML("beforeend", `
        <h4 class="admin__book-info admin__book-info--name">Názov diela: <span>${book.name}</span></h4>
        <h4 class="admin__book-info admin__book-info--author">Autor: <span>${book.author}</span></h4>
        <h4 class="admin__book-info admin__book-info--year">Rok vydania: <span>${ new Date(book.releaseDate).getFullYear()}</span></h4>
        <h4 class="admin__book-info admin__book-info--author">ISBN: <span>${book.ISBN}</span></h4>
        <img src="${book.coverImage.startsWith('http')
            ? book.coverImage
            : '/img/books/' + book.coverImage
          }" alt="book" class="img img__admin-book-info">
      `)

      bookActions.textContent=""
      document.querySelector(".modal__inner").id=`${book.id}`
      bookActions.insertAdjacentHTML("beforeend", `
      <div class="admin__action-buttons">
        <h4 class="detail__h4">Zmena údajov</h4>
        <button class="btn btn__primary" id="btn__edit-book" data-id="${book.id}">Upraviť</button>
        <h4 class="detail__h4">Odstrániť knihu</h4>
        <button class="btn btn__primary" id="btn__delete-book" data-id="${book.id}">Vymazať</button>
      </div>
      `)
    }

  } catch (err) {
    console.log(err)
  }
}
