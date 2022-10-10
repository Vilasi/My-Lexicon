const searchButtons = document.querySelectorAll('.searchbar-button');
const userInput = document.querySelector('#searchbar-input');

const getWordDef = async (word) => {
  const base = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  const query = `${word}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data);
  return data;
};

searchButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // console.log(e.target.textContent.trim());
    console.log(userInput.value.trim);

    getWordDef(userInput.value)
      .then((data) => {
        // console.log(data[0].phonetics[0].audio);
        new Audio(data[0].phonetics[0].audio).play();

        // console.log(data.message);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // userInput.value = '';
  });
});
