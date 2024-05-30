import React, { memo } from "react";
import { renderStarFromNumber, formatMoney } from '../ultils/helper'

const ProductCard = ({ title, image, ratingsProduct, price }) => {
    return (
        <div className="w-1/3 flex-auto flex px-[10px] mb-[20px] ">
            <div className="flex w-full border">
                <img src={image} alt="products" className="w-[120px] object-contain p-4" />
                <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs mt-[-15px] justify-center">
                    <span className="capitalize text-sm">{title}</span>
                    <span className="flex">{renderStarFromNumber(ratingsProduct, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span>{`${formatMoney(price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductCard)