import { toast } from "react-toastify";

const handleErrorFromAxios = (
  err,
  defltMsg = "problem with server, try again later",
  forHandlingImage = false
) => {
  if (forHandlingImage) {
    //handle image
    if (err && err.response && err.response.status == 413) {
      toast.error("image file is too large!");
    } else if (err && !err.response) {
      toast.error("image file is too large!");
    } else {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.details &&
        Array.isArray(err.response.data.details)
      ) {
        let errorMessege = "";
        err.response.data.details.forEach((detail) => {
          if (detail && detail.message) {
            errorMessege += `${detail.message}!\n`;
          }
        });
        toast.error(
          <div style={{ whiteSpace: "pre-line", fontWeight: "bold" }}>
            {errorMessege}
          </div>
        );
      } else {
        toast.error(
          `server error ${
            (err &&
              err.response &&
              err.response.data &&
              err.response.data.msg) ||
            defltMsg
          }`
        );
      }
    }
  } else {
    if (
      (err && !err.response) ||
      (err && !err.response.data) ||
      (err && err.response && !err.response.data)
    ) {
      toast.error(
        "problem with server, our staff will take care of it as soon as possible."
      );
      return;
    }
    if (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.details &&
      Array.isArray(err.response.data.details)
    ) {
      err.response.data.details.forEach((detail) => {
        if (detail && detail.message) {
          toast.error(detail.message);
        }
      });
    } else {
      toast.error(
        `server error ${
          (err && err.response && err.response.data && err.response.data.msg) ||
          defltMsg
        }`
      );
    }
  }
};

export default handleErrorFromAxios;
