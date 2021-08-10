import { InputFormat, Location } from "./input-format.model.ts";
import { OutputFormat } from "./output-format.model.ts";

const DRIVING_SPEED = 15;
const SPEED: number = 250;
const WAIT: number = 200;

export function solve(input: InputFormat): OutputFormat {
  const journeyStart: Location = getLocationFromName(
    input.journey.startLocationName,
    input.locations,
  );
  const journeyEnd: Location = getLocationFromName(
    input.journey.endLocationName,
    input.locations,
  );
  const hyperloopLocations: Location[] = input.hyperloopLocationNames.map((n) =>
    getLocationFromName(n, input.locations)
  );

  const hyperloopStart: Location = getClosestHyperloopLocationToLocation(
    journeyStart,
    hyperloopLocations,
  );
  const hyperloopStartIndex: number = hyperloopLocations.findIndex((l) =>
    l.name === hyperloopStart.name
  );
  const hyperloopEnd: Location = getClosestHyperloopLocationToLocation(
    journeyEnd,
    hyperloopLocations,
  );
  const hyperloopEndIndex: number = hyperloopLocations.findIndex((l) =>
    l.name === hyperloopEnd.name
  );

  const hyperloopJourneyLocations: Location[] =
    (hyperloopEndIndex > hyperloopStartIndex
      ? hyperloopLocations.slice(
        hyperloopStartIndex,
        hyperloopEndIndex + 1,
      )
      : hyperloopLocations.slice(
        hyperloopEndIndex,
        hyperloopStartIndex + 1,
      )).sort((a, b) =>
        getDistance(journeyStart, a) - getDistance(journeyStart, b)
      );

  const journeyTime: number = getJourneyTime(
    journeyStart,
    journeyEnd,
    hyperloopJourneyLocations,
  );

  return { journeyTime };
}

function getLocationFromName(
  locationName: string,
  locations: Location[],
): Location {
  return locations.find((l) => l.name === locationName)!;
}

function getClosestHyperloopLocationToLocation(
  location: Location,
  hyperloopLocations: Location[],
): Location {
  return hyperloopLocations.reduce((prev, curr) => {
    const prevDistance: number = getDistance(prev, location);
    const currDistance: number = getDistance(curr, location);

    return currDistance < prevDistance ? curr : prev;
  }, hyperloopLocations[0]);
}

function getJourneyTime(
  journeyStart: Location,
  journeyEnd: Location,
  hyperloopLocations: Location[],
): number {
  const hyperloopTravelTime: number = computeHyperloopTravelTime(
    hyperloopLocations,
  );
  const drivingTimeTo: number = computeDrivingTime(
    journeyStart,
    hyperloopLocations[0],
  );
  const drivingTimeFrom: number = computeDrivingTime(
    hyperloopLocations[hyperloopLocations.length - 1],
    journeyEnd,
  );

  return Math.round(drivingTimeTo + hyperloopTravelTime + drivingTimeFrom);
}

function computeDrivingTime(start: Location, end: Location): number {
  return getDistance(start, end) / DRIVING_SPEED;
}

function computeHyperloopTravelTime(locations: Location[]): number {
  return locations
    .map((l, i, arr) =>
      computeHyperloopTravelTimeBetweenStops(
        l,
        arr[Math.min(i + 1, arr.length - 1)],
      )
    )
    .reduce((prev, curr) => prev + curr, -WAIT);
}

function computeHyperloopTravelTimeBetweenStops(
  start: Location,
  end: Location,
): number {
  return getDistance(start, end) / SPEED + WAIT;
}

function getDistance(stop1: Location, stop2: Location): number {
  return Math.sqrt(
    Math.pow(stop2.x - stop1.x, 2) + Math.pow(stop2.y - stop1.y, 2),
  );
}
