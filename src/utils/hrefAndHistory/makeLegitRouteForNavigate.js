const makeLegitRouteForNavigate = (href) => {
  let arr = href.split("/");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "localhost:3000") {
      return `/${arr[i + 1]}`;
    }
  }
};

export default makeLegitRouteForNavigate;
