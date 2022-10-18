const body = document.querySelector('body');
const searchButton = document.querySelector('#searchButton');
const userInput = document.querySelector('#searchbar-input');
const addButton = document.querySelector('#addButton');

const getWordDef = async (word) => {
  const base = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  const query = `${word}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data);
  return data;
};

searchButton.addEventListener('click', (e) => {
  // console.log(e.target.textContent.trim());
  console.log(userInput.value.trim);

  getWordDef(userInput.value)
    .then((data) => {
      // console.log(data[0].phonetics[0].audio);
      new Audio(data[0].phonetics[0].audio).play();

      // console.log(data.message);
      console.dir(data);
    })
    .catch((err) => {
      console.dir('test', err);
    });
  // userInput.value = '';
});

class Page {
  constructor(word, body, sessionStorage) {
    this.word = word;
    this.body = body;
    this.sessionStorage = sessionStorage;
    this.addPage();
  }
  addPage() {
    this.body.innerHTML = `<h1>This is my word: ${this.word}</h1>`;
    history.pushState(this.word, '', 'word');
    sessionStorage.setItem('index', this.sessionStorage);
    console.log(body);
    console.log(history);
    console.log(PopStateEvent);
    console.log(this.sessionStorage);
  }
}

addButton.addEventListener('click', (e) => {
  console.dir(userInput);
  new Page(userInput.value, body, 2);
});

window.addEventListener('popstate', (e) => {
  console.log(e);
  if (sessionStorage.getItem('index') === '2') {
    sessionStorage.setItem('index', '1');
    let body = document.querySelector('body');
    body.innerHTML = "Holy Moley It's a single page application!!";
  }
});

//history.pushState(pageData, "", urlToGoTo)
// history.pushState(data, '', url);
