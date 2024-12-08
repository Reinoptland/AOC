const EMPTY = ".";

function first(textFile) {
  const grid = textFile.split("\n");
  const nodes = {};
  for (let row = 0; row < grid.length; row++) {
    const currentRow = grid[row];
    for (let column = 0; column < currentRow.length; column++) {
      const symbol = currentRow[column];
      if (symbol === EMPTY) continue;
      nodes[symbol] ??= {};
      nodes[symbol][`${row},${column}`] = true;
    }
  }

  const antiNodes = [];
  const yBoundry = grid.length - 1;
  const xBoundry = grid[0].length - 1;
  for (const symbol of Object.keys(nodes)) {
    let matchingAntennaLocations = Object.keys(nodes[symbol]);
    while (matchingAntennaLocations.length > 1) {
      [antennaA, ...matchingAntennaLocations] = matchingAntennaLocations;
      const antinodesWithinBounds = matchingAntennaLocations.flatMap(
        (antennaB) => findAntinodes(antennaA, antennaB, yBoundry, xBoundry)
      );
      antiNodes.push(...antinodesWithinBounds);
    }
  }
  return new Set(antiNodes).size;
}

function findAntinodes(nodeA, nodeB, yBoundry, xBoundry) {
  let [rowA, columnA] = nodeA.split(",").map((n) => parseInt(n));
  let [rowB, columnB] = nodeB.split(",").map((n) => parseInt(n));
  const deltaRow = rowB - rowA;
  const deltaColumn = columnB - columnA;
  return [
    [rowA - deltaRow, columnA - deltaColumn],
    [rowB + deltaRow, columnB + deltaColumn],
  ]
    .filter(([row, col]) => {
      return row >= 0 && row <= yBoundry && col >= 0 && col <= xBoundry;
    })
    .map(([row, col]) => `${row},${col}`);
}

module.exports = { first, findAntinodes };
