const { readDiskMap, checksum, EMPTY } = require("./first");

function second(diskmap) {
  const fileLayout = readDiskMap(diskmap);
  const defragmentedLayout = defragment(fileLayout);

  return checksum(defragmentedLayout);
}

function findNextEmptySequence(fileLayout) {
  let sequences = [];
  let start = null;
  for (let index = 0; index < fileLayout.length; index++) {
    const element = fileLayout[index];
    if (element === EMPTY && !start) {
      start = index;
    } else if (element !== EMPTY && start) {
      const length = index - start;
      sequences.push([length, start, index - 1]);
      start = null;
    }
  }
  return (length, cursor) => {
    const sequenceIndex = sequences.findIndex((seq) => seq[0] >= length);

    if (sequenceIndex === -1) return null;

    const emptySequence = sequences[sequenceIndex];
    const [sequenceLength, start, end] = emptySequence;

    if (cursor <= start) return null;

    if (sequenceLength === length) {
      sequences.splice(sequenceIndex, 1);
      return start;
    } else {
      const difference = sequenceLength - length;
      emptySequence[0] = difference;
      emptySequence[1] = start + length;
      return start;
    }
  };
}

function findNextUnprocessedFile(fileLayout) {
  let indexMemoized = null;
  let currentId = null;
  return () => {
    if (currentId === -1) {
      return { indexStart: null, indexEnd: null, length: null };
    }

    if (indexMemoized === null) {
      indexMemoized = fileLayout.length - 1;
      currentId = Math.max(
        ...fileLayout.filter((character) => character !== EMPTY)
      ).toString();
    }

    let id = currentId;
    let start = null;
    let end = null;
    for (let index = indexMemoized; index >= 0; index--) {
      const element = fileLayout[index];
      if (element === currentId && end === null) {
        end = index;
      } else if (element !== currentId && end !== null) {
        start = index + 1;
        indexMemoized = index;
        currentId = `${parseInt(currentId) - 1}`;
        return {
          id,
          indexStart: start,
          indexEnd: end,
          length: end + 1 - start,
        };
      }
    }
  };
}

function defragment(fileLayout) {
  const getNextEmptySequenceStart = findNextEmptySequence(fileLayout);
  const getNextFile = findNextUnprocessedFile(fileLayout);
  let file = getNextFile();
  while (file?.indexStart) {
    let nextEmptySequenceStart = getNextEmptySequenceStart(
      file.length,
      file.indexStart
    );

    if (nextEmptySequenceStart === null) {
      file = getNextFile();
      continue;
    }

    fileLayout.splice(
      nextEmptySequenceStart,
      file.length,
      ...replace(file.length, file.id)
    );
    fileLayout.splice(
      file.indexStart,
      file.length,
      ...replace(file.length, EMPTY)
    );
    file = getNextFile();
  }

  return fileLayout;
}

function replace(length, character) {
  return Array.from({ length: length }, () => character);
}

module.exports = { second };
