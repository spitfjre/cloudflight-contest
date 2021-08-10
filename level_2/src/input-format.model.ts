export interface InputFormat {
  numberOfLocations: number;
  stops: Stop[];
  journeyStartLocationName: string;
  journeyEndLocationName: string;
  startLocationName: string;
  endLocationName: string;
}

export interface Stop {
  locationName: string;
  x: number;
  y: number;
}
