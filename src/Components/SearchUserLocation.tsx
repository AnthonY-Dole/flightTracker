import { useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet.locatecontrol";
import L from "leaflet";
const SearchUserLocalisation = () => {
  const map = useMap();

  useEffect(() => {
    const lc = L.control
      .locate({
        drawCircle: true,

        onLocationError: (err) => {
          console.log(err.message);
        },

        strings: {
          title: "Vous etes Ici",
          popup: "Vous etes {distance} {unit} de ce point",
          outsideMapBoundsMsg:
            "Vous n'est pas dans la zone de la carte, mais nous avons quand meme trouvé votre position",
        },
        locateOptions: {
          maxZoom: 18,
          watch: true,
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 10000,
        },
      })
      .addTo(map);
    return () => {
      lc.remove();
    };
  }, [map]);
  return null;
};

export default SearchUserLocalisation;
