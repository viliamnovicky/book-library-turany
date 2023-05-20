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
      window.setTimeout(() => {
        location.assign('/nova-kniha');
      }, 500);
  } catch (err) {
    
    showAlert('error', 'Kniha už je v databáze', 5);
  }
};
