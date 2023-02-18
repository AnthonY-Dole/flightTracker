import axios from "axios";
const { VITE_APP_API_AIRLABS } = import.meta.env;

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

export const postAPI = async (url: string, data: any): Promise<any> => {
  return await axios({
    ...postConfig,
    url: `${postConfig.baseUrl}/${url}`,
    data,
  })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const getAPI = async (url: string): Promise<any> => {
  return await axios({
    ...postConfig,
    url: `${postConfig.baseUrl}/${url}`,
  })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};
