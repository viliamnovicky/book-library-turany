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

    console.log(res.data);

    if (res.data.status === 'success') {
      const books = res.data.data.data;
      document.querySelector('.books').textContent = '';

      books.map((book) => {
        document.querySelector('.books').insertAdjacentHTML(
          'beforeend',
          `
        <a class="book" id = "${book.id}" href="/${book.slug}">
            <img src="${
              book.coverImage.startsWith('http')
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
