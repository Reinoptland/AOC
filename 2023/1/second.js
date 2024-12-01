const { lookup } = require("dns");
const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", "utf8").split("\n");
let total = 0;

for (const line of lines) {
  const input = line;
  let numbers = "";

  for (let index = 0; index < input.length; index++) {
    const character = input[index];
    const isNumber = !isNaN(parseInt(character));
    if (isNumber) {
      // this is already a number, add it to the numbers for this line
      numbers += character;
      continue;
    }

    // at this point, we are dealing with letter (or special character)

    // dictionary defining all possibilities for digit words
    // one | two | three | four | five
    // | six | seven | eight | nine
    const digitDictionary = {
      o: { n: { e: 1 } },
      t: { w: { o: 2 }, h: { r: { e: { e: 3 } } } },
      f: { o: { u: { r: 4 } }, i: { v: { e: 5 } } },
      s: { i: { x: 6 }, e: { v: { e: { n: 7 } } } },
      e: { i: { g: { h: { t: 8 } } } },
      n: { i: { n: { e: 9 } } },
    };

    // we start checking the current first character, e.g. f
    let nextCharacter = digitDictionary[character];
    let characterDepth = 0;

    while (nextCharacter) {
      if (typeof nextCharacter === "object") {
        // in this case, the sequence of characters might match a digit
        // but we still have characters to check
        // e.g. first character was f
        // now we have to check the whether the next character matches o (four) or i (five)
        characterDepth++;
        // we now go check the dictionary of possibilities, but 1 level deeper than before
        nextCharacter = nextCharacter[input[index + characterDepth]];
      } else if (typeof nextCharacter === "number") {
        // if we found a that the first character and subsequent characters
        // match a digit word we end up with a number from the dictionary
        // so we add it to the numbers for this line
        numbers += nextCharacter;
        // and we are done processing this character
        break;
      }
    }
  }

  const firstDigit = numbers[0];
  const lastDigit = numbers[numbers.length - 1];

  const value = parseInt(`${firstDigit}${lastDigit}`);
  total += value;
}

console.log("Second calibration value", total);
