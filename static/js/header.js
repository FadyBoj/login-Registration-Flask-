const menu = document.getElementsByClassName('menu')[0];
const navBar = document.getElementsByClassName('Navbar')[0];
const nav = document.getElementsByClassName('nav')[0];

menu.addEventListener('click',()=>{
    menu.classList.toggle('activeMenu');
    navBar.classList.toggle('activeNav');
    nav.classList.toggle('activeNavbar');
})