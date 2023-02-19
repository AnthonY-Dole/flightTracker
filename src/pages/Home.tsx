import React, { useEffect, useState } from "react";
import Map from "../Components/Map";
import CustomAppBar from "../Components/AppBar";
import Detail from "../Components/Detail";

const Home = () => {
  return (
    <>
      <CustomAppBar />
      <Detail />
      <Map />
    </>
  );
};

export default Home;
