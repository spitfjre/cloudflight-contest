export interface InputFormat {
  numberOfLocations: number;
  locations: Location[];
  journey: Journey;
  numberOfHyperloopLocations: number;
  hyperloopLocationNames: string[];
}

export interface Journey {
  startLocationName: string;
  endLocationName: string;
}

export interface Location {
  name: string;
  x: number;
  y: number;
}
