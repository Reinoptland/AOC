function first(textFile, generations) {
  let stones = textFile.split(" ").map((n) => parseInt(n));
  for (let index = 0; index < generations; index++) {
    stones = stones.flatMap((stone) => transform(stone));
  }
  return stones;
}

function transform(stone) {
  switch (true) {
    case parseInt(stone) === 0:
      return 1;

    case stone.toString().length % 2 === 0:
      const numberAsString = stone.toString();
      const middle = numberAsString.length / 2;
      return [
        parseInt(numberAsString.substring(0, middle)),
        parseInt(numberAsString.substring(middle)),
      ];
    default:
      return stone * 2024;
  }
}

module.exports = { first, transform };
