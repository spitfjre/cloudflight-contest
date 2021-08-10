import { Location } from "./input-format.model.ts";

const DRIVING_SPEED = 15;
const SPEED: number = 250;
const WAIT: number = 200;

export function getLocationFromName(
  locationName: string,
  locations: Location[],
): Location {
  return locations.find((l) => l.name === locationName)!;
}

export function getRandomHyperloopRoute(
  locations: Location[],
  maximumRouteLength: number,
) {
  let route: Location[] = [];

  while (
    computeHyperloopRouteDistance(route) < maximumRouteLength &&
    route.length < 100
  ) {
    const randomLocation: Location = getRandomLocation(locations);

    if (!route.some((l) => l.name === randomLocation.name)) {
      route = route.concat(randomLocation);
    }
  }

  if (computeHyperloopRouteDistance(route) > maximumRouteLength) {
    return route.slice(0, route.length - 1);
  } else {
    return route;
  }
}

export function getRandomLocation(locations: Location[]): Location {
  const randomIndex: number = Math.round(
    Math.random() * (locations.length - 1),
  );
  return locations[randomIndex];
}

export function computeDrivingTime(start: Location, end: Location): number {
  return getDistance(start, end) / DRIVING_SPEED;
}

export function computeHyperloopRouteDistance(locations: Location[]): number {
  return locations
    .map((l, i, arr) =>
      getDistance(
        l,
        arr[Math.min(i + 1, arr.length - 1)],
      )
    )
    .reduce((prev, curr) => prev + curr, 0);
}

export function computeHyperloopRouteTravelTime(locations: Location[]): number {
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

export function getDistance(location1: Location, location2: Location): number {
  return Math.sqrt(
    Math.pow(location2.x - location1.x, 2) +
      Math.pow(location2.y - location1.y, 2),
  );
}
