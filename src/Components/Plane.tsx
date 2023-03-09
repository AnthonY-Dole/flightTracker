import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup, Tooltip, Polyline } from "react-leaflet";
import PlaneIcon from "../constant/constant";
import { locationUtils } from "../utils/locationUtils";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import { LatLngExpression } from "leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
type PlaneProps = {
  key: string;
  location: [number, number];
  lat: number;
  lng: number;
  flag: string;
  alt: string;
  speed: string;
  reg_number?: string;
  flight_number: string;
  status: string;
  airline_icao: string;
  direction: number;
  id: number;
  selectPlane: (id: any, isOpen: boolean) => void;
  open: boolean;
};

const Plane = (props: PlaneProps) => {
  const {
    location,
    lat,
    lng,
    alt,
    flag,
    speed,
    flight_number,
    status,
    reg_number,
    airline_icao,
    direction,
    selectPlane,
    open,
    id,
  } = props;

  const markerRef: React.Ref<any> = useRef();
  const [prevPos, setPrevPos] = useState([lat, lng]);
  const [isCopied, setIsCopied] = useState(false);
  const link = locationUtils(lat, lng);

  const HandleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  return (
    <LeafletTrackingMarker
      icon={PlaneIcon}
      ref={markerRef}
      position={[lat, lng]}
      previousPosition={prevPos as LatLngExpression}
      duration={20000}
      eventHandlers={{
        click: () => {
          selectPlane(id, true);
          markerRef.current.openPopup();
        },
        dblclick: () => {
          selectPlane(id, false);
          markerRef.current.closePopup();
        },
      }}
    >
      <Tooltip>
        {airline_icao && flight_number ? (
          <>
            {airline_icao}
            {flight_number}
          </>
        ) : (
          <>{reg_number}</>
        )}
      </Tooltip>
    </LeafletTrackingMarker>
    /* <ReactLeafletDriftMarker
      icon={Plane}
      ref={markerRef}
      position={location}
      duration={2000}
      eventHandlers={{ click: () => markerRef.current.openPopup() }}
    >
      <Popup>
        <div className="">
          <h2 className="">Altitude: {alt} ft</h2>
          <p className="">Speed: {speed} km/h</p>
        </div>
        <div className="">
          <img src={flag} alt="drapeau" className="" />
          <h5 className="">
            Flight Number: {flight_number}
            Status: {status}
          </h5>
          <p>Airline: {airline_icao}</p>

          <button className="" onClick={(e) => HandleCopy()}>
            {isCopied ? (
              <>
                <h5 className="">Link Copied!!</h5>
              </>
            ) : (
              <>
                <h5 className="">Copy link</h5>
              </>
            )}
          </button>
        </div>
      </Popup>
      <Tooltip>{flight_number}</Tooltip>
    </ReactLeafletDriftMarker>*/
  );
};

export default Plane;
