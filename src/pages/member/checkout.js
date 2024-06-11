import React from 'react'
import { BreadCrumb, Paypal } from '../../components'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatMoney } from '../../ultils/helper'

const Checkout = () => {
    const location = useLocation()
    const { currentCart } = useSelector(state => state.user)
    return (
        <div className='w-full'>
            <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                <div className="w-main flex justify-between text-white">
                    <h3 className='font-semibold'>Checkout</h3>
                    <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                </div>
            </div>
            <table className='table-auto w-main m-auto'>
                <thead>
                    <tr className='border bg-gray-200 text-gray-800 border-white'>
                        <th className='text-start py-2 pl-9 font-medium'>Product</th>
                        <th className='text-start py-2 pl-5 font-medium'>Price</th>
                        <th className='text-center py-2 font-medium'>Quantity</th>
                        <th className='text-end py-2 pr-9 font-medium'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCart?.map(el => (
                        <tr className='border-b bg-gray-100 border-white text-gray-600' >
                            <td className='flex gap-2 items-center pl-2 py-2 '>
                                <div className='p-1 border'><img src={el.product?.imagesProduct[0]} alt='thumb' className='w-12 h-12 object-cover' /></div>
                                <div className='flex flex-col '>
                                    <span>{el.product?.titleProduct}</span>
                                    <span className='text-xs italic'>{el.product?.weightProduct}</span>
                                </div>
                            </td>
                            <td className='text-start py-2'>{formatMoney(el.product?.finalprice) + 'VNĐ'}</td>
                            <td className='text-center py-2'>{el?.quantity}</td>
                            <td className='text-end py-2 pr-2'>{formatMoney(el?.price * el?.quantity) + 'VNĐ'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex items-center gap-8 justify-center'>
                <span className='text-xl'>Sub-total:</span>
                <span className='text-main italic'>{`${formatMoney(currentCart?.reduce((sum, el) => (+el?.price * +el?.quantity) + sum, 0))} VNĐ`}</span>
            </div>
            <div className='w-main m-auto'>
                input adress
            </div>
            <div className='w-full m-auto'>
                <Paypal amount={120} />
            </div>
        </div>
    )
}

export default Checkout