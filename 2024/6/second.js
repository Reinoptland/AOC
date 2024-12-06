const { first, findGuard, OBSTACLE } = require("./first");

function second(textFile) {
  const grid = textFile.split("\n");
  const obstacleOptions = first(textFile);
  const [guardRow, guardColumn, direction] = findGuard(grid);

  // we cannot place an obstacle at the guard's starting location
  delete obstacleOptions[`${guardRow},${guardColumn}`];

  let loops = 0;

  for (const location of Object.keys(obstacleOptions)) {
    const [obstacleRow, obstacleColumn] = location.split(",");
    let newGrid = [...grid].map((string) => string.split(""));
    newGrid[obstacleRow][obstacleColumn] = OBSTACLE;
    newGrid = newGrid.map((array) => array.join("")).join("\n");

    const result = first(newGrid);
    const isLoop = Object.keys(result).some((key) => result[key].loop);
    if (isLoop) loops++;
  }

  return loops;
}

module.exports = { second };
