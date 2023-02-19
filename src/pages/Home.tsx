import React, { useEffect, useRef, useState } from "react";
import Map from "../Components/Map";
import CustomAppBar from "../Components/AppBar";
import Detail from "../Components/Detail";
import { useMapEvent } from "react-leaflet";
import { getAPI } from "../utils/api";
const { VITE_APP_API_KEY_AIRLABS } = import.meta.env;
import { getPlanesbyBounds } from "../services/api";

const Home = () => {
  const [allPlanes, setAllPlanes] = useState<Array<any>>([]);
  const [selectedPlane, setSelectedPlane] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const mapRef = useRef<L.Map>(null);
  const getPlanesbyBoundss = (bounds: L.LatLngBounds) => {
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

  const selectPlane = (id: any, isOpen: boolean) => {
    setOpen(isOpen);
    setSelectedPlane(allPlanes[id]);
  };

  const UserBounds = () => {
    const mapMove = useMapEvent("moveend", () => {
      getPlanesbyBoundss(mapMove.getBounds());
    });
    const mapZoom = useMapEvent("zoomend", () => {
      getPlanesbyBoundss(mapZoom.getBounds());
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
      <Detail
        selectedPlane={selectedPlane}
        selectPlane={selectPlane}
        open={open}
      />
      <Map
        Content={UserBounds}
        planes={allPlanes}
        ref={mapRef}
        selectedPlane={selectedPlane}
        selectPlane={selectPlane}
        open={open}
      />
    </>
  );
};

export default Home;
