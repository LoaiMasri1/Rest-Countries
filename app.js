let btn=document.querySelector('#toggle_btn')
let label = document.querySelector('.dark_mode p')

btn.addEventListener('click', () => {
   document.body.classList.toggle('dark')
   label.textContent='Light Mode';
});
