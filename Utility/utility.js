import { ALLOWED_ORIGINS } from "../Constants/constants.js";

export function originControl(req, res) {
  let responseObj;
  let origin = req.header("Origin");
  if (ALLOWED_ORIGINS.indexOf(origin) > -1) {
    responseObj = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    responseObj = {
      origin: false,
      optionSuccessStatus: 403,
    };
  }
  res(null, responseObj);
}
