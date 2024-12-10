const TRAILHEAD = "0";
const SUMMIT = "9";

function first(textFile) {
  const map = textFile.split("\n");
  const trailheads = findTrailheads(map);
  let score = 0;
  let rating = 0;
  for (const trailhead of trailheads) {
    const routes = findSummits(trailhead, map);
    score += new Set(routes).size;
    rating += routes.length;
  }
  return { score, rating };
}

function findSummits(location, map, level = "0") {
  const [row, col] = location;
  const currentHeight = map[row][col];
  if (currentHeight === SUMMIT) {
    return location.toString();
  }

  const nextMoves = getMoves(location, map);
  if (nextMoves.length === 0) return [];

  const nextHeight = `${parseInt(currentHeight) + 1}`;
  return nextMoves.flatMap((move) => findSummits(move, map, nextHeight));
}

function getMoves(location, map) {
  const [currentRow, currentCol] = location;
  const currentHeight = map[currentRow][currentCol];

  const up = [currentRow - 1, currentCol];
  const down = [currentRow + 1, currentCol];
  const left = [currentRow, currentCol - 1];
  const right = [currentRow, currentCol + 1];

  return [up, down, left, right].filter((move) =>
    isValidMove(move, map, currentHeight)
  );
}

function isValidMove(location, map, currentHeight) {
  const upOneLevel = `${parseInt(currentHeight) + 1}`;
  const [row, col] = location;
  return map[row] && map[row][col] === upOneLevel;
}

function findTrailheads(map) {
  const trailheads = [];
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const cell = map[row][col];
      if (cell === TRAILHEAD) trailheads.push([row, col]);
    }
  }

  return trailheads;
}

module.exports = { first, findTrailheads, findSummits, getMoves };
