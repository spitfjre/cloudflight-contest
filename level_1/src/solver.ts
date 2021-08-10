import { InputFormat, Stop } from "./input-format.model.ts";
import { OutputFormat } from "./output-format.model.ts";

const SPEED: number = 250;
const WAIT: number = 200;

export function solve(input: InputFormat): OutputFormat {
  const start: Stop = input.stops.find((s) =>
    s.locationName === input.startLocationName
  )!;
  const end: Stop = input.stops.find((s) =>
    s.locationName === input.endLocationName
  )!;

  const distance: number = getDistance(start, end);
  const travelTime: number = Math.round(distance / SPEED + WAIT);

  return { travelTime };
}

function getDistance(stop1: Stop, stop2: Stop): number {
  return Math.sqrt(
    Math.pow(stop2.x - stop1.x, 2) + Math.pow(stop2.y - stop1.y, 2),
  );
}
