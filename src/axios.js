import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-app-react-72a74-default-rtdb.firebaseio.com/",
});

export default instance;
