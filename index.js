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

// API CALLS
const getWordDef = async (word) => {
  try {
    const data = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const response = {
      apiSuccess: true,
      statusCode: data.status,
      statusText: data.statusText,
      word: data.data,
    };

    return response;
  } catch (error) {
    const response = {
      apiSuccess: false,
      statusCode: error.response.status,
      statusText: error.statusText,
      errorData: error.response.data,
    };

    return response;
  }
};

// INDEX ROUTE - The Resource
app.get('/', (req, res) => {
  const wordObject = word;
  res.render('index', { word: wordObject });
});

//SEARCH INDIVIDUAL WORD ROUTE
app.get('/words', async (req, res) => {
  let { word } = req.query;

  //Regex trims any word beyond the first word entered.
  word = word.match(/(\w+)/)[0];

  // Call API
  const dictionaryAPICall = await getWordDef(word);

  if (dictionaryAPICall.apiSuccess) {
    console.log(dictionaryAPICall.word);
    res.render('words', { dictionaryAPICall });
  } else {
    res.render('error', { dictionaryAPICall });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

//regular expression to match first word up until first whitespace
// const word = word.match(/(\w+)/)[0];
