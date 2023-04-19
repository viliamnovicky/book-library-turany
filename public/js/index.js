import '@babel/polyfill';
import { displayMap } from './mapbox';

import { headerLinkController } from './headerLinksController';
import { login, logout } from './authorisation';
import { searchBook } from './searchBook';
import { createBook } from './createBook';
import { getCurrentUserData } from './getCurrentUserData';
import {loadFilteredBooks} from "./models/bookModel"
import {loadUserStats} from "./models/userModel"
import { showAllSearchFields, resetSearchedData, openDialog } from './helpers';

headerLinkController()
getCurrentUserData()

const main = document.querySelector(".main")

const modal = document.querySelector('.modal');
const modalInner = document.querySelector('.modal__inner');
const btnCloseModal = document.querySelector(".btn__close-modal")

document.querySelector(".img__arma").addEventListener("click", () => {
  if(!document.querySelector(".img__people"))  
    location.assign('/')
})

// SEARCHING BOOKS
if (document.getElementById('btn__search-book-data'))
  document
    .getElementById('btn__search-book-data')
    .addEventListener('click', function (e) {
      e.preventDefault();

      resetSearchedData();

      const authorInput = document.getElementById('author').value;
      const titleInput = document.getElementById('name').value;

      searchBook(authorInput, titleInput);
      document.getElementById('btn__search-book-data').textContent =
        'Nové hľadanie';
    });

document
  .querySelector('.btn__close-modal')
  .addEventListener('click', function () {
    modal.classList.add('hidden');
    modalInner.classList.remove('modal__inner--login');
    modalInner.classList.remove('modal__inner--books');
    btnCloseModal.classList.remove("btn__close-modal--books")
    btnCloseModal.classList.remove("btn__close-modal--login")
  });

// Manual search
if (document.getElementById('btn__manual-search')) {
  const manualSearchBtn = document.getElementById('btn__manual-search');
  manualSearchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showAllSearchFields();
  });
}

// UPLOADING IMAGE
if (document.getElementById('upload-cover-btn'))
  document
    .getElementById('upload-cover-btn')
    .addEventListener('click', function (e) {
      e.preventDefault();
      openDialog();
    });

// ADDING NEW BOOK TO DATABASE
if (document.querySelector('.form__new-book')) {
  const newBookForm = document.querySelector('.form__new-book');
  newBookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(document.getElementById('author').value);

    const form = new FormData();
    form.append('author', document.getElementById('author').value);
    form.append('name', document.getElementById('name').value);
    form.append('releaseDate', document.getElementById('year').value);
    form.append('ISBN', document.getElementById('isbn').value);
    form.append('category', document.getElementById('category').value);
    form.append(
      'coverImage',
      document.getElementById('uploadPhoto').files[0]
        ? document.getElementById('uploadPhoto').files[0]
        : document.querySelector('.img__book-preview').src
    );
    console.log('value', document.getElementById('author').value);
    if (
      document
        .querySelector('.form__group--save-book')
        .classList.contains('hidden')
    )
      return;
    createBook(form);
  });
}

// SORT BOOK DATABASE
if (document.querySelector(".sort")) {
  const sortCont = (document.querySelector(".sort"))
  
  sortCont.addEventListener("click", function(e) {

    if(e.target.closest(".btn__sort")) {
      const buttons = document.querySelectorAll(".btn__sort")
      const button = e.target.closest(".btn__sort")
      const author = document.getElementById("database-author").value
      const name = document.getElementById("database-name").value
        
      buttons.forEach(btn => btn.classList.remove("sort__active"))
      button.classList.add("sort__active")
      
      loadFilteredBooks(button.id, name, author)
    }

  })
}

// SEARCH BY NAME OR AUTHOR OR BOTH
if (document.getElementById("btn__load-database")) {
  const searchBTN = document.getElementById("btn__load-database")
  searchBTN.addEventListener("click", (e) => {
    e.preventDefault()

    const author = document.getElementById("database-author").value
    const name = document.getElementById("database-name").value
    const filter = document.querySelector(".sort__active").id

    loadFilteredBooks(filter, name, author)

  })
}

// LOGIN
if (document.querySelector('.btn__login')) {
  document.querySelector('.btn__login').addEventListener('click', function (e) {
    e.preventDefault();
    modalInner.classList.add('modal__inner--login');
    modal.classList.remove('hidden');
    btnCloseModal.classList.add("btn__close-modal--login")
  
  });
}

document.querySelector('.btn__login--confirm').addEventListener("click", function(e) {
  e.preventDefault()
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value
  login(email, password)
})

// LOGOUT
if (document.querySelector('.btn__logout'))
  document.querySelector('.btn__logout').addEventListener("click", function(e) {
    logout()
  })

// MAP
if (document.getElementById('map')) displayMap();
