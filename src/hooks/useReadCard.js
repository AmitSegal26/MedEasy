import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const useReadCard = () => {
  const navigate = useNavigate();
  return (ev) => {
    if (!ev) {
      return;
    }
    if (ev && !ev.target) {
      return;
    }
    if (ev && ev.target && !ev.target.id) {
      return;
    }
    navigate(`${ROUTES.SPECIFICPRODUCT}/${ev.target.id}`);
  };
};

export default useReadCard;
