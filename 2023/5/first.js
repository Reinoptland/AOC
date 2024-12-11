function first(textFile) {
  const lines = textFile.split("\n\n");

  let [seeds, ...maps] = lines;

  function parseNumbers(line) {
    return line
      .split(":\n")[1]
      .split("\n")
      .map((line) => line.split(" ").map((number) => parseInt(number)));
  }

  seeds = seeds
    .split(": ")[1]
    .split(" ")
    .map((number) => parseInt(number));

  const [
    seedsToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ] = maps.map((line) => parseNumbers(line));

  return Math.min(
    ...mapToRanges(
      mapToRanges(
        mapToRanges(
          mapToRanges(
            mapToRanges(
              mapToRanges(mapToRanges(seeds, seedsToSoil), soilToFertilizer),
              fertilizerToWater
            ),
            waterToLight
          ),
          lightToTemperature
        ),
        temperatureToHumidity
      ),
      humidityToLocation
    )
  );
}

function mapToRanges(numbers, ranges) {
  return numbers.map((number) => {
    const matchingRange = ranges.find((range) => {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = range;
      return (
        sourceRangeStart <= number &&
        sourceRangeStart + rangeLength - 1 >= number
      );
    });

    if (!matchingRange) return number;

    const [destination, source, rangeLength] = matchingRange;
    const offset = destination - source;
    return number + offset;
  });
}

module.exports = { mapToRanges, first };
