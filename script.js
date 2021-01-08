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

  // In order to strictly evaluate in "text" event listener, setting index 0 to data return; otherwise an object will be returned and the strict comparison won't work ("insertedText" is string, "randomWord" is an object)
  // console.log(data);
  // console.log(typeof data); // object (it's an array, which is a type of object)
  // console.log(typeof data[0]); // string
  return data[0];
}

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 15;

// Set difficulty to medium by default, value in session storage if has been set by user
let difficulty =
  sessionStorage.getItem('difficulty') !== null
    ? sessionStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value = difficulty;

// Start counting down
// setInterval: running updateTime function every 1 second
const timeInterval = setInterval(updateTime, 1000);

async function addWordToDOM() {
  randomWord = await getWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    // Clear interval set by setInterval
    clearInterval(timeInterval);
    // End game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is: ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners
text.addEventListener('input', (e) => {
  const insertedText = e.target.value.trim();

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear input text
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 3;
    } else if (difficulty === 'medium') {
      time += 4;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings button click (adding hide class moves it off screen, setting Y position to -100)
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  sessionStorage.setItem('difficulty', difficulty);
});
