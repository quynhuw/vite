import axios from "axios";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};
const AxiosClient = axios.create({
  // baseURL: "http://172.16.3.96:8080/api",
  // baseURL: "http://localhost:8080/api",
  // baseURL: "http://172.16.2.89:8080/api",
  baseURL: "https://be-deploy-ler2.onrender.com/api",
  headers: config.headers,
});
export default AxiosClient;
