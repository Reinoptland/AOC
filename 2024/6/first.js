const UP = "^";
const LEFT = "<";
const RIGHT = ">";
const DOWN = "v";
const OBSTACLE = "#";
const GUARDS = [UP, LEFT, RIGHT, DOWN];

function first(textFile) {
  const visited = {};
  const grid = textFile.split("\n");
  const [guardRow, guardColumn, direction] = findGuard(grid);
  console.log(guardRow, guardColumn, direction);
  visited[`${guardRow},${guardColumn}`] = true;
  let nextMove = moveGuard(grid, [guardRow, guardColumn, direction], visited);
  while (nextMove) {
    nextMove = nextMove();
  }
  return visited;
}

function moveGuard(grid, guardPosition, visited) {
  const [guardRow, guardColumn, direction] = guardPosition;
  let nextPosition;
  switch (direction) {
    case UP:
      nextPosition = [guardRow - 1, guardColumn];
      break;
    case LEFT:
      nextPosition = [guardRow, guardColumn - 1];
      break;
    case RIGHT:
      nextPosition = [guardRow, guardColumn + 1];
      break;
    case DOWN:
      nextPosition = [guardRow + 1, guardColumn];
      break;

    default:
      break;
  }
  [newRow, newColumn] = nextPosition;
  const guardLeftArea =
    grid[newRow] === undefined || grid[newRow][newColumn] === undefined;
  if (guardLeftArea) return null;

  const nextCell = grid[newRow][newColumn];
  if (nextCell === OBSTACLE) {
    return () =>
      moveGuard(grid, [guardRow, guardColumn, rotate(direction)], visited);
  } else {
    visited[`${newRow},${newColumn}`] = true;
    return () => moveGuard(grid, [newRow, newColumn, direction], visited);
  }
}

function rotate(direction) {
  switch (direction) {
    case UP:
      return RIGHT;
    case RIGHT:
      return DOWN;
    case DOWN:
      return LEFT;
    case LEFT:
      return UP;
  }
}

function findGuard(grid) {
  const row = grid.findIndex((row) =>
    GUARDS.some((guard) => row.includes(guard))
  );
  const column = grid[row]
    .split("")
    .findIndex((cell) => GUARDS.some((guard) => cell.includes(guard)));

  let direction;
  switch (grid[row][column]) {
    case UP:
      direction = UP;
      break;
    case LEFT:
      direction = LEFT;
      break;
    case RIGHT:
      direction = RIGHT;
      break;
    case DOWN:
      direction = DOWN;
      break;

    default:
      break;
  }
  return [row, column, direction];
}

module.exports = { first };
