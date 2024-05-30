import React, { memo } from 'react';

const Footer = () => {
    return (
        <div className='w-full'>
            <div className='h-[407px] bg-[#F7F7F8] flex items-center justify-center text-[13px]'>
                <div className='w-main flex'>
                    <div className='flex-2 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>ABOUT US</h3>
                        <span>
                            <span>Address: </span>
                            <span className='opacity-70'>51 Green St.Huntington, NY 11746 KY 4783, USA.</span>
                        </span>
                        <span>
                            <span>Phone: </span>
                            <span className='opacity-70'>(+1800) 123 4567</span>
                        </span>
                        <span>
                            <span>Mail: </span>
                            <span className='opacity-70'>foodtroveshop@gmail.com</span>
                        </span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>INFORMATION</h3>
                        <span>Typography</span>
                        <span>Gallery</span>
                        <span>Store Location</span>
                        <span>Today's Deal</span>
                        <span>Contacts</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>WHO WE ARE</h3>
                        <span>Help</span>
                        <span>Free Shipping</span>
                        <span>FQAs</span>
                        <span>Return & Exchange</span>
                        <span>Testimonials</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>#DIGITALWOLRDSTORE</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer)