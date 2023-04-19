import axios from 'axios';
import { hideAllSearchFields, showAllSearchFields } from './helpers';

export const searchBook = async (authorName, titleName) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://www.googleapis.com/books/v1/volumes?q=${titleName
        .split(' ')
        .join('+')}+inauthor:${authorName.split(' ').join('+')}`,
    });

    const bookPreview = document.querySelector('.img__book-preview');
    const data = res.data.items;
    bookPreview.classList.remove('inactive');

    if (data) {
      const modal = document.querySelector('.modal');
      const modalInner = document.querySelector('.modal__inner');

      const author = document.getElementById('author');
      const name = document.getElementById('name');
      const year = document.getElementById('year');
      const isbn = document.getElementById('isbn');

      const searchBookCoverBtn = document.querySelector('.btn__search-img');
      const btnCloseModal = document.querySelector(".btn__close-modal")
      
      modalInner.innerHTML = '';
      modalInner.classList.add('modal__cover-images');

      const authors = [];
      data.map(function (book) {
        if (book.volumeInfo.authors) authors.push(book.volumeInfo.authors[0]);
      });

      const names = [];
      data.map(function (book) {
        if (book.volumeInfo.title) names.push(book.volumeInfo.title);
      });

      const years = [];
      data.map(function (book) {
        if (book.volumeInfo.publishedDate)
          years.push(book.volumeInfo.publishedDate.slice(0, 4));
      });

      if (years.length > 0)
        years.map(function (y) {
          year.insertAdjacentHTML(
            'beforeend',
            `<option class="option" value="${y}">${y}</option>`
          );
        });

      const isbns = [];
      data.map(function (book) {
        if (book.volumeInfo.industryIdentifiers)
          book.volumeInfo.industryIdentifiers.map(function (isbn) {
            if (isbn.identifier.length > 10) isbns.push(isbn.identifier);
          });
      });

      if (isbns.length > 0)
        isbns.map(function (isbnNum) {
          isbn.insertAdjacentHTML(
            'beforeend',
            `<option class="option" value="${isbnNum}">${isbnNum}</option>`
          );
        });
      console.log(isbns);

      let images = [];
      data.map(function (book) {
        if (book.volumeInfo.imageLinks)
          images.push(book.volumeInfo.imageLinks.thumbnail);
      });

      if (images.length > 1)
        images.map((image) =>
          modalInner.insertAdjacentHTML(
            'beforeend',
            `<img class="img__books-results option" src="${image}" alt="book">`
          )
        );

      searchBookCoverBtn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.remove('hidden');
        modalInner.classList.add("modal__inner--books")
        btnCloseModal.classList.add("btn__close-modal--books")
      });

      modalInner.addEventListener('click', function (e) {
        const img = e.target.closest('.img__books-results');
        bookPreview.src = img.src;
        modal.classList.add('hidden');
      });

      author.value = authors[0];
      name.value = names[0];
      year.value = years.length > 0 ? years[0] : 'Rok vydania sa nenašiel';
      isbn.value = isbns.length > 0 ? isbns[0] : 'ISBN sa nenašlo';

      if (images.length > 0) {
        bookPreview.src = images[0];
      } else {
        bookPreview.src = '/img/book-no-cover.jpg';
        document.querySelector('.btn__search-img').classList.add('inactive');
      }

      showAllSearchFields();
      document.querySelector('.form__label--info').textContent =
        'Našla sa zhoda, skontrolujte a poprípade upravte údaje.';

      console.log(data);
    } else {
      document.querySelector('.form__label--info').textContent =
        'Nepodarilo sa nájsť žiadne výsledky, skúste to znova';
      document.querySelector('.no-success').classList.remove('hidden');
      hideAllSearchFields()
    }
  } catch (err) {
    console.log(err);
  }
};
