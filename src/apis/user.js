import axios from '../axios';

export const apiRegister = (data) => axios({
    url: '/users/register',
    method: 'post',
    data
});

export const apiLogin = (data) => axios({
    url: '/users/login',
    method: 'post',
    data
});

export const apiGetInforUser = (data) => axios({
    url: '/users/infor',
    method: 'get'
});


