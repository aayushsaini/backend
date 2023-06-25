import { ALLOWED_ORIGINS } from "./server.config.js";

/**
 * Function for CORS middleware to check if origin is allowed to access the server
 * @returns {function}
 */
export const originControl = (req, res) => {
  let responseObj;
  let origin = req.header("Origin");
  // console.log('>>',req.header("origin"));
  if (ALLOWED_ORIGINS.indexOf(origin) > -1) {
    responseObj = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    // console.log("Restricted cross origin access attempted from: ", origin);
    responseObj = {
      origin: false,
    };
  }
  res(null, false);
};
