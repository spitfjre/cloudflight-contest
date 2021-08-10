export interface InputFormat {
  numberOfLocations: number;
  stops: Stop[];
  numberOfJourneys: number;
  journeys: Journey[];
  numberOfHyperloopConnections: number;
}

export interface Journey {
  startLocationName: string;
  endLocationName: string;
  currentTime: number;
}

export interface Stop {
  locationName: string;
  x: number;
  y: number;
}
