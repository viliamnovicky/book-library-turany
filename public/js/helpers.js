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

export const getFilterValues = () => {
  const author = document.getElementById("database-author").value
  const name = document.getElementById("database-name").value
  const filter = document.querySelector(".sort__active").id

  return author, name, filter
}
