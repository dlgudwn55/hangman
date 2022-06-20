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
    "xplanation",
    "esponse",
    "tudent",
    "elation",
    "irection",
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
const ACTIVE_KEY = "active";
const HIDDEN = "hidden";
const CHOSEN_WORD_KEY = "chosen-word";
const USER_INPUT_KEY = "user-input";

let inputCharArr = []

function handleStartBtnClick() {
    startBtn.classList.add(HIDDEN);
    localStorage.setItem(ACTIVE_KEY, "true");
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
}

function gameloop() {
    form.classList.remove(HIDDEN);
    form.addEventListener("submit", handleSubmit);
}

if (localStorage.getItem(ACTIVE_KEY) === null) {
    startBtn.classList.remove(HIDDEN);
    startBtn.addEventListener("click", handleStartBtnClick);
} else {
    gameloop();
}