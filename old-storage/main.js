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

  // const test = new Word('test');
  // test.setDocument();
  // const test = async () => {
  //   await window.location.href = './word.html';
  // }
  // window.location.href = './word.html';
  getWordDef(word)
    .then((response) => {
      const input = userInput.value.trim();
      const definition = response.data[0].meanings[0].definitions[0].definition;
      const newWord = new Word(input, definition);
      // newWord.hrefLocation();
      newWord.setDocument();
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

class Word {
  constructor(word, definition) {
    this.word = word;
    this.definition = definition;

    this.initialState = `<nav class="navbar navbar-expand-lg bg-light see-through-nav">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">My Lexicon</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
    <main class="word">
      <div class="container">
        <h1 class="display-1">${this.word}</h1>
        <p class="lead definition">
          <span>Definition:</span> ${this.definition}
        </p>
      </div>
    </main>
    

    <!-- Axios CDN -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="./bootstrap-5.2.0/bootstrap.bundle.js"></script>
    <!-- Typewrite Effect Script -->
    <script src="./scripts/typewriter.js" async defer></script>
    <script src="./main.js" async defer></script>`;
  }

  setDocument() {
    const body = document.querySelector('body');
    const html = document.querySelector('html');
    html.classList.add('word-html-body');
    body.classList.add('word-html-body');
    body.innerHTML = this.initialState;
  }

  // hrefLocation() {
  //   window.location.href = './word.html';
  // }

  // capitalizeFirstLetter() {
  //   const array =
  // }
  // writeWord(word) {}
}
