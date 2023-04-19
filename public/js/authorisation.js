import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Prihlásenie prebehlo úspešne');
      window.setTimeout(() => {
        res.data.data.user.role === 'user'
          ? location.reload()
          : location.assign('/nova-kniha');
      }, 500);
    }
    console.log(res.data.data.user.role);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Odhlásenie prebehlo úspešne');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', 'Nepodarilo sa odhlásiť');
  }
};
