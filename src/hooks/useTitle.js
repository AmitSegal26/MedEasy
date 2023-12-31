import { useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import makeTitle from "../utils/makeATitle";

const useTitle = () => {
  const locationOfRRD = useLocation();
  return (newTitle) => {
    if (!newTitle) {
      if (!locationOfRRD) {
        return;
      }
      document.title =
        locationOfRRD.pathname == ROUTES.HOME
          ? `MedEasy ${makeTitle(locationOfRRD.pathname.split("/")[1])}`
          : locationOfRRD.pathname.includes(ROUTES.SPECIFICPRODUCT)
          ? `MedEasy`
          : `MedEasy - ${makeTitle(locationOfRRD.pathname.split("/")[1])}`;
    } else {
      document.title = makeTitle(newTitle);
    }
  };
};
export default useTitle;
