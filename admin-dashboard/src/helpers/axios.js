import axios from 'axios'; // importing axios
import { api } from '../urlConfig';
// import store from '../store/store';
// import { signoutAction } from '../reducers/authReducer';

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({// create an instance of axios for /api endpoints
    baseURL: api,
    headers: {
        "auth-token": token ? token : ''
    }
})

// // axios interceptors to handle req before sending the request and handle the response before sending it action and response:
// axiosInstance.interceptors.request.use((req) => {

//     // sending auth token with request as we are sending old expired token with request:
//     // const {auth} = store.getState();
//     // if(auth.token)
//     // {
//     //     req.headers = {
//     //         'auth-token': auth.token
//     //     }
//     // }
//     // return req;
// })

// axiosInstance.interceptors.response.use((res) => {
//     return res;
// }, (error) => {
//     // extracting status:
//     const {status} = error.response.status;
//     if(status = 500)
//     {
//         // as we cannot dispatch an action outside of the component, we can use store to do it:
//         // store.dispatch(signoutAction());
//         return Promise.reject({...error, status: 500})
//     }
    
//     console.log(error)
//     return Promise.reject(error) // returning rejected promise
// })

export default axiosInstance;