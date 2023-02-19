export interface Plane {
  hex: string;
  reg_number: string;
  flaf: string;
  lat: number;
  lon: number;
  alt: number;
  dir: number;
  speed: number;
  v_speed: number;
  squawk: string;
  flight_number: string;
  flight_icao: string;
  flight_iata: string;
  dep_icao: string;
  dep_iata: string;
  arr_icao: string;
  arr_iata: string;
  airline_icao: string;
  airline_iata: string;
  aircraft_icao: string;
  updated: number;
  status: string;
  icao24: string;
}
