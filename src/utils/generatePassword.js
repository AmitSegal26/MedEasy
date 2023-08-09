const getRandomArbitrary = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};
const getRandomCapitalLetter = () => {
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = getRandomArbitrary(0, possibleChars.length - 1);
  return possibleChars[randomIndex];
};
const getRandomSmallLetter = () => {
  const possibleChars = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = getRandomArbitrary(0, possibleChars.length - 1);
  return possibleChars[randomIndex];
};
const getRandomNum = () => {
  const numbersForPass = "0123456789";
  const randomIndex = getRandomArbitrary(0, numbersForPass.length - 1);
  return numbersForPass[randomIndex];
};
const getRandomSpecialChar = () => {
  const specialChars = "#!@$%^&*-_";
  const randomIndex = getRandomArbitrary(0, specialChars.length - 1);
  return specialChars[randomIndex];
};

const generateRandomPassword = () => {
  let passwordOfUser = "";
  for (let i = 0; i < 1; i++) {
    passwordOfUser += getRandomCapitalLetter();
    switch (getRandomArbitrary(1, 5)) {
      case 1:
        passwordOfUser += getRandomCapitalLetter();
        break;
      case 2:
        passwordOfUser += getRandomSmallLetter();
        break;
      case 3:
        passwordOfUser += getRandomNum();
        break;
      case 4:
        passwordOfUser += getRandomSpecialChar();
        break;
      case 5:
      default:
        passwordOfUser += "";
    }
  }
  for (let i = 0; i < 4; i++) {
    passwordOfUser += getRandomNum();
    switch (getRandomArbitrary(1, 5)) {
      case 1:
        passwordOfUser += getRandomCapitalLetter();
        break;
      case 2:
        passwordOfUser += getRandomSmallLetter();
        break;
      case 3:
        passwordOfUser += getRandomNum();
        break;
      case 4:
        passwordOfUser += getRandomSpecialChar();
        break;
      case 5:
      default:
        passwordOfUser += "";
    }
  }
  for (let i = 0; i < 1; i++) {
    passwordOfUser += getRandomSmallLetter();
    switch (getRandomArbitrary(1, 5)) {
      case 1:
        passwordOfUser += getRandomCapitalLetter();
        break;
      case 2:
        passwordOfUser += getRandomSmallLetter();
        break;
      case 3:
        passwordOfUser += getRandomNum();
        break;
      case 4:
        passwordOfUser += getRandomSpecialChar();
        break;
      case 5:
      default:
        passwordOfUser += "";
    }
  }
  for (let i = 0; i < 2; i++) {
    passwordOfUser += getRandomSpecialChar();
    switch (getRandomArbitrary(1, 5)) {
      case 1:
        passwordOfUser += getRandomCapitalLetter();
        break;
      case 2:
        passwordOfUser += getRandomSmallLetter();
        break;
      case 3:
        passwordOfUser += getRandomNum();
        break;
      case 4:
        passwordOfUser += getRandomSpecialChar();
        break;
      case 5:
      default:
        passwordOfUser += "";
    }
  }
  let chars = passwordOfUser.split("");
  for (let i = chars.length - 1; i > 0; i--) {
    let j = getRandomArbitrary(0, i);
    let temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  }
  passwordOfUser = chars.join("");
  return passwordOfUser;
};

export default generateRandomPassword;
