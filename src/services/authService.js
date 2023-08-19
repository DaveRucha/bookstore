import axios from "axios";
const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";

class AuthService{

    Register = async(payload) => {
       return axios.post(`${BASEURL}`, payload)
    }
}

export default new AuthService(); 