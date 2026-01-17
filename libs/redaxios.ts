import redaxios from "redaxios";

const instance = redaxios.create({
  baseURL: process.env.URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
