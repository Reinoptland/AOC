function findAntinodeLine(nodeA, nodeB, yBoundry, xBoundry) {
  let [rowA, columnA] = nodeA.split(",").map((n) => parseInt(n));
  let [rowB, columnB] = nodeB.split(",").map((n) => parseInt(n));
  const deltaRow = rowB - rowA;
  const deltaColumn = columnB - columnA;
  const antinodesUp = extrapolate(
    rowA,
    columnA,
    deltaRow,
    deltaColumn,
    1,
    [],
    yBoundry,
    xBoundry
  );
  const antinodesDown = extrapolate(
    rowA,
    columnA,
    deltaRow,
    deltaColumn,
    -1,
    [],
    yBoundry,
    xBoundry
  );

  return [...antinodesDown, [rowA, columnA], ...antinodesUp].map(
    (coordinates) => coordinates.toString()
  );
}

function extrapolate(
  row,
  col,
  deltaRow,
  deltaCol,
  direction,
  antinodes,
  boundryY,
  boundryX
) {
  const rowUp = row + direction * deltaRow;
  const colUp = col + direction * deltaCol;
  if (rowUp >= 0 && rowUp <= boundryY && colUp >= 0 && colUp <= boundryX) {
    return extrapolate(
      rowUp,
      colUp,
      deltaRow,
      deltaCol,
      direction,
      antinodes.concat([[rowUp, colUp]]),
      boundryY,
      boundryX
    );
  } else {
    return antinodes;
  }
}

module.exports = { findAntinodeLine };
