import axios from "axios";
import { showAlert } from "./alerts";

export const deleteBook = async (book) => {
    try {
        const res = await axios({
            method: "DELETE",
            url: `/api/v1/books/${book}`
        })

        showAlert('success', 'Kniha úspešne vymazaná z databázy', 5);
        window.setTimeout(() => {
            location.assign('/admin');
        }, 500);

    } catch (err) {
        showAlert('error', err.response.data.message, 5);
    }
}