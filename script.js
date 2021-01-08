const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

async function getWord() {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=1`
  );

  const data = await res.json();
  console.log(data);
  return data[0];
}

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

async function addWordToDOM() {
  randomWord = await getWord();
  word.innerHTML = randomWord;
}

addWordToDOM();
