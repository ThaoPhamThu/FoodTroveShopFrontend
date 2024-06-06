const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    REGISTER: 'register',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICE: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:titleProduct',
    DETAIL_CART: 'my-cart',
    CHECKOUT: 'checkout',

    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',

    //Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    MY_CART: 'my-cart',
    HISTORY: 'order-history',
    WISHLIST: 'wishlist'
}

export default path;