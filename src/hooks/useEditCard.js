import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const useEditCard = () => {
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
    navigate(`${ROUTES.EDIT}/${ev.target.id}`);
  };
};

export default useEditCard;
