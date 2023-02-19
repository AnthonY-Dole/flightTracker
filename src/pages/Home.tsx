import React, { useEffect, useRef, useState } from "react";
import Map from "../Components/Map";
import CustomAppBar from "../Components/AppBar";
import Detail from "../Components/Detail";
import { useMapEvent } from "react-leaflet";
import { getAPI } from "../api";
const { VITE_APP_API_KEY_AIRLABS } = import.meta.env;

const Home = () => {
  const [allPlanes, setAllPlanes] = useState<Array<any>>([]);
  const mapRef = useRef<L.Map>(null);
  const getPlanesbyBounds = (bounds: L.LatLngBounds) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      //  if (mapRef.current) getPlanesbyBounds(mapRef.current.getBounds());
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CustomAppBar />
      <Detail />
      <Map Content={UserBounds} planes={allPlanes} ref={mapRef} />
    </>
  );
};

export default Home;
