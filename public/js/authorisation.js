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

export const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: '/api/v1/users/updatePassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm
      }
    })
    if (res.data.status === 'success') {
      showAlert("success", "Zmena hesla prebehla úspešne")
      window.setTimeout(() => {
        location.assign('/profil');
      }, 500);
    }
  } catch(err) {
    showAlert("error", err.response.data.message)
  }
}
