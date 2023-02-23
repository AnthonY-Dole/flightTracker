import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { CustomizedSlider } from "./Slider";
import AirIcon from "@mui/icons-material/Air";
import HeightIcon from "@mui/icons-material/Height";
import InfoIcon from "@mui/icons-material/Info";
type DetailProps = {
  selectedPlane: any;
  selectPlane: any;
  open: boolean;
};

const Detail = (props: DetailProps) =>
  useMemo(() => {
    const { selectedPlane, open } = props;
    if (!selectedPlane) {
      return null;
    }

    return (
      <>
        {open ? (
          <Box
            sx={{
              zIndex: 1000,
              position: "absolute",
              top: 200,
              left: 15,
            }}
          >
            <Card
              sx={{
                width: 285,

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <CardMedia
                  component="img"
                  image="https://fakeimg.pl/250x150/?text=planeImage&font=lobster"
                  alt="plane"
                  sx={{
                    display: "flex",
                    width: 250,
                    height: 150,
                    borderRadius: "20px",
                  }}
                />
                <Box
                  sx={{
                    justifyContent: "space-between",
                    display: "flex",
                    marginTop: 3,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography component="p">From</Typography>
                      <Box
                        component="span"
                        sx={{
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                          backgroundColor: "#7AD69F",
                          display: "flex",
                          borderShadow: "0 0 0 1px #fff",
                          marginLeft: 4,
                          marginTop: 0.5,
                        }}
                      ></Box>
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        color: "#183566",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedPlane?.dep_icao || "N/A"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      src={`https://flagsapi.com/${selectedPlane?.flag}/flat/64.png`}
                      width={30}
                      alt="drapeau"
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography
                        component="p"
                        sx={{
                          marginRight: 4,
                        }}
                      >
                        To
                      </Typography>
                      <Box
                        component="span"
                        sx={{
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                          backgroundColor: "#F4783F",
                          display: "flex",
                          borderShadow: "0 0 0 1px #fff",
                          marginLeft: 1,
                          marginTop: 0.5,
                        }}
                      ></Box>
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        color: "#183566",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedPlane?.arr_icao || "N/A"}
                    </Typography>
                  </Box>
                </Box>
                <CustomizedSlider
                  value={50}
                  label="Time to destination:"
                  disabled={false}
                />

                <Box
                  sx={{
                    justifyContent: "space-between",
                    display: "flex",
                    marginTop: 3,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <HeightIcon sx={{ marginLeft: 2 }} />
                    </Box>

                    <Typography
                      sx={{
                        color: "#183566",
                      }}
                    >
                      {selectedPlane?.alt} ft
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <InfoIcon sx={{ marginLeft: 2.5 }} />
                    </Box>

                    <Typography
                      sx={{
                        color: "#183566",
                      }}
                    >
                      {selectedPlane?.status}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <AirIcon sx={{ marginLeft: 3 }} />
                    </Box>

                    <Typography
                      sx={{
                        color: "#183566",
                      }}
                    >
                      {selectedPlane?.speed} km/h
                    </Typography>
                  </Box>
                </Box>

                <div className="">
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
  }, [props]);

export default Detail;
