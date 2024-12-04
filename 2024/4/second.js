const validSequences = { MMASS: true, MSAMS: true, SSAMM: true, SMASM: true };

function second(textFile) {
  const lines = textFile.split("\n");

  let count = 0;
  for (let y = 1; y < lines.length - 1; y++) {
    const line = lines[y];
    for (let x = 1; x < line.length - 1; x++) {
      const char = line[x];
      if (char !== "A") continue;

      const charTopLeft = lines[y - 1][x - 1];
      const charTopRight = lines[y - 1][x + 1];
      const charBottomLeft = lines[y + 1][x - 1];
      const charBottomRight = lines[y + 1][x + 1];
      const sequence = `${charTopLeft}${charTopRight}A${charBottomLeft}${charBottomRight}`;

      if (validSequences[sequence]) count++;
    }
  }

  return count;
}

module.exports = { second };
