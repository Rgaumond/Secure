const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

// Read environment variables from "testenv". Override environment vars if they are already set. https://www.npmjs.com/package/dotenv
const TESTENV = path.resolve(__dirname, "testenv");
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}

var ISSUER = process.env.ISSUER || "https://rg-esolv.okta.com/oauth2/default";
var CLIENT_ID = process.env.CLIENT_ID || "0oa6v08nwgZnyF13Y697";
var CLIENT_SECRET =
  process.env.CLIENT_SECRET ||
  "Fj7DWjy5yWMYw3CYZPZv1ZFF4uM3GJjL-yl_hcW1Dma2nTVvEbSdKvppqI4t0aBO";
var SPA_CLIENT_ID = process.env.SPA_CLIENT_ID || "0oa6tbv8lhpY8YLFg697";
var OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK
  ? true
  : false;

module.exports = {
  webServer: {
    port: 3441,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: "https://wic_oidc_secure.esolv.ca",
      scope: "openid profile email",
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
      },
    },
  },
  resourceServer: {
    port: 8000,
    oidc: {
      clientId: SPA_CLIENT_ID,
      issuer: ISSUER,
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
      },
    },
    assertClaims: {
      aud: "api://default",
      cid: SPA_CLIENT_ID,
    },
  },
};
