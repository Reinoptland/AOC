const EMPTY = ".";

function first(diskmap) {
  const fileLayout = readDiskMap(diskmap);
  const compactedFilelayout = compact(fileLayout);

  return checksum(compactedFilelayout);
}

function readDiskMap(diskmap) {
  const fileLayout = [];
  for (let index = 0; index < diskmap.length; index++) {
    const number = parseInt(diskmap[index]);
    const id = index % 2 === 0 ? (index / 2).toString() : EMPTY;
    for (let j = 0; j < number; j++) {
      fileLayout.push(id);
    }
  }
  return fileLayout;
}

function isFilelayoutCompacted(fileLayout) {
  return fileLayout.every(isCompacted());
}

function isCompacted() {
  let emptySpaceDetected = false;
  return (character) => {
    if (character === EMPTY) {
      emptySpaceDetected = true;
      return true;
    } else if (character !== EMPTY && emptySpaceDetected) {
      return false;
    } else {
      return true;
    }
  };
}

function compact(fileLayout) {
  for (
    let index = fileLayout.length - 1;
    !isFilelayoutCompacted(fileLayout);
    index--
  ) {
    const element = fileLayout[index];
    const nextEmptySpace = fileLayout.findIndex(
      (character) => character === EMPTY
    );
    fileLayout[nextEmptySpace] = element;
    fileLayout[index] = EMPTY;
  }
  return fileLayout;
}

function checksum(fileLayout) {
  let sum = 0;
  for (let index = 0; index < fileLayout.length; index++) {
    const id = fileLayout[index];
    if (id === EMPTY) {
      break;
    } else {
      sum = sum + index * id;
    }
  }
  return sum;
}

module.exports = {
  readDiskMap,
  compact,
  isFilelayoutCompacted,
  first,
  checksum,
};
