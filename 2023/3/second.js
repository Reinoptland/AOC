const { readFileSync } = require("fs");

const lines = readFileSync("./inputtest.txt", "utf-8").split("\n");

let sum = 0;

const gears = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const character = line[j];
    if (!isNaN(parseInt(character))) {
      const numberLength = line
        .slice(j)
        .split("")
        // add a dot at the end of the line, to prevent bugs with numbers at the end of a line
        .concat(".")
        .findIndex((char) => isNaN(parseInt(char)));

      const number = parseInt(line.slice(j, j + numberLength));

      // previous line
      let adjacentCharacters = "";
      const previousLine = lines[i - 1];
      if (previousLine) {
        const diagonalUpLeft = previousLine[j - 1];
        if (diagonalUpLeft) {
          adjacentCharacters += diagonalUpLeft;
        }

        const charactersAbove = previousLine.slice(j, j + numberLength);
        adjacentCharacters += charactersAbove;

        const diagonalUpRight = previousLine[j + numberLength];
        if (diagonalUpRight) {
          adjacentCharacters += diagonalUpRight;
        }
      }

      // current line
      const previousCharacter = line[j - 1];
      if (previousCharacter) {
        adjacentCharacters += previousCharacter;
      }

      const nextCharacter = line[j + numberLength];
      if (nextCharacter) {
        adjacentCharacters += nextCharacter;
      }

      // next line
      const nextLine = lines[i + 1];

      if (nextLine) {
        const diagonalDownLeft = nextLine[j - 1];
        if (diagonalDownLeft) {
          adjacentCharacters += diagonalDownLeft;
        }

        const charactersBelow = nextLine.slice(j, j + numberLength);
        adjacentCharacters += charactersBelow;

        const diagonalDownRight = nextLine[j + numberLength];
        if (diagonalDownRight) {
          adjacentCharacters += diagonalDownRight;
        }
      }

      const hasAdjacentGear = adjacentCharacters
        .split("")
        .some((symbol) => symbol === "*");

      if (hasAdjacentGear) {
        console.log("GEAR!", number);
      }

      // now that we've processed this number, skip ahead to the next symbol
      j += numberLength - 1;
    }
  }
}

console.log("Sum of parts", sum);
