import { InputFormat, Journey, Stop } from "./input-format.model.ts";

export function parseInput(filePath: string): InputFormat {
  const fileContent: string = Deno.readTextFileSync(filePath);

  const lines: string[] = fileContent.split("\n").map((s) => s.trim());

  const numberOfLocations: number = parseInt(lines[0], 10);
  const numberOfJourneys: number = parseInt(lines[numberOfLocations + 1], 10);
  const numberOfHyperloopConnections = parseInt(
    lines[numberOfLocations + numberOfJourneys + 2],
    10,
  );

  const stops: Stop[] = lines.slice(
    1,
    numberOfLocations + 1,
  ).map((s) => parseStopFromString(s));
  const journeys: Journey[] = lines.slice(
    numberOfLocations + 2,
    numberOfLocations + numberOfJourneys + 2,
  ).map((s) => parseJourneyStopFromString(s));

  return {
    numberOfLocations,
    stops,
    numberOfJourneys,
    journeys,
    numberOfHyperloopConnections,
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

function parseJourneyStopFromString(line: string): Journey {
  const parts: string[] = line.split(" ");

  return {
    startLocationName: parts[0],
    endLocationName: parts[1],
    currentTime: parseInt(parts[2], 10),
  };
}
