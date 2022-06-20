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
const CHOSEN_WORD_KEY = "chosen-word";
const USER_INPUT_KEY = "user-input";
let string = "□";

if (localStorage.getItem(USER_INPUT_KEY) !== null) {
    string = JSON.parse(localStorage.getItem(USER_INPUT_KEY))
}

function handleStartBtn() {
    startBtn.classList.add("hidden");
    localStorage.setItem(ACTIVE_KEY, "true");
    form.classList.remove("hidden");
    form.addEventListener("submit", handleSubmit);
    const chosenWord = words[Math.floor(Math.random() * words.length)].split("");
    localStorage.setItem(CHOSEN_WORD_KEY, chosenWord);
    string = string.repeat(chosenWord.length).split("");
    console.log(JSON.stringify(string));
    h2.innerText = JSON.stringify(string).replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll("\"\"", "");
}

if (localStorage.getItem(ACTIVE_KEY) === null) {
    startBtn.classList.remove("hidden");
    startBtn.addEventListener("click", handleStartBtn);
}
else {
    form.classList.remove("hidden");
    h2.innerText = JSON.stringify(string);
    form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();
    const userInput = input.value.trim();
    input.value = "";
    const chosenWord = localStorage.getItem(CHOSEN_WORD_KEY);
    let turnMatch = [];
    for (let index = 0; index < chosenWord.length; index++) {
        const element = chosenWord[index];
        if (element === userInput) {
            turnMatch.push(index);
            string[index / 2] = userInput;
            console.log(index);
            console.log(string);
        }
    }
    localStorage.setItem(USER_INPUT_KEY, string);
    console.log(JSON.stringify(string));
    h2.innerText = JSON.stringify(string).replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll("\"\"", "");
}