import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import Plane from "../constant/constant";
import { locationUtils } from "../utils/locationUtils";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import { LatLngExpression } from "leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
type PlanesProps = {
  location: [number, number];
  lat: number;
  lng: number;
  flag: string;
  alt: string;
  speed: string;
  flight_number: string;
  status: string;
  airline_icao: string;
  direction: number;
  id: number;
};

const Planes = (props: PlanesProps) => {
  const {
    location,
    lat,
    lng,
    alt,
    flag,
    speed,
    flight_number,
    status,
    airline_icao,
    direction,
    id,
  } = props;

  const markerRef: React.Ref<any> = useRef();

  const [isCopied, setIsCopied] = useState(false);
  const link = locationUtils(lat, lng);

  const HandleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(link);
  };

  return (
    /* <LeafletTrackingMarker
        icon={Plane}
        ref={markerRef}
        position={[lat, lng]}
        previousPosition={prevPos as LatLngExpression}
        duration={1000}
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
      </LeafletTrackingMarker> */
    <ReactLeafletDriftMarker
      icon={Plane}
      ref={markerRef}
      position={location}
      duration={2000}
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
    </ReactLeafletDriftMarker>
  );
};

export default Planes;
