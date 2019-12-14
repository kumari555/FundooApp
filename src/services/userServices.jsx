import axios from 'axios'
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL;
export function service() {
    return axios.get(baseURL + "/user/service")
}
export function register(data) {
    return axios.post(baseURL + "/user/userSignUp", data)
}
export function signin(data) {
    return axios.post(baseURL + "/user/login", data)
}
export function addToCart(data) {
    return axios.post(baseURL + "/productcarts/addToCart", data)
}
export function ProfileImage(data) {
    return axios.post(baseURL + '/user/uploadProfileImage', data,
        { 
            headers: {
                // 'Content- Type': 'multipart/ form - data',
                Authorization: localStorage.getItem("token")
            }
        })
}
export function userEmail() {
    return axios.get(baseURL + "/user")
}

export function searchUserList(data) {
    return axios.post(baseURL + '/user/searchUserList', data,
        {
            headers: {
                // 'Content- Type': 'multipart/ form - data',
                Authorization: localStorage.getItem("token")
            }
        })
}

