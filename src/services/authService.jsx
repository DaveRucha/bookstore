import axios from "axios";
import request from "./request";
const ENDPOINT = "api/user";

const BASE_URL="https://book-e-sell-node-api.vercel.app/api/user";



class AuthService{

    Register=async(payload)=>{
      return axios.post(`${BASE_URL}`,payload);
    }

    Login=async(payload)=>{
      return axios.post(`${BASE_URL}/login`,payload);
    }
    
}

export default new AuthService;