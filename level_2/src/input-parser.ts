import { InputFormat, Stop } from "./input-format.model.ts";

export function parseInput(filePath: string): InputFormat {
  const fileContent: string = Deno.readTextFileSync(filePath);

  const lines: string[] = fileContent.split("\n").map((s) => s.trim());

  const numberOfLocations: number = parseInt(lines[0], 10);
  const journeyStartLocationName = lines[numberOfLocations + 1].split(" ")[0]
    .trim();
  const journeyEndLocationName = lines[numberOfLocations + 1].split(" ")[1]
    .trim();
  const startLocationName = lines[numberOfLocations + 2].split(" ")[0].trim();
  const endLocationName = lines[numberOfLocations + 2].split(" ")[1].trim();

  const stops: Stop[] = lines.slice(
    1,
    numberOfLocations + 1,
  ).map((s) => parseStopFromString(s));

  return {
    numberOfLocations,
    stops,
    journeyStartLocationName,
    journeyEndLocationName,
    startLocationName,
    endLocationName,
  };
}

function parseStopFromString(line: string): Stop {
  const parts: string[] = line.split(" ");

  return {
    locationName: parts[0],
    x: parseInt(parts[1], 10),
    y: parseInt(parts[2], 10),
  };
}
