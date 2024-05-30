import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
import { renderStarFromNumber, formatMoney } from '../ultils/helper';
import { CountDown } from './';

const { AiFillStar, IoMenu } = icons;

let idInterval

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), ratingsProduct: 5 });
        if (response.success) {
            setDealDaily(response.products[0]);
            const h = 24 - new Date().getHours();
            const m = 60 - new Date().getMinutes();
            const s = 60 - new Date().getSeconds();
            setHour(h);
            setMinute(m);
            setSecond(s);
        } else {
            setHour(0);
            setMinute(59);
            setSecond(59);
        }
    }

    useEffect(() => {
        idInterval && clearInterval(idInterval);
        fetchDealDaily();
    }, [expireTime]);

    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) setSecond(prev => prev - 1)
            else {
                if (minute > 0) {
                    setMinute(prev => prev - 1);
                    setSecond(60);
                } else {
                    if (hour > 0) {
                        setHour(prev => prev - 1);
                        setMinute(60);
                        setSecond(60);
                    } else {
                        setExpireTime(!expireTime)
                    }
                }

            }
        }, 1000);
        return () => {
            clearInterval(idInterval)
        }
    }, [second, minute, hour, expireTime]);

    return (
        <div className='border w-full flex-auto' >
            <div className="flex items-center justify-between p-4 w-full">
                <span className="flex-1 flex justify-center "><AiFillStar size={20} color="#DD1111" /></span>
                <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">DEAL DAILY</span>
                <span className="flex-1"></span>
            </div>
            <div className="w-full flex flex-col items-center pt-8 gap-2 px-4">
                <img src={dealDaily?.imagesProduct[0] || ''} alt="" className="w-full object-contain" />
                <span className="text-center">{dealDaily?.titleProduct}</span>
                <span className="flex">{renderStarFromNumber(dealDaily?.ratingsProduct, 20)?.map((el, index) => (
                    <span key={index}>{el}</span>
                ))}</span>
                <span>{`${formatMoney(dealDaily?.price)} VNĐ`}</span>
            </div>
            <div className="px-4 mt-4 mb-8">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <CountDown unit={'Hours'} number={hour} />
                    <CountDown unit={'Minutes'} number={minute} />
                    <CountDown unit={'Seconds'} number={second} />
                </div>
                <button type="button" className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2">
                    <IoMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily)