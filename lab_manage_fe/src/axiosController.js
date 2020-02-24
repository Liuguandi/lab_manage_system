import axios from 'axios';
var axiosController = {};
axiosController.install = function(Vue){
    var axios_obj = axios.create({
        // baseURL: 'http://localhost:9876/',
        baseURL: 'http://robotlabbackend.keys.moe:9876/',
        // headers:{'Authorization':window.localStorage.getItem('token')}
        // headers:{'Authorization': "lab_key=" + $cookies.get("lab_key"),"username":window.localStorage.getItem('username')}
        headers:{'Authorization': "lab_key=" +window.localStorage.getItem('lab_key'),"username":window.localStorage.getItem('username')}
    })
    Vue.prototype.$connectBackEnd = axios_obj;
}
export default axiosController;
