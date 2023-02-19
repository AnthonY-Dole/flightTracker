import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMapEvent,
  Polyline,
} from "react-leaflet";
import L, { map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { getAPI } from "../api";
import SearchUserLocalisation from "../Components/SearchUserLocation";
import Planes from "./Planes";
import { Padding, South } from "@mui/icons-material";
const {
  VITE_APP_API_KEY_MAP_BOX,
  VITE_APP_API_MAP_BOX,
  VITE_APP_API_KEY_AIRLABS,
} = import.meta.env;
const Map = () => {
  const [allPlanes, setAllPlanes] = useState<Array<any>>([]);
  // const [bounds, setBounds] = useState<L.LatLngBounds>(
  //   new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(0, 0))
  // );
  const mapRef = useRef<L.Map>(null);

  type Bounds = L.LatLngBounds;

  const getPlanesbyBounds = (bounds: Bounds) => {
    getAPI(
      `flights?api_key=${VITE_APP_API_KEY_AIRLABS}&bbox=${
        bounds.getSouthWest().lat
      },${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${
        bounds.getNorthEast().lng
      }`
    ).then((res) => {
      if (res.status === 200) {
        setAllPlanes(res.data.response);
      } else {
        console.log(res);
      }
    });
  };

  const UserBounds = () => {
    const mapMove = useMapEvent("moveend", () => {
      getPlanesbyBounds(mapMove.getBounds());
    });
    const mapZoom = useMapEvent("zoomend", () => {
      getPlanesbyBounds(mapZoom.getBounds());
    });

    return null;
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      // if (mapRef.current) getPlanesbyBounds(mapRef.current.getBounds());
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      ref={mapRef}
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

      <UserBounds />

      {allPlanes
        ?.filter(
          (p: any) =>
            p.hex !== null && p.status !== "landed" && p.status !== "unknown"
        )
        .map((x: any, index) => (
          <>
            <Planes
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
            />
          </>
        ))}
    </MapContainer>
  );
};

export default Map;
