function first(textFile) {
  return textFile.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g).reduce((acc, curr) => {
    const [numberA, numberB] = curr
      .match(/[0-9]{1,3}/g)
      .map((number) => parseInt(number));

    return acc + numberA * numberB;
  }, 0);
}

module.exports = first;
