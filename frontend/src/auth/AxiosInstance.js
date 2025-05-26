import axios from "axios";

const token = localStorage.getItem("token") || null;
console.log(token);

const instance = axios.create({
  baseURL: "http://dmp.omnidoc.ma:4000",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default instance;
