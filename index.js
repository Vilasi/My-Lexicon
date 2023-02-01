import express from 'express';
import path from 'path';
import * as url from 'url';
import idmon from 'idmon';
import methodOverride from 'method-override';
import axios from 'axios';
import word from './word.json' assert { type: 'json' };

//Assign absolute paths independent of Environment
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = 3000;

// SET VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//LOAD STATIC FILES
const pathToPublic = path.join(__dirname, '/public');
app.use(express.static(pathToPublic));

// MIDDLEWARE
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(methodOverride('_method'));

// DATA
// const word = [];

// INDEX ROUTE
app.get('/', (req, res) => {
  //   res.send('Welcome to My Lexicon!');
  const wordObject = word;
  //   console.log(word);

  res.render('index', { word: wordObject });
});

app.get('/words', (req, res) => {
  res.send('I am the response');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
