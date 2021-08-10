import { InputFormat, Journey, Location } from "./input-format.model.ts";

export function parseInput(filePath: string): InputFormat {
  const fileContent: string = Deno.readTextFileSync(filePath);

  const lines: string[] = fileContent.split("\n").map((s) => s.trim());

  const numberOfLocations: number = parseInt(lines[0], 10);
  const numberOfJourneys: number = parseInt(lines[numberOfLocations + 1], 10);

  const locations: Location[] = lines.slice(
    1,
    numberOfLocations + 1,
  ).map((s) => parseLocationFromString(s));
  const journeys: Journey[] = lines.slice(
    numberOfLocations + 2,
    numberOfLocations + numberOfJourneys + 2,
  ).map((s) => parseJourneyStopFromString(s));

  const neededFasterJourneys: number = parseInt(
    lines[numberOfLocations + numberOfJourneys + 2],
    10,
  );
  const maximumRouteLength: number = parseInt(
    lines[numberOfLocations + numberOfJourneys + 3],
    10,
  );

  return {
    numberOfLocations,
    locations,
    numberOfJourneys,
    journeys,
    neededFasterJourneys,
    maximumRouteLength,
  };
}

function parseLocationFromString(line: string): Location {
  const parts: string[] = line.split(" ");

  return {
    name: parts[0],
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
