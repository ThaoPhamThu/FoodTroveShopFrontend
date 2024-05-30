import React, { useState, memo } from "react";
import { formatMoney } from '../ultils/helper';
import label from '../assets/label.png';
import labelBlue from '../assets/labelBlue.png';
import { renderStarFromNumber } from '../ultils/helper';
import { SelectOption } from './';
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const { AiFillEye, IoMenu } = icons;

const Product = ({ productData, isNew, normal }) => {
    const [isShowOption, setIsShowOption] = useState(false);
    return (
        <div className="w-full text-base px-[10px]">
            <Link
                className="w-full border p-[15px] flex flex-col items-center"
                to={`/${productData?.category}/${productData?._id}/${productData?.titleProduct}`}
                onMouseEnter={e => {
                    e.stopPropagation();
                    setIsShowOption(true);
                }}
                onMouseLeave={e => {
                    e.stopPropagation();
                    setIsShowOption(false);
                }}>
                <div className="w-full relative flex flex-col items-center">
                    {isShowOption && <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top">
                        <SelectOption icon={<IoMenu />} />
                        <SelectOption icon={<AiFillEye />} />
                    </div>}
                    <img src={productData?.imagesProduct[0] || ''} alt="" className="w-[243px] h-[243px] object-cover" />
                    {!normal && <img src={isNew ? label : labelBlue} alt="" className={`absolute ${isNew ? 'w-[120px] top-[-32px] left-[-42px]' : 'w-[150px] top-[-39px] left-[-50px] '} object-contain`} />}
                    <span className="font-bold top-[-10px] left-[-12px] text-white absolute">{isNew ? 'New' : 'Trending'}</span>
                </div>
                <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
                    <span className="flex h-4">{renderStarFromNumber(productData.ratingsProduct, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span>{productData?.titleProduct}</span>
                    <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
                </div>
            </Link>
        </div>
    )
}

export default memo(Product)