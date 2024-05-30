import React, { Fragment, memo } from "react";
import logo from '../assets/logo.jpg';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
import { useSelector } from "react-redux";

const { RiPhoneFill, MdEmail, PiHandbagSimpleFill, RiUserHeartLine } = icons
const Header = () => {
    const { current } = useSelector(state => state.user)
    return (
        <div className="flex justify-between w-main h-[110px] py-[35px]">
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className="w-[234px] object-contain h-[60px]" />
            </Link>
            <div className="flex text-[13px]">
                <div className="flex flex-col px-6 border-r items-center">
                    <span className="flex gap-4 items-center">
                        <RiPhoneFill color="red" />
                        <span className="font-semibold">(+1800) 123 4567</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col px-6 border-r items-center">
                    <span className="flex gap-4 items-center">
                        <MdEmail color="red" />
                        <span className="font-semibold">FOODTROVESHOP@GMAIL.COM</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                {current && <Fragment>
                    <div className="cursor-pointer flex flex-col items-center px-6 border-r gap-2">
                        <PiHandbagSimpleFill color="red" />
                        <span>0 item(s)</span>
                    </div>
                    <Link
                        className="cursor-pointer flex flex-col items-center justify-center pl-6 gap-2"
                        to={current?.role === 'admin' ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`}>
                        <RiUserHeartLine color="red" />
                        <span>Profile</span>
                    </Link>
                </Fragment>}
            </div>
        </div>
    )
}

export default memo(Header)