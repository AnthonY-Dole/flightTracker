import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

type DetailProps = {};

const Detail = ({}: DetailProps) => {
  return (
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
          <Typography variant="h5" component="div">
            Word of the Day
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Detail;
