import Redis from "ioredis";
const creds = require("../creds.json");

const redisClient = new Redis({
  host: creds.endpoint,
  port: creds.port,
  password: creds.password,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export default redisClient;

