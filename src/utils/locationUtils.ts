export const locationUtils = (lat: any, lng: any) => {
  const location = {
    lat: Number.parseFloat(lat).toFixed(4),
    lng: Number.parseFloat(lng).toFixed(4),
  };

  return `http://loacalhost:3000/#16/${location.lat}/${location.lng}`;
};
