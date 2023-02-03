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
      word: data.data[0].word,
      apiSuccess: true,
      statusCode: data.status,
      statusText: data.statusText,
      data: data.data,
      id: idmon(),
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

const words = [];

// INDEX ROUTE - The Resource
app.get('/', (req, res) => {
  const wordObject = word;
  res.render('index', { word: wordObject });
});

//SEARCH INDIVIDUAL WORD ROUTE
app.get('/words/definition', async (req, res) => {
  let { word } = req.query;

  //Regex trims any word beyond the first word entered.
  word = word.match(/(\w+)/)[0];

  // Call API
  const dictionaryAPICall = await getWordDef(word);
  words.push(dictionaryAPICall);
  console.log(words);
  console.log(__dirname);

  if (dictionaryAPICall.apiSuccess) {
    // console.log(dictionaryAPICall.word);
    res.render('words', { dictionaryAPICall, word });
  } else {
    res.render('error', { dictionaryAPICall });
  }
});

app.post('/words', (req, res) => {
  res.send('Post route!');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

const mockDataBase = [
  {
    word: 'teddy',
    apiSuccess: true,
    statusCode: 200,
    statusText: 'OK',
    data: [
      {
        word: 'test',
        phonetic: '/test/',
        phonetics: [
          {
            text: '/test/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=9014228',
            license: {
              name: 'BY 3.0 US',
              url: 'https://creativecommons.org/licenses/by/3.0/us',
            },
          },
          {
            text: '/test/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/test-us.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=1197419',
            license: {
              name: 'BY-SA 3.0',
              url: 'https://creativecommons.org/licenses/by-sa/3.0',
            },
          },
        ],
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition: 'A challenge, trial.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  'A cupel or cupelling hearth in which precious metals are melted for trial and refinement.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  '(academia) An examination, given often during the academic term.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  'A session in which a product or piece of equipment is examined under everyday or extreme conditions to evaluate its durability, etc.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: '(normally “Test”) A Test match.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  'The external calciferous shell, or endoskeleton, of an echinoderm, e.g. sand dollars and sea urchins.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'Testa; seed coat.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'Judgment; distinction; discrimination.',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: ['examination', 'quiz'],
            antonyms: ['recess'],
          },
          {
            partOfSpeech: 'verb',
            definitions: [
              {
                definition: 'To challenge.',
                synonyms: [],
                antonyms: [],
                example: 'Climbing the mountain tested our stamina.',
              },
              {
                definition:
                  'To refine (gold, silver, etc.) in a test or cupel; to subject to cupellation.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  'To put to the proof; to prove the truth, genuineness, or quality of by experiment, or by some principle or standard; to try.',
                synonyms: [],
                antonyms: [],
                example:
                  'to test the soundness of a principle; to test the validity of an argument',
              },
              {
                definition:
                  '(academics) To administer or assign an examination, often given during the academic term, to (somebody).',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  'To place a product or piece of equipment under everyday and/or extreme conditions and examine it for its durability, etc.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'To be shown to be by test.',
                synonyms: [],
                antonyms: [],
                example: 'He tested positive for cancer.',
              },
              {
                definition: 'To examine or try, as by the use of some reagent.',
                synonyms: [],
                antonyms: [],
                example: 'to test a solution by litmus paper',
              },
            ],
            synonyms: [],
            antonyms: [],
          },
        ],
        license: {
          name: 'CC BY-SA 3.0',
          url: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        sourceUrls: ['https://en.wiktionary.org/wiki/test'],
      },
      {
        word: 'test',
        phonetic: '/test/',
        phonetics: [
          {
            text: '/test/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=9014228',
            license: {
              name: 'BY 3.0 US',
              url: 'https://creativecommons.org/licenses/by/3.0/us',
            },
          },
          {
            text: '/test/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/test-us.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=1197419',
            license: {
              name: 'BY-SA 3.0',
              url: 'https://creativecommons.org/licenses/by-sa/3.0',
            },
          },
        ],
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition: 'A witness.',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [],
            antonyms: [],
          },
          {
            partOfSpeech: 'verb',
            definitions: [
              {
                definition: 'To attest (a document) legally, and date it.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'To make a testament, or will.',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [],
            antonyms: [],
          },
        ],
        license: {
          name: 'CC BY-SA 3.0',
          url: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        sourceUrls: ['https://en.wiktionary.org/wiki/test'],
      },
      {
        word: 'test',
        phonetic: '/test/',
        phonetics: [
          {
            text: '/test/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=9014228',
            license: {
              name: 'BY 3.0 US',
              url: 'https://creativecommons.org/licenses/by/3.0/us',
            },
          },
          {
            text: '/test/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/test-us.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=1197419',
            license: {
              name: 'BY-SA 3.0',
              url: 'https://creativecommons.org/licenses/by-sa/3.0',
            },
          },
        ],
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition: '(body building) testosterone',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [],
            antonyms: [],
          },
        ],
        license: {
          name: 'CC BY-SA 3.0',
          url: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        sourceUrls: ['https://en.wiktionary.org/wiki/test'],
      },
    ],
    id: '5HkqV9YWy9HdJ3Nl',
  },
  {
    word: 'trial',
    apiSuccess: true,
    statusCode: 200,
    statusText: 'OK',
    data: [
      {
        word: 'trial',
        phonetic: '/ˈtɹaɪəl/',
        phonetics: [
          {
            text: '/ˈtɹaɪəl/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/trial-us.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=1676885',
            license: {
              name: 'BY-SA 3.0',
              url: 'https://creativecommons.org/licenses/by-sa/3.0',
            },
          },
        ],
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition: 'An opportunity to test something out; a test.',
                synonyms: [],
                antonyms: [],
                example:
                  'They will perform the trials for the new equipment next week.',
              },
              {
                definition:
                  'Appearance at judicial court in order to be examined.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'A difficult or annoying experience.',
                synonyms: [],
                antonyms: [],
                example: 'That boy was a trial to his parents.',
              },
              {
                definition: 'A tryout to pick members of a team.',
                synonyms: [],
                antonyms: [],
                example: 'soccer trials',
              },
              {
                definition: 'A piece of ware used to test the heat of a kiln.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'An internal examination set by Eton College.',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [],
            antonyms: [],
          },
          {
            partOfSpeech: 'verb',
            definitions: [
              {
                definition:
                  'To carry out a series of tests on (a new product, procedure etc.) before marketing or implementing it.',
                synonyms: [],
                antonyms: [],
                example:
                  'The warning system was extensively trialed before being fitted to all our vehicles.',
              },
              {
                definition: 'To try out (a new player) in a sports team.',
                synonyms: [],
                antonyms: [],
                example:
                  "The team trialled a new young goalkeeper in Saturday's match, with mixed results.",
              },
            ],
            synonyms: [],
            antonyms: [],
          },
          {
            partOfSpeech: 'adjective',
            definitions: [
              {
                definition: 'Pertaining to a trial or test.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'Attempted on a provisional or experimental basis.',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [],
            antonyms: [],
          },
        ],
        license: {
          name: 'CC BY-SA 3.0',
          url: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        sourceUrls: ['https://en.wiktionary.org/wiki/trial'],
      },
      {
        word: 'trial',
        phonetic: '/ˈtɹaɪəl/',
        phonetics: [
          {
            text: '/ˈtɹaɪəl/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/trial-us.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=1676885',
            license: {
              name: 'BY-SA 3.0',
              url: 'https://creativecommons.org/licenses/by-sa/3.0',
            },
          },
        ],
        meanings: [
          {
            partOfSpeech: 'adjective',
            definitions: [
              {
                definition:
                  'Characterized by having three (usually equivalent) components.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'Triple.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  '(grammar) Pertaining to a language form referring to three of something, like people; contrast singular, dual and plural. (See Ambai language for an example.)',
                synonyms: [],
                antonyms: [],
                example: 'No language has a trial number unless it has a dual.',
              },
            ],
            synonyms: [],
            antonyms: [],
          },
        ],
        license: {
          name: 'CC BY-SA 3.0',
          url: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        sourceUrls: ['https://en.wiktionary.org/wiki/trial'],
      },
    ],
    id: 'akH6bKiBigEITXEx',
  },
  {
    word: 'best',
    apiSuccess: true,
    statusCode: 200,
    statusText: 'OK',
    data: [
      {
        word: 'best',
        phonetic: '/ˈbɛst/',
        phonetics: [
          {
            text: '/ˈbɛst/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/best-au.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=75729896',
            license: {
              name: 'BY-SA 4.0',
              url: 'https://creativecommons.org/licenses/by-sa/4.0',
            },
          },
          {
            text: '/ˈbɛst/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/best-us.mp3',
            sourceUrl:
              'https://commons.wikimedia.org/w/index.php?curid=1222257',
            license: {
              name: 'BY-SA 3.0',
              url: 'https://creativecommons.org/licenses/by-sa/3.0',
            },
          },
        ],
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition: 'The supreme effort one can make, or has made.',
                synonyms: [],
                antonyms: [],
                example: 'I did my best.',
              },
              {
                definition: "One's best behavior.",
                synonyms: [],
                antonyms: [],
                example:
                  "I was somewhat distant lately, and my lady promised me head every Tuesday of the week when I'm nice to her, so I better be on my best.",
              },
              {
                definition:
                  'The person (or persons; or thing or things) that is (are) most excellent.',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [],
            antonyms: [],
          },
          {
            partOfSpeech: 'verb',
            definitions: [
              {
                definition: 'To surpass in skill or achievement.',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: 'To beat in a contest',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [],
            antonyms: ['worst'],
          },
          {
            partOfSpeech: 'adjective',
            definitions: [
              {
                definition: 'Most; largest.',
                synonyms: [],
                antonyms: [],
                example: 'Unpacking took the best part of a week.',
              },
              {
                definition: 'Most superior; most favorable.',
                synonyms: [],
                antonyms: [],
                example:
                  'In my opinion, mushrooms are the best pizza toppings.',
              },
            ],
            synonyms: [],
            antonyms: ['baddest', 'worst'],
          },
          {
            partOfSpeech: 'adjective',
            definitions: [
              {
                definition: '(of people)',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: '(of capabilities)',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: '(properties and qualities)',
                synonyms: [],
                antonyms: [],
              },
              {
                definition: '(when with and) Very, extremely. See good and.',
                synonyms: [],
                antonyms: [],
                example: 'The soup is good and hot.',
              },
              {
                definition: 'Holy (especially when capitalized) .',
                synonyms: [],
                antonyms: [],
                example: 'Good Friday',
              },
              {
                definition: '(of quantities)',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [
              'accomplished',
              'all right',
              'decent',
              'not bad',
              'satisfactory',
              'well',
            ],
            antonyms: ['bad', 'evil', 'bad', 'poor'],
          },
          {
            partOfSpeech: 'adverb',
            definitions: [
              {
                definition: '(manner) Accurately, competently, satisfactorily.',
                synonyms: [],
                antonyms: [],
                example: 'He does his job well.',
              },
              {
                definition: '(manner) Completely, fully.',
                synonyms: [],
                antonyms: [],
                example: 'We’re well beat now.',
              },
              {
                definition: '(degree) To a significant degree.',
                synonyms: [],
                antonyms: [],
                example: 'That author is well known.',
              },
              {
                definition: '(degree) Very (as a general-purpose intensifier).',
                synonyms: [],
                antonyms: [],
              },
              {
                definition:
                  'In a desirable manner; so as one could wish; satisfactorily; favourably; advantageously.',
                synonyms: [],
                antonyms: [],
              },
            ],
            synonyms: [],
            antonyms: [],
          },
        ],
        license: {
          name: 'CC BY-SA 3.0',
          url: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
        sourceUrls: [
          'https://en.wiktionary.org/wiki/best',
          'https://en.wiktionary.org/wiki/good',
          'https://en.wiktionary.org/wiki/well',
        ],
      },
    ],
    id: 'FI7y9B2Jci4iE8fy',
  },
];
