const form = document.querySelector('form#searchbar');
const input = document.querySelector('input');
const addWordButtons = document.querySelectorAll('.searchbar-button');

console.log(form);
console.log(input);
console.log(addWordButtons);

for (let button of addWordButtons) {
  button.addEventListener('click', (e) => {
    console.log(e.target.id);
    if (input.value === '') {
      input.placeholder = 'Please enter a word';
    } else if (e.target.id === 'add') {
      // window.location.href = `http://localhost:3000/words?word=${input.value}`;
      // form.method = 'post';
      // console.log(form.method);
      // form.action = `http://localhost:3000/words?word=${input.value}`;
      // form.submit();
    } else if (e.target.id === 'search') {
      // window.location.href = `http://localhost:3000/words?word=${input.value}`;
    }
  });
}
