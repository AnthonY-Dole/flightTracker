const data = [
  {
    lat: 22.2974883,
    lng: 73.2067383,
    speed: 17.2786,
  },
  {
    lat: 22.2980199,
    lng: 73.20671,
    speed: 11.8791,
  },
];

const findClosest = (lat: number, lng: number, data) => {
  let min = Infinity;
  let closest;
  for (let i = 0; i < data.length; i++) {
    const d = distance(lat, lng, data[i].lat, data[i].lng);
    if (d < min) {
      min = d;
      closest = data[i];
    }
  }
  return closest;
};
function distance(lat: any, lng: any, lat1: any, lng1: any) {
  const R = 6371e3; // metres
  const φ1 = (lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat1 * Math.PI) / 180;
  const Δφ = ((lat1 - lat) * Math.PI) / 180;
  const Δλ = ((lng1 - lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

const closest = findClosest(22.2974883, 73.2067383, data);

console.log(closest);
