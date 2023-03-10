import React, { useEffect, useMemo, useRef, useState } from "react";
import Map from "../Components/Map";
import CustomAppBar from "../Components/AppBar";
import CardDetail from "../Components/CardDetail";
import { useMapEvent } from "react-leaflet";
import { getAPI } from "../utils/api";
const { VITE_APP_API_KEY_AIRLABS } = import.meta.env;
import { getPlanesbyBounds } from "../services/api";
let interval = 0;
const Home = () => {
  const [allPlanes, setAllPlanes] = useState<Array<any>>([]);
  const [selectedPlane, setSelectedPlane] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [activated, setActivated] = useState(false);

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

  /*const updatePlanes = useMemo(() => {
    if (activated && mapRef.current) {
      const intervals = setInterval(() => {
        console.log(activated);
        //getPlanesbyBoundss(mapRef.current?.getBounds() as L.LatLngBounds);
      }, 3000);
      return () => clearInterval(intervals);
    }
  }, [activated]);

  useEffect(() => {}, [activated]);
  */
  useEffect(() => {
    if (activated && mapRef.current) {
      interval = setInterval(() => {
        getPlanesbyBoundss(mapRef.current?.getBounds() as L.LatLngBounds);
      }, 20000);
    }
    return () => clearInterval(interval);
  }, [activated]);

  return (
    <>
      <CustomAppBar
        activate={activated}
        setActivate={(activate: boolean) => {
          setActivated(activate);
          clearInterval(interval);
        }}
      />
      <CardDetail
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
