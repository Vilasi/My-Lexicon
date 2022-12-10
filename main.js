const body = document.querySelector('body');
const searchButton = document.querySelector('#searchButton');
const userInput = document.querySelector('#searchbar-input');
const addButton = document.querySelector('#addButton');

const getWordDef = async (word) => {
  const data = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return data;
};

searchButton.addEventListener('click', (e) => {
  console.log(userInput.value.trim());
  let word = userInput.value.trim();

  getWordDef(word)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
