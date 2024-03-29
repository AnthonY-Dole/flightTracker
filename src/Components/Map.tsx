import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMapEvent,
  Polyline,
} from "react-leaflet";
import L, { map } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { forwardRef } from "react";
import SearchUserLocalisation from "../Components/SearchUserLocation";
import Plane from "./Plane";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
const { VITE_APP_API_KEY_MAP_BOX, VITE_APP_API_MAP_BOX } = import.meta.env;

type MapProps = {
  Content: React.FC;
  planes: Array<any>;
  selectedPlane: any;
  selectPlane: (id: any, isOpen: boolean) => void;
  open: boolean;
};
const Map = forwardRef<L.Map, MapProps>((props, ref) => {
  const { Content, planes, selectedPlane, selectPlane, open } = props;

  // const UserMove = () => {
  //   const map = useMapEvent("moveend", () => {
  //     setBounds(map.getBounds());

  //     allPlanes.map((x: any) => {
  //       if (bounds.contains([x.lat, x.lng]) && !planesBounds.includes(x)) {
  //         setPlanesBounds((prev: any) =>
  //           [...prev, x].filter((x) => x !== null)
  //         );
  //       }
  //     });
  //   });
  //   return null;
  // };
  //const Mapref = useRef<L.Map>(null);

  const allPlane: ReactJSXElement[] = planes
    ?.filter(
      (p: any) =>
        p.hex !== null && p.status !== "landed" && p.status !== "unknown"
    )
    .map((x: any, index) => {
      return (
        <Plane
          key={x.hex}
          id={index}
          lat={x.lat}
          lng={x.lng}
          location={[x.lat, x.lng]}
          alt={x.alt}
          direction={x.dir}
          speed={x.speed}
          flight_number={x.flight_number}
          status={x.status}
          airline_icao={x.airline_icao}
          flag={x.flag}
          selectPlane={selectPlane}
          open={open}
        />
      );
    });

  return (
    <MapContainer
      ref={ref}
      preferCanvas={true}
      center={[48.856614, 2.3522219]}
      boundsOptions={{ padding: [50, 50] }}
      zoom={8}
      minZoom={4}
      maxZoom={18}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={0.7}
      dragging={true}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100vh" }}
      zoomControl={true}
    >
      <TileLayer
        url={`${VITE_APP_API_MAP_BOX}?access_token=${VITE_APP_API_KEY_MAP_BOX}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <SearchUserLocalisation />

      <Content />
      {/* <MarkerClusterGroup chunkedLoading removeOutsideVisibleBounds> */}
      {allPlane}
      {/* </MarkerClusterGroup> */}
    </MapContainer>
  );
});

export default Map;
