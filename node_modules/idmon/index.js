export default function idmon(num = 16) {
  if (isNaN(num) || !num || num < 1) {
    return console.error(
      'idmon Argument must be number greater than or equal to 1'
    );
  }

  const iterationsArray = [];
  const minimumAsciiValue = 48;
  const maximumAsciiValue = 122;

  for (let i = 0; i < num; i++) {
    iterationsArray.push(
      `${asciiPicker(minimumAsciiValue, maximumAsciiValue)}`
    );
  }

  return iterationsArray.join('');
}

function asciiPicker(min, max) {
  let randomValue = randomNum(min, max);

  //If randomValue falls within specified number range within the while loop's conditional, randomNum() is called until a value outside of specified range is returned.
  //This ensures only ASCII Values corresponding to: a-z, A-Z, 0-9 are utilized.
  while (
    (randomValue > 57 && randomValue < 65) ||
    (randomValue > 90 && randomValue < 97)
  ) {
    randomValue = randomNum(min, max);
  }

  //Convert ASCII Code to corresponding value and return value as string.
  return String.fromCharCode(randomValue);
}

//Get random number within specified minimum constraint and maximum constraint.
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
