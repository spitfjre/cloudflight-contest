export interface InputFormat {
  numberOfLocations: number;
  stops: Stop[];
  startLocationName: string;
  endLocationName: string;
}

export interface Stop {
  locationName: string;
  x: number;
  y: number;
}
