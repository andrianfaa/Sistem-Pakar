import redaxios from "redaxios";

console.log("Base URL:", process.env.BASE_URL || "not defined");

const instance = redaxios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
