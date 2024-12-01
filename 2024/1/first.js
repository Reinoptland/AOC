function first(textFile) {
  const lines = textFile.split("\n");

  const leftList = [];
  const rightList = [];

  for (const line of lines) {
    const [leftNumber, rightNumber] = line.split("   ");
    leftList.push(parseInt(leftNumber));
    rightList.push(parseInt(rightNumber));
  }

  leftList.sort();
  rightList.sort();

  let difference = 0;

  for (let index = 0; index < leftList.length; index++) {
    const leftNumber = leftList[index];
    const rightNumber = rightList[index];

    difference += Math.abs(leftNumber - rightNumber);
  }

  return difference;
}

module.exports = first;
