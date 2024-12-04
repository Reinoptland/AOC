function first(textFile) {
  const lines = convertToLines(textFile).filter((line) => line.length >= 4);
  const reverseLines = lines.map((line) => line.split("").reverse().join(""));

  return [...lines, ...reverseLines]
    .map((line) => line.match(/XMAS/g)?.length || 0)
    .reduce((acc, curr) => acc + curr);
}

function convertToLines(textFile) {
  const horizontalLines = textFile.split("\n");
  const horizontalLinesReversed = horizontalLines.map((line) =>
    line.split("").reverse()
  );

  const verticalLines = [];
  for (let i = 0; i < horizontalLines[0].length; i++) {
    let line = "";
    for (let j = 0; j < horizontalLines.length; j++) {
      line += horizontalLines[j][i];
    }
    verticalLines.push(line);
  }

  let i = horizontalLines.length;
  let j = 0;
  let diagonalLines = [];
  let reverseDiagonalLines = [];
  while (i > 0 || j < horizontalLines[0].length - 1) {
    if (i === 0) {
      j++;
    }
    if (i > 0) {
      i--;
    }

    let x = 0;
    let diagonalLine = "";
    let reverseDiagonalLine = "";

    while (
      i + x < horizontalLines.length &&
      j + x < horizontalLines[0].length
    ) {
      diagonalLine += horizontalLines[i + x][j + x];
      reverseDiagonalLine += horizontalLinesReversed[i + x][j + x];
      x++;
    }
    diagonalLines.push(diagonalLine);
    reverseDiagonalLines.push(reverseDiagonalLine);
  }

  return [
    ...horizontalLines,
    ...verticalLines,
    ...diagonalLines,
    ...reverseDiagonalLines,
  ];
}

module.exports = { first, convertToLines };
