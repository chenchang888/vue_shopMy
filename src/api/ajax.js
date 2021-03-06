import axios from "axios"
const instance = axios.create({
    baseURL: "http://127.0.0.1:8888/api/private/v1/",
    timeout: 20000
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = sessionStorage.getItem("token")
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    window.$message.error("请求错误")
    console.log(error.message);
    return new Promise(() => { });
});
export default instance