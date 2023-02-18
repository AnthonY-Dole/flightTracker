import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { getAPI } from "../api";
import SearchUserLocalisation from "../Components/SearchUserLocation";
import Planes from "./Planes";
const {
  VITE_APP_API_KEY_MAP_BOX,
  VITE_APP_API_MAP_BOX,
  VITE_APP_API_KEY_AIRLABS,
} = import.meta.env;
const Map = () => {
  const [allPlanes, setAllPlanes] = useState<Array<any>>([]);
  const mapRef = useRef(null);
  const [bounds, setBounds] = useState<L.LatLngBounds>(
    new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(0, 0))
  );

  const getPlanesbyBounds = () => {
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

  useEffect(() => {
    getPlanesbyBounds();
  }, []);

  // const getPlanes = () => {
  //   getAPI(`flights?api_key=${VITE_APP_API_KEY_AIRLABS}`).then((res) => {
  //     if (res.status === 200) {
  //       setAllPlanes(res.data.response);
  //     } else {
  //       console.log(res);
  //     }
  //   });
  // };

  const UserBounds = () => {
    const map = useMapEvent("moveend", () => {
      setBounds(map.getBounds());
      getPlanesbyBounds();
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
      //getPlanesbyBounds();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // const filterBy = (data: any, filter: string) => {
  //   if (data.length === 0) {
  //     return null;
  //   }
  //   return data
  //     .filter((x: { status: string }) => x.status !== "landed")
  //     .map((x: any) => marker(x));
  // };

  return (
    <MapContainer
      ref={mapRef}
      preferCanvas={true}
      center={[48.856614, 2.3522219]}
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
        ?.filter((p) => p.flight_number !== null && p.lat !== null && p.lng)
        .map((x: any, index) => (
          <Planes
            key={Number(x.flight_number)}
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
        ))}
    </MapContainer>
  );
};

export default Map;
