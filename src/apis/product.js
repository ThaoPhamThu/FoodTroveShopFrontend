import axios from '../axios';

export const apiGetProducts = (params) => axios({
    url: '/products/',
    method: 'get',
    params
});

export const apiGetDetailProduct = (pid) => axios({
    url: '/products/' + pid,
    method: 'get',
});

export const apiCreateReview = (data) => axios({
    url: '/products/reviews',
    method: 'put',
    data
});