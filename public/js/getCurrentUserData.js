import axios from 'axios';
import { loadUserStats } from './models/userModel';

export const getCurrentUserData = async(data) => {
    try {
        const res = await axios({
            method: "GET",
            url: "/api/v1/users/me/userBooks"
        })
        if (res.data.status === 'success') {
            const user = res.data.data
            const statsCont = document.querySelector(".profile__content") 

            if (statsCont) {
                statsCont.addEventListener("click", (e) => {
                    e.preventDefault()
                    const modal = document.querySelector(".modal")
                    const modalInner = document.querySelector(".modal__inner")
                    const btnCloseModal = document.querySelector(".btn__close-modal")
                    const btnDetails = e.target.closest(".btn__show-stat")

                    modalInner.textContent = ""

                    if(btnDetails) {

                        if (btnDetails.id === "booksRead")
                            loadUserStats(user.read)
                        if (btnDetails.id === "booksBorrowed")
                            loadUserStats(user.borrowed)
                        if (btnDetails.id === "booksReserved")
                            loadUserStats(user.reserved)

                        modalInner.classList.add("modal__inner--stats")
                        btnCloseModal.classList.add("btn__close-modal--books")
                        modal.classList.remove("hidden")
                    }
                    
    
                })
            }
        }
    } catch(err) {
        console.log(err);
    }
}