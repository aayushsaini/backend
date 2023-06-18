import { ALLOWED_ORIGINS } from "./server.config.js";

export const originControl = (req, res) => {
  let responseObj;
  let origin = req.header("Origin");
  console.log(req.header("Origin"));
  if (ALLOWED_ORIGINS.indexOf(origin) > -1) {
    console.log('in')
    responseObj = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    console.log("out");
    responseObj = {
      origin: false,
    };
  }
  res(null, responseObj);
};
