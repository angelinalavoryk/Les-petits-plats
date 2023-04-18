const dropdownMenu = document.querySelector('.dropdownMenu');
dropdownMenu.addEventListener('click', (event) => {
  const target = event.target;
  if (target.closest('.filter-select')) {
    target.closest('.filter-select').classList.toggle('open');
  }
});
