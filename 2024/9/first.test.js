const { checksum } = require("./first");
const {
  readDiskMap,
  compact,
  isFilelayoutCompacted,
  first,
} = require("./first");

describe("first", () => {
  test("produces the checksum for the compacted diskmap", () => {
    const diskmap = "2333133121414131402";
    const checksum = first(diskmap);
    expect(checksum).toBe(1928);
  });
});

describe("checksum", () => {
  test("calculates a checksum based on a compacted fileLayout", () => {
    const fileLayout = "0099811188827773336446555566..............".split("");
    expect(checksum(fileLayout)).toBe(1928);
  });

  test("calculates a checksum based on a non-compacted fileLayout", () => {
    const fileLayout = "00992111777.44.333....5555.6666.....8888..".split("");
    expect(checksum(fileLayout)).toBe(2858);
  });
});

describe("readDiskMap", () => {
  test("should convert a diskmap into a filelayout", () => {
    const diskmap = "12345";
    const fileLayout = readDiskMap(diskmap);
    expect(fileLayout).toEqual("0..111....22222".split(""));

    const diskmap2 = "2333133121414131402";
    const fileLayout2 = readDiskMap(diskmap2);
    expect(fileLayout2).toEqual(
      "00...111...2...333.44.5555.6666.777.888899".split("")
    );
  });
});

describe("compact", () => {
  test("should return already compacted disks", () => {
    const fileLayout = "0111".split("");
    const compactedDisk = compact(fileLayout);

    expect(compactedDisk).toEqual("0111".split(""));
  });
  test("should iteratively move rightmost file to the left most free space blocks", () => {
    const fileLayout = "0..111....22222".split("");
    const compactedDisk = compact(fileLayout);

    expect(compactedDisk).toEqual("022111222......".split(""));
  });
});

describe("isFileLayoutCompacted", () => {
  test("should detected when a filelayout is not compacted", () => {
    const isCompacted = isFilelayoutCompacted("0..111....22222".split(""));

    expect(isCompacted).toBe(false);
  });

  test("should detected when a filelayout is compacted", () => {
    const isCompacted = isFilelayoutCompacted("022111222......".split(""));

    expect(isCompacted).toBe(true);
  });
});
