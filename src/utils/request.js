import axios from "axios";
const service = axios.create({
    baseURL: 'https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http'
})
export default service


// 拦截器 
axios.interceptors.request.use((config) => {
    return config
},
    (err) => {
        return Promise.reject(err)
    })



axios.interceptors.response.use((res) => {
    return res
}, (err) => {
    return Promise.reject(err)
})
