import '@babel/polyfill';
import { displayMap } from './mapbox';

import { headerLinkController } from './headerLinksController';
import { login, logout, updatePassword } from './authorisation';
import { searchBook } from './searchBook';
import { createBook } from './createBook';
import { getCurrentUserData } from './getCurrentUserData';
import { loadFilteredBooks, showBookDetailsToAdmin } from "./models/bookModel"
import { loadUserStats } from "./models/userModel"
import { showAllSearchFields, resetSearchedData, openDialog, openDialogI, hideModal } from './helpers';
import { updateUser } from './updateUser';
import { deleteBook } from './deleteBook';

headerLinkController()
getCurrentUserData()

const main = document.querySelector(".main")

const modal = document.querySelector('.modal');
const modalInner = document.querySelector('.modal__inner');
const btnCloseModal = document.querySelector(".btn__close-modal")

document.querySelector(".img__arma").addEventListener("click", () => {
  if (!document.querySelector(".img__people"))
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
    if (
      document
        .querySelector('.form__group--save-book')
        .classList.contains('hidden')
    )
      return;
    createBook(form);
  });
}

// DELETE BOOK FROM DATABASE
main.addEventListener("click", (e) => {
  if(e.target.closest("#btn__delete-book")) {
    const btnDelete = e.target.closest("#btn__delete-book")
    console.log(btnDelete)
    modal.classList.remove("hidden")
    modalInner.classList.add("modal__inner--confirm")
    btnCloseModal.classList.add("btn__close-modal--confirm")

    modalInner.textContent=""
    modalInner.insertAdjacentHTML("beforeend", `
      <img src='/img/delete-confirm.jpg' class="img img__confirm img__confirm--delete"></img>
      <h4 class="modal__confirm--heading">Skutočne si prajete vymazať knihu?</h4>
      <div class="modal__confirm--buttons">
        <button class="btn btn__primary" id="btn__delete-book-confirm">Zmazať</button>
        <button class="btn btn__primary btn__red" id="btn__delete-book-cancel">Zrušiť</button>
      </div>
    `)
  }
})

modal.addEventListener("click", (e) => {
  if(e.target.closest("#btn__delete-book-confirm")) {
    deleteBook(document.getElementById("btn__delete-book").dataset.id)
  }
})

// SORT BOOK DATABASE
if (document.querySelector(".sort")) {
  const sortCont = (document.querySelector(".sort"))

  sortCont.addEventListener("click", function (e) {

    if (e.target.closest(".btn__sort")) {
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

if (document.querySelector('.btn__login--confirm'))
  document.querySelector('.btn__login--confirm').addEventListener("click", function (e) {
    e.preventDefault()
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value
    login(email, password)
  })

// LOGOUT
if (document.querySelector('.btn__logout'))
  document.querySelector('.btn__logout').addEventListener("click", function (e) {
    logout()
  })

// CHANGE PASSWORD
if (document.querySelector(".btn__change-password")) {
  document.querySelector(".btn__change-password").addEventListener("click", function (e) {
    e.preventDefault()
    const passwordCurrent = document.getElementById("change-password__old").value
    const password = document.getElementById("change-password__new").value
    const passwordConfirm = document.getElementById("change-password__confirm").value
    console.log(passwordCurrent, password, passwordConfirm)
    updatePassword(passwordCurrent, password, passwordConfirm)
  })
}


// MAP
if (document.getElementById('map')) displayMap();

// PROFILE
if (document.querySelectorAll("btn__profile")) {
  const btnProfileStats = document.getElementById("btn-profile-stats")
  const btnProfileSettings = document.getElementById("btn-profile-settings")
  const profileStatsCont = document.querySelector(".profile__stats")
  const profileSettingsCont = document.querySelector(".profile__settings")
  const bookInfo = document.getElementById("book-info")    
  const bookActions = document.getElementById("book-actions")

  if(btnProfileStats)
    btnProfileStats.addEventListener("click", function (e) {
      e.preventDefault()
      console.log("do ")
      profileStatsCont.classList.remove("hidden__profile--stats")
      profileSettingsCont.classList.add("hidden__profile--settings")
      btnProfileStats.classList.add("btn__profile--active")
      btnProfileSettings.classList.remove("btn__profile--active")
      bookInfo.textContent=""
      bookActions.textContent=""
      document.querySelector(".profile__stat--actions").id=""
    })

  if(btnProfileSettings)
    btnProfileSettings.addEventListener("click", function (e) {
      e.preventDefault()
      profileStatsCont.classList.add("hidden__profile--stats")
      profileSettingsCont.classList.remove("hidden__profile--settings")
      btnProfileStats.classList.remove("btn__profile--active")
      btnProfileSettings.classList.add("btn__profile--active")
      console.log("do ")
    })
}

// ADMIN
/*Show book details*/
if (document.getElementById("book-list")) {
  document.getElementById("book-list").addEventListener("click", (e) => {
    const book = e.target.closest(".admin__info--book").id
    showBookDetailsToAdmin(book)
  })
}

// UPLOADING IMAGE
if (document.querySelector('.btn__load-new-avatar')) {
  const fileInput = document.getElementById("uploadAvatar")
  const btnSubmitNewAvatar = document.querySelector(".btn__save-new-avatar")

  document.querySelector('.btn__load-new-avatar').addEventListener('click', function (e) {
    e.preventDefault();
    console.log("click")
    openDialogI();
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0)
      btnSubmitNewAvatar.classList.remove("inactive")
  })

  btnSubmitNewAvatar.addEventListener('click', (e) => {
    e.preventDefault();

    const formAvatar = new FormData();
    formAvatar.append('photo', fileInput.files[0])

    updateUser(formAvatar);
  });
}

//CLOSE MODAL
btnCloseModal.addEventListener('click', hideModal);
modal.addEventListener("click", (e) => {
  if (e.target.closest("#btn__delete-book-cancel")){
    hideModal()
  }
})

