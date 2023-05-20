import axios from 'axios';
import { showAlert } from './alerts';

export const updateUser = async(data) => {
    try {
        const res = await axios({
            method: "PATCH",
            url: '/api/v1/users/updateMe',
            data
        })
        if (res.data.status === 'success')
      showAlert('success', 'Profilová fotografia úspešne zmenená', 5);
      window.setTimeout(() => {
        location.assign('/profil');
      }, 500);
    } catch(err) {
        showAlert('error', err.response.data.message);
    }
}