const { second } = require("./second");

describe("second", () => {
  test("should return the checksum of a defragmented diskmap", () => {
    const diskmap = "2333133121414131402";
    const checksum = second(diskmap);
    expect(checksum).toBe(2858);
  });
});
