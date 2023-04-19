import axios from 'axios';
import { showAlert } from './alerts';

export const createBook = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/books',
      data,
    });
    if (res.data.status === 'success')
      showAlert('success', 'Kniha úspešne pridaná do databázy', 5);
  } catch (err) {
    err.response.data.error.code = 11000 ? console.log('1') : console.log('2');
    showAlert('error', 'Kniha už je v databáze', 5);
  }
};
