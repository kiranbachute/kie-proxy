const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use("/", createProxyMiddleware({
  target: "https://api.kie.ai",
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req) => {
      if (req.headers.authorization) {
        proxyReq.setHeader("Authorization", req.headers.authorization);
      }
    }
  }
}));

app.listen(process.env.PORT || 3000);
