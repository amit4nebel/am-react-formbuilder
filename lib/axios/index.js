'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Axios = _axios2.default.create({
    baseURL: 'http://localhost:2000', //local
    headers: { 'Content-Type': 'application/json' }
});

Axios.interceptors.request.use(function (config) {
    console.log(window.localStorage);
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token");
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Do something with response data

    return response;
}, function (error) {
    console.log(JSON.stringify(error));
    if (error.response.status === 401) {
        window.localStorage.clear();
        window.location.replace('/');
    }
    // Do something with response error
    return Promise.reject(error);
});

exports.default = Axios;