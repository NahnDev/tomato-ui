const { strict } = require("assert");
const path = require("path");

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
