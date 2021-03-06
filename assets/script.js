// Assignment Code
let generateBtn = document.querySelector("#generate");
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let specialCharacters = " !#$%&'()*+,-./:;<=>?@[]^_`{|}~";
let passLength = false;
let upperCase = false;
let lowerCase = false;
let specialChar = false;
let passNum = false;

function getPasswordLength() {
  passLength = prompt(
    "Your password length must be between 8 and 50 characters, please enter a numerical value"
  );
}

function getCharacterTypes() {
  if (validPassLength()) {
    upperCase = confirm("Would you like to include uppercase characters?");
    lowerCase = confirm("Would you like to include lowercase characters?");
    specialChar = confirm("Would you like to include special characters?");
    passNum = confirm("Would you like to inlcude numbers?");
  } else {
    alert("password length must be between 8 and 50 characters");
  }
}

// Write password to the #password input
function validPassLength() {
  let validPassLength = passLength && passLength > 7 && passLength < 51;
  return validPassLength;
}

function writePassword() {
  getPasswordLength();

  if (validPassLength()) {
    getCharacterTypes();
    if (validEntry()) {
      alert("You've selected a length of " + passLength + ", with these included characters [ Upper case: " + upperCase + ", Lower case:" + lowerCase + ", Special character:" + specialChar + ", Numbers:" + passNum + " ]");
      let password = generatePassword();
      password = shuffleCharacters(password);
      let passwordText = document.querySelector("#password");
      passwordText.value = password;
    } else {
      alert("Cannot generate password, must select 1 type of character");
    }
  } else if (passLength < 8 && passLength !== null) {
    alert("password to short, does not meet minimum length requirement");
  } else if (passLength > 50) {
    alert("password to long, does not meet maximum length requirement");
  } else {
    alert("Cannot generate password, length not specified");
  }
}

function shuffleCharacters(password) {
  let arr = password.split("");
  for (let i = password.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr.join("");
}
function validEntry() {
  return upperCase || lowerCase || specialChar || passNum;
}

function generatePassword() {
  let generatedPassword = "";
  while (generatedPassword.length < passLength) {
    generatedPassword = genPass(generatedPassword);
  }
  return generatedPassword;
}

function genPass(generatedPassword) {
  if (upperCase === true && generatedPassword.length < passLength) {
    let idx = getRandomInt(25);
    let letter = alphabet.substr(idx, 1);
    generatedPassword += letter.toUpperCase();
  }
  if (lowerCase === true && generatedPassword.length < passLength) {
    let idx = getRandomInt(25);
    let letter = alphabet.substr(idx, 1);
    generatedPassword += letter.toLowerCase();
  }
  if (specialChar === true && generatedPassword.length < passLength) {
    let idx = getRandomInt(specialCharacters.length);
    let sChar = specialCharacters.substr(idx, 1);
    generatedPassword += sChar.toLowerCase();
  }
  if (passNum === true && generatedPassword.length < passLength) {
    let rNum = getRandomInt(9);
    generatedPassword += rNum;
  }
  return generatedPassword;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
