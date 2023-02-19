import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

type DetailProps = {
  selectedPlane: any;
  selectPlane: any;
  open: boolean;
};

const Detail = (props: DetailProps) => {
  const { selectedPlane, open } = props;

  return (
    <>
      {open ? (
        <Box
          sx={{
            zIndex: 1000,
            position: "absolute",
            top: 200,
            left: 10,
          }}
        >
          <Card
            sx={{
              width: 275,
              height: 275,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent>
              <div className="">
                <h2 className="">Altitude: {selectedPlane?.alt} ft</h2>
                <p className="">Speed: {selectedPlane?.speed} km/h</p>
              </div>
              <div className="">
                <img
                  src={`https://flagsapi.com/${selectedPlane?.flag}/flat/64.png`}
                  alt="drapeau"
                  className=""
                />
                <h5 className="">
                  Flight Number: {selectedPlane?.flight_number}
                  Status: {selectedPlane?.status}
                </h5>
                <p>Airline: {selectedPlane?.airline_icao}</p>

                {/* <button className="" onClick={(e) => HandleCopy()}>
              {isCopied ? (
                <>
                  <h5 className="">Link Copied!!</h5>
                </>
              ) : (
                <>
                  <h5 className="">Copy link</h5>
                </>
              )}
            </button> */}
              </div>
            </CardContent>
          </Card>
        </Box>
      ) : null}
    </>
  );
};

export default Detail;
