import { InputFormat, Location } from "./input-format.model.ts";
import { OutputFormat } from "./output-format.model.ts";
import {
  computeDrivingTime,
  computeHyperloopRouteTravelTime,
  getLocationFromName,
  getRandomHyperloopRoute,
} from "./util.ts";

export function solve(input: InputFormat): OutputFormat {
  let foundPossibleRoute: Location[] = [];

  while (foundPossibleRoute.length === 0) {
    const randomRoute = getRandomHyperloopRoute(
      input.locations,
      input.maximumRouteLength,
    );

    if (randomRoute.length >= 2) {
      // console.log(`randomRoute: ${randomRoute.map((l) => l.name).join(" ")}`);
      // console.log(
      //   `randomRoute_distance: ${computeHyperloopRouteDistance(randomRoute)}`,
      // );

      const numberOfFasterJourneys: number = input.journeys.filter((j) => {
        const journeyStart: Location = getLocationFromName(
          j.startLocationName,
          input.locations,
        );
        const journeyEnd: Location = getLocationFromName(
          j.endLocationName,
          input.locations,
        );

        let fasterFound = false;

        for (let i = 0; i < randomRoute.length - 1; i++) {
          const partialRoute: Location[] = randomRoute.slice(
            i,
            randomRoute.length,
          );
          const isFaster: boolean = isHyperloopFasterThanExisting(
            journeyStart,
            journeyEnd,
            j.currentTime,
            partialRoute,
          );

          if (isFaster) {
            fasterFound = true;
            break;
          }
        }

        // console.log(
        //   `fasterFound: ${fasterFound} - ${j.startLocationName} - ${j.endLocationName} - ${j.currentTime}`,
        // );

        return fasterFound;
      }).length;

      // console.log(`numberOfFasterJourneys: ${numberOfFasterJourneys}`);

      if (numberOfFasterJourneys >= input.neededFasterJourneys) {
        foundPossibleRoute = randomRoute;
      }
    }
  }

  return {
    numberOfHyperloopLocations: foundPossibleRoute.length,
    hyperloopLocationNames: foundPossibleRoute.map((l) => l.name),
  };
}

function isHyperloopFasterThanExisting(
  journeyStart: Location,
  journeyEnd: Location,
  journeyCurrentTime: number,
  hyperloopLocations: Location[],
): boolean {
  const journeyTime = getJourneyTime(
    journeyStart,
    journeyEnd,
    hyperloopLocations,
  );
  const journeyTimeReverse = getJourneyTime(
    journeyEnd,
    journeyStart,
    hyperloopLocations,
  );

  // console.log(
  //   `journeyTime: ${Math.min(journeyTime, journeyTimeReverse)} - ${
  //     hyperloopLocations.map((l) => l.name)
  //   }`,
  // );

  return Math.min(journeyTime, journeyTimeReverse) < journeyCurrentTime;
}

function getJourneyTime(
  journeyStart: Location,
  journeyEnd: Location,
  hyperloopLocations: Location[],
): number {
  const hyperloopTravelTime: number = computeHyperloopRouteTravelTime(
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
