import { InputFormat, Journey, Location } from "./input-format.model.ts";

export function parseInput(filePath: string): InputFormat {
  const fileContent: string = Deno.readTextFileSync(filePath);

  const lines: string[] = fileContent.split("\n").map((s) => s.trim());

  const numberOfLocations: number = parseInt(lines[0], 10);

  const locations: Location[] = lines.slice(
    1,
    numberOfLocations + 1,
  ).map((s) => parseLocationFromString(s));
  const journey: Journey = parseJourneyStopFromString(
    lines[numberOfLocations + 1],
  );

  const hyperloopStrings: string[] = lines[numberOfLocations + 2].split(" ");
  const numberOfHyperloopLocations: number = parseInt(hyperloopStrings[0], 10);
  const hyperloopLocationNames: string[] = hyperloopStrings.slice(
    1,
    hyperloopStrings.length,
  );

  return {
    numberOfLocations,
    locations,
    journey,
    numberOfHyperloopLocations,
    hyperloopLocationNames,
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
  };
}
