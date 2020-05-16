/* eslint-disable no-console */
const express = require("express");
const next = require("next");

const devProxy = {
  "/api": {
    target: "http://localhost:3001/api",
    pathRewrite: { "^/api": "/" },
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== "production";
const app = next({
  dev,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const { createProxyMiddleware } = require("http-proxy-middleware");
      Object.keys(devProxy).forEach(function (context) {
        server.use(createProxyMiddleware(context, devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all("*", (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch((err) => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  });
