import CONSTANTS from "../constants/Constants.js";
import axios from "axios";

const api = axios.create({
    baseURL: CONSTANTS.API_SERVER_BASE_URL,
});

const ai = axios.create({
    baseURL: CONSTANTS.AI_SERVER_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export {api, ai};