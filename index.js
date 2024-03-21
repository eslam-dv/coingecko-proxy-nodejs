import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

// Configuration
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_COINS_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10";

const API_SINGLE_COIN_URL = "https://api.coingecko.com/api/v3/coins/";

// Logging the requests
app.use(morgan("dev"));

// Get top 10 coins data
app.use(
  "/coins",
  createProxyMiddleware({
    target: API_COINS_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/coins`]: "",
    },
  })
);

// Get single coin data by using "/coin/:id"
app.use(
  "/coin",
  createProxyMiddleware({
    target: API_SINGLE_COIN_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/coin`]: "",
    },
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting proxy at ${HOST}:${PORT}`);
});
