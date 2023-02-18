import PlaneSVG from "../assets/plane.svg";
import * as L from "leaflet";

const Plane = new L.Icon({
  iconUrl: PlaneSVG,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
});

export default Plane;
