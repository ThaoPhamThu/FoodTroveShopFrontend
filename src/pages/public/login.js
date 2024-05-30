import React, { useState, useCallback, useEffect } from "react";
import { Header, Navigation, Footer, InputField, Button, Loading } from '../../components';
import logo from '../../assets/logo.jpg';
import { apiRegister, apiLogin } from "../../apis/user";
import Swal from 'sweetalert2';
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { login } from '../../store/users/userSlice';
import { showModal } from '../../store/app/appSlice'
import { useDispatch } from "react-redux";
import { validate } from '../../ultils/helper'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: ''
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const [isRegister, setIsRegister] = useState(false);
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            name: '',
            phoneNumber: ''
        })
    };
    useEffect(() => {
        resetPayload()
    }, [isRegister])
    const handleSubmit = useCallback(async () => {
        const { name, phoneNumber, ...data } = payload;

        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        if (invalids === 0) {
            if (isRegister) {
                dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
                const response = await apiRegister(payload);
                dispatch(showModal({ isShowModal: false, modalChildren: null }))

                if (response.success) {
                    Swal.fire('Đăng ký tài khoản thành công!', response.user, 'success').then(() => {
                        setIsRegister(false);
                        resetPayload();
                    })
                } else {
                    Swal.fire('Đăng ký thất bại, vui lòng thử lại', response.user, 'error')
                }

            } else {
                const rs = await apiLogin(data);
                if (rs.success) {
                    dispatch(login({ isLoggedIn: true, token: rs.token, userData: rs.user }))
                    navigate(`${path.PUBLIC}`)
                } else Swal.fire('Đăng nhập thất bại, vui lòng thử lại', rs.user, 'error')
            }
        }



    }, [payload, isRegister])
    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <Navigation />
            <div className="h-[700px]">
                <div className="w-main">
                    <div className=" mt-12 ml-16 p-8 bg-white flex flex-col items-center rounded-md min-w-[360px] min-h-[360px] absolute left-1/3 border">
                        <h1 className=" text-[28px] font-semibold text-main mb-6">
                            <img src={logo}
                                className=" w-[130px] h-[48px]"
                            />
                        </h1>
                        {isRegister && <InputField
                            value={payload.name}
                            setValue={setPayload}
                            nameKey='name'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />}
                        {isRegister && <InputField
                            value={payload.phoneNumber}
                            setValue={setPayload}
                            nameKey='phoneNumber'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />}
                        <InputField
                            value={payload.email}
                            setValue={setPayload}
                            nameKey='email'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <InputField
                            value={payload.password}
                            setValue={setPayload}
                            nameKey='password'
                            type='password'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <Button handleOnClick={handleSubmit}
                            fw>
                            {isRegister ? 'Register' : 'Login'}

                        </Button>
                        <div className="flex items-center justify-between my-w w-full">
                            <div >
                                {!isRegister && <span
                                    className="text-blue-500 hover:underline cursor-pointer mt-4"
                                    onClick={() => { setIsRegister(true) }}
                                >Create Acount</span>}
                                {isRegister && <span
                                    className="text-blue-500 hover:underline cursor-pointer mt-2"
                                    onClick={() => { setIsRegister(false) }}
                                >Sign in</span>}
                            </div>
                            <Link to={`/`} className="text-blue-500 hover:underline cursor-pointer ml-[120px] mt-2">Go home?</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login