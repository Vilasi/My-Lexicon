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
