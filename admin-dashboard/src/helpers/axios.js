import axios from 'axios'; // importing axios
import { api } from '../urlConfig';

const axiosInstance = axios.create({// create an instance of axios for /api endpoints
    baseURL: api,
    // headers: {
    //     'auth-token': '',
    //     "Content-Type": 'application/json'
    // }
})

export default axiosInstance;