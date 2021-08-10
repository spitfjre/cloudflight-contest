export interface InputFormat {
  numberOfLocations: number;
  locations: Location[];
  numberOfJourneys: number;
  journeys: Journey[];
  neededFasterJourneys: number;
  maximumRouteLength: number;
}

export interface Journey {
  startLocationName: string;
  endLocationName: string;
  currentTime: number;
}

export interface Location {
  name: string;
  x: number;
  y: number;
}
