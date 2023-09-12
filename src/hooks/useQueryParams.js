import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  let [searchParams] = useSearchParams();
  let query = {};
  for (const [key, value] of searchParams) {
    query[key] = value;
  }
  if (Object.keys(query).length === 0) {
    return;
  }
  return query;
};

export default useQueryParams;
