import axios from "axios";

const useAPI = axios.create({
    baseURL: "/api/v1",
});

export default useAPI;