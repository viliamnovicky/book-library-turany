export const headerLinkController = () => {
    const links = document.querySelectorAll(".nav__el")
    const location = window.location.href.split("/").at(-1)
    console.log(location);
    links.forEach(link => link.id === location ? link.classList.add("nav__el--active") : link.classList.remove("nav__el--active"))
}