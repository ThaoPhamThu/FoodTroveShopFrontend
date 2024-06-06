import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Public, Home, FQA, Products, DetailProduct, Services, Blogs, Register, DetailCart } from './pages/public';
import { AdminLayout, CreateProduct, Dashboard, ManageOrder, ManageProducts, ManageUser } from './pages/admin';
import { MemberLayout, Personal, MyCart, History, Wishlist, Checkout } from './pages/member'
import path from './ultils/path';
import { getCategories } from './store/app/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { Cart, Modal } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="font-main h-screen relative">
      {/* <div className='absolute inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex justify-end'>
        <Cart />
      </div> */}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.FAQ} element={<FQA />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICE} element={<Services />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />
          <Route path={path.CHECKOUT} element={<Checkout />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<DetailCart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
