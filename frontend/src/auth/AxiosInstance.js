import axios from "axios";

const token = localStorage.getItem("token") || null;

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default instance;
