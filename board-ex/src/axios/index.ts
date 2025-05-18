import axios from "~node_modules/axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api"
});

export default instance;