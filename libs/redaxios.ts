import redaxios from "redaxios";

if (!process.env.BASE_URL) {
  console.warn("Warning: BASE_URL is not defined. Defaulting to http://localhost:3000");
}

const baseURL = process.env.BASE_URL;
const instance = redaxios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
