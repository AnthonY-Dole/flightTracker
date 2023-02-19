import PlaneSVG from "../assets/plane.svg";
import * as L from "leaflet";

const Plane = new L.Icon({
  iconUrl: PlaneSVG,
  iconSize: [30, 30],
  iconAnchor: [25, 25],
  popupAnchor: [0, -15],
});

export default Plane;
