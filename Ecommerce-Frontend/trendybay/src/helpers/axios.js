import axios from 'axios'; // importing axios
import { api } from '../urlConfig';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({// create an instance of axios for /api endpoints
    baseURL: api,
    headers: {
        "auth-token": token ? token : null
    }
})

export default axiosInstance;