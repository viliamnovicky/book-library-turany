export const showAllSearchFields = () => {
  document
    .querySelectorAll('#manual-search')
    .forEach((el) => el.classList.remove('hidden'));

  document.querySelector('.no-success').classList.add('hidden');
};

export const hideAllSearchFields = () => {
  document
    .querySelectorAll('#manual-search')
    .forEach((el) => el.classList.add('hidden'));
  document.querySelector('.no-success').classList.remove('hidden');

  document.querySelector('.img__book-preview').src = '/img/book-no-cover.jpg';
};

export const resetSearchedData = () => {
  const options = document.querySelectorAll('.option');
  options.forEach((option) => option.remove());
};

export const openDialog = () => {
  document.getElementById('uploadPhoto').click();
};

export const openDialogI = () => {
  document.getElementById('uploadAvatar').click();
};

export const getFilterValues = () => {
  const author = document.getElementById("database-author").value
  const name = document.getElementById("database-name").value
  const filter = document.querySelector(".sort__active").id

  return author, name, filter
}

export const hideModal = () => {
  const modal = document.querySelector('.modal');
  const modalInner = document.querySelector('.modal__inner');
  const btnCloseModal = document.querySelector(".btn__close-modal")
  modal.classList.add('hidden');
    modalInner.classList.remove('modal__inner--login');
    modalInner.classList.remove('modal__inner--books');
    btnCloseModal.classList.remove("btn__close-modal--books")
    btnCloseModal.classList.remove("btn__close-modal--login")
    modalInner.classList.remove("modal__inner--confirm")
    btnCloseModal.classList.remove("btn__close-modal--confirm")
}
