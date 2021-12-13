import axios from "axios";
import { AppUtils } from "../utils/appUtils";
import { IS_SESSION_EXPIRED } from "../utils/constants";
import { SessionStorage } from "../utils/storage/sessionStorage";
 
export const LOCAL_CONSTANTS = {
 BASE_URL: "http://localhost:8080/",
};
 
const BASE_URL = LOCAL_CONSTANTS.BASE_URL;
 
export const API_URL = {
 login: BASE_URL + "api/login",
 user: BASE_URL + "users",
 changePassword: BASE_URL + "api/change-password",
 logout: BASE_URL + "api/logout",
 carts : BASE_URL + "carts/" 
};
 
const MOM = axios.create({
 baseURL: BASE_URL,
 headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
 },
});
 
MOM.interceptors.request.use(
 (config) => {
   if (config.baseURL === BASE_URL && !config.headers.Authorization) {
     var authToken = AppUtils.getAuthToken();
     if (authToken) {
       config.headers.Authorization = authToken;
     }
   }
   return config;
 },
 (error) => Promise.reject(error)
);
 
MOM.interceptors.response.use(
 (response) => {
   return response;
 },
 (error) => {
   if (error.response) {
     if (error.response.status === 401 || error.response.status === 403) {
       AppUtils.removeUserRef();
       SessionStorage.setItem(IS_SESSION_EXPIRED, "true");
       window.location.href = "/";
     }
   } else {
     return Promise.reject(error);
   }
 }
);
 
export default MOM;