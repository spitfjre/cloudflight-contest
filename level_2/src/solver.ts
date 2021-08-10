import { InputFormat, Stop } from "./input-format.model.ts";
import { OutputFormat } from "./output-format.model.ts";

const DRIVING_SPEED = 15;
const SPEED: number = 250;
const WAIT: number = 200;

export function solve(input: InputFormat): OutputFormat {
  const hyperloopStart: Stop = input.stops.find((s) =>
    s.locationName === input.startLocationName
  )!;
  const hyperloopEnd: Stop = input.stops.find((s) =>
    s.locationName === input.endLocationName
  )!;

  const hyperloopTravelTime: number = computeHyperloopTravelTime(
    hyperloopStart,
    hyperloopEnd,
  );
  const drivingTime: number = computeDrivingTime(
    input,
    hyperloopStart,
    hyperloopEnd,
  );

  return { journeyTime: Math.round(hyperloopTravelTime + drivingTime) };
}

function computeDrivingTime(
  input: InputFormat,
  hyperloopStart: Stop,
  hyperloopEnd: Stop,
): number {
  const journeyStart: Stop = input.stops.find((s) =>
    s.locationName === input.journeyStartLocationName
  )!;
  const journeyEnd: Stop = input.stops.find((s) =>
    s.locationName === input.journeyEndLocationName
  )!;

  const journeyStartDistanceToHyperloopStart: number = getDistance(
    journeyStart,
    hyperloopStart,
  );
  const journeyStartDistanceToHyperloopEnd: number = getDistance(
    journeyStart,
    hyperloopEnd,
  );

  if (
    journeyStartDistanceToHyperloopStart > journeyStartDistanceToHyperloopEnd
  ) {
    return (journeyStartDistanceToHyperloopEnd +
      getDistance(journeyEnd, hyperloopStart)) / DRIVING_SPEED;
  } else {
    return (journeyStartDistanceToHyperloopStart +
      getDistance(journeyEnd, hyperloopEnd)) / DRIVING_SPEED;
  }
}

function computeHyperloopTravelTime(
  hyperloopStart: Stop,
  hyperloopEnd: Stop,
): number {
  const distance: number = getDistance(hyperloopStart, hyperloopEnd);

  return distance / SPEED + WAIT;
}

function getDistance(stop1: Stop, stop2: Stop): number {
  return Math.sqrt(
    Math.pow(stop2.x - stop1.x, 2) + Math.pow(stop2.y - stop1.y, 2),
  );
}
