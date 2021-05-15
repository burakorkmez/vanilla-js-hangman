const programming_languages = [
	'python',
	'javascript',
	'mongodb',
	'json',
	'java',
	'html',
	'css',
	'c',
	'csharp',
	'golang',
	'kotlin',
	'php',
	'sql',
	'ruby',
];

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

const randomWord = () => {
	answer =
		programming_languages[
			Math.floor(Math.random() * programming_languages.length)
		];
};

const generateButtons = () => {
	let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'
		.split('')
		.map(
			(letter) =>
				`
      <button
        class="btn btn-lg btn-danger m-2"
        id='` +
				letter +
				`'
        onClick="handleGuess('` +
				letter +
				`')"
      >
        ` +
				letter +
				`
      </button>
    `
		)
		.join('');

	document.getElementById('keyboard').innerHTML = buttonsHTML;
};

const handleGuess = (chosenLetter) => {
	guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
	document.getElementById(chosenLetter).setAttribute('disabled', true);

	if (answer.indexOf(chosenLetter) >= 0) {
		guessedWord();
		checkIfGameWon();
	} else if (answer.indexOf(chosenLetter) === -1) {
		mistakes++;
		updateMistakes();
		checkIfGameLost();
		updateHangmanPicture();
	}
};

const updateHangmanPicture = () => {
	document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
};

const checkIfGameWon = () => {
	if (wordStatus === answer) {
		document.getElementById('keyboard').innerHTML = 'You Won!!!';
	}
};

const checkIfGameLost = () => {
	if (mistakes === maxWrong) {
		document.getElementById('wordSpotlight').innerHTML =
			'The answer was: ' + answer;
		document.getElementById('keyboard').innerHTML = 'You Lost!!!';
	}
};

const guessedWord = () => {
	wordStatus = answer
		.split('')
		.map((letter) => (guessed.indexOf(letter) >= 0 ? letter : ' _ '))
		.join('');

	document.getElementById('wordSpotlight').innerHTML = wordStatus;
};

const updateMistakes = () => {
	document.getElementById('mistakes').innerHTML = mistakes;
};

const reset = () => {
	mistakes = 0;
	guessed = [];
	document.getElementById('hangmanPic').src = './images/0.jpg';

	randomWord();
	guessedWord();
	updateMistakes();
	generateButtons();
};

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
