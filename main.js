const words = [
    "soup",
    "sir",
    "steak",
    "government",
    "quantity",
    "city",
    "revolution",
    "department",
    "newspaper",
    "explanation",
    "response",
    "student",
    "relation",
    "direction",
    "competition",
    "control",
    "debt",
    "charity",
    "agreement",
    "assumption",
    "trainer",
    "ability",
    "hat",
    "operation",
    "republic",
    "height",
    "error",
    "examination",
    "fact",
    "piano",
    "membership",
    "dinner",
    "decision",
    "heart",
    "election",
    "restaurant",
    "establishment",
    "cousin",
    "singer",
    "length"
];
const startBtn = document.querySelector("button");
const form = document.querySelector("form");
const input = form.querySelector("input");
const h2 = document.querySelector("h2");
const result = document.getElementById("result");
const replayDirection = document.getElementById("replay-direction");
const remainingLife = document.getElementById("remaining-life");

const ACTIVE_KEY = "active";
const HIDDEN = "hidden";
const CHOSEN_WORD_KEY = "chosen-word";
const USER_INPUT_KEY = "user-input";
const LIFE_KEY = "life";

let inputCharArr = []
let life = 5;

function handleStartBtnClick() {
    startBtn.classList.add(HIDDEN);
    localStorage.setItem(ACTIVE_KEY, "true");
    localStorage.setItem(LIFE_KEY, life);
    const chosenWord = words[Math.floor(Math.random() * words.length)];
    for (let index = 0; index < chosenWord.length; index++) {
        inputCharArr.push("□");        
    }
    // console.log(inputCharArr);
    h2.innerText = JSON.stringify(inputCharArr).replaceAll("[", "").replaceAll("]", "").replaceAll(",", "").replaceAll("\"", "");
    localStorage.setItem(CHOSEN_WORD_KEY, JSON.stringify(chosenWord.split("")));
    gameloop();
}

function handleSubmit(event) {
    event.preventDefault();
    const parsedChosenWord = JSON.parse(localStorage.getItem(CHOSEN_WORD_KEY));
    console.log(parsedChosenWord)
    const charInput = input.value;
    input.value = "";
    const correspondArr = [];
    for (let index = 0; index < parsedChosenWord.length; index++) {
        if (charInput === parsedChosenWord[index]) {
            correspondArr.push(index);
        }
    }
    if (correspondArr.length !== 0) {
        for (let index = 0; index < correspondArr.length; index++) {
            inputCharArr[correspondArr[index]] = charInput;
        }
        localStorage.setItem(USER_INPUT_KEY, JSON.stringify(inputCharArr));
        if (localStorage.getItem(USER_INPUT_KEY) === localStorage.getItem(CHOSEN_WORD_KEY)) {
            gameclear();
        }
        else {
            h2.innerText = localStorage.getItem(USER_INPUT_KEY).replaceAll("[", "").replaceAll("]", "").replaceAll(",", "").replaceAll("\"", "");
        }
    }
    else {
        life--;
        localStorage.setItem(LIFE_KEY, life);
        if (life <= 0) {
            gameover();
        }
        else {
            h2.innerText = localStorage.getItem(USER_INPUT_KEY).replaceAll("[", "").replaceAll("]", "").replaceAll(",", "").replaceAll("\"", "");
        }
    }
    remainingLife.innerText = `남은 기회: ${localStorage.getItem(LIFE_KEY)}`;
}

function gameloop() {
    remainingLife.innerText = `남은 기회: ${localStorage.getItem(LIFE_KEY)}`;
    form.classList.remove(HIDDEN);
    form.addEventListener("submit", handleSubmit);
    if (localStorage.getItem(USER_INPUT_KEY)) {
        life = localStorage.getItem(LIFE_KEY);
        inputCharArr = JSON.parse(localStorage.getItem(USER_INPUT_KEY));
        h2.innerText = localStorage.getItem(USER_INPUT_KEY).replaceAll("[", "").replaceAll("]", "").replaceAll(",", "").replaceAll("\"", "");
    }
    else {
        localStorage.setItem(USER_INPUT_KEY, JSON.stringify(inputCharArr));
    }
}

function gameover() {
    remainingLife.classList.add(HIDDEN);
    h2.innerText = localStorage.getItem(USER_INPUT_KEY).replaceAll("[", "").replaceAll("]", "").replaceAll(",", "").replaceAll("\"", "");;
    form.classList.add("hidden");
    result.innerText = `안타깝습니다! 정답은 '${localStorage.getItem(CHOSEN_WORD_KEY).replaceAll("[", "").replaceAll("]", "").replaceAll(",", "").replaceAll("\"", "")}'였습니다.`;
    replayDirection.innerText = "플레이 해주셔서 감사합니다. 다시 도전하시려면 페이지를 새로고침 하세요!"
    localStorage.removeItem(ACTIVE_KEY);
    localStorage.removeItem(LIFE_KEY);
    localStorage.removeItem(CHOSEN_WORD_KEY);
    localStorage.removeItem(USER_INPUT_KEY);
}

function gameclear() {
    remainingLife.classList.add(HIDDEN);
    h2.innerText = localStorage.getItem(USER_INPUT_KEY).replaceAll("[", "").replaceAll("]", "").replaceAll(",", "").replaceAll("\"", "");;
    form.classList.add("hidden");
    result.innerText = `축하합니다. 당신이 이겼습니다!`
    replayDirection.innerText = "플레이 해주셔서 감사합니다. 다시 도전하시려면 페이지를 새로고침 하세요!"
    localStorage.removeItem(ACTIVE_KEY);
    localStorage.removeItem(LIFE_KEY);
    localStorage.removeItem(CHOSEN_WORD_KEY);
    localStorage.removeItem(USER_INPUT_KEY);
}

if (localStorage.getItem(ACTIVE_KEY) === null) {
    startBtn.classList.remove(HIDDEN);
    startBtn.addEventListener("click", handleStartBtnClick);
} else {
    gameloop();
}