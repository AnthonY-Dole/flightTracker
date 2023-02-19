import axios from "axios";
import { Plane } from "./types";

const { VITE_APP_API_AIRLABS, VITE_APP_API_KEY_AIRLABS } = import.meta.env;
const BASEURL = `${VITE_APP_API_AIRLABS}`;

interface Params {
  baseUrl: string;
  headers: any;
  method: string;
}

const postConfig: Params = {
  baseUrl: BASEURL,
  headers: { Authorization: "" },
  method: "post",
};

const getConfig: Params = {
  baseUrl: BASEURL,
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
  },
  method: "get",
};

const getPlanesbyBounds = (bounds: L.LatLngBounds): Promise<Plane[]> => {
  return axios({
    method: "get",
    headers: getConfig.headers,

    url: `${
      getConfig.baseUrl
    }flights?api_key=${VITE_APP_API_KEY_AIRLABS}&bbox=${
      bounds.getSouthWest().lat
    },${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${
      bounds.getNorthEast().lng
    }`,
  }).then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  });
};

export { getPlanesbyBounds };
