import React from "react";
import { Sidebar, Banner, BestSeller, DealDaily, PopularProduct, CustomSlider, TopRatedProduct } from '../../components';
import { useSelector } from "react-redux";

const Home = () => {
    const { newProducts } = useSelector(state => state.products);
    const { isLoggedIn, current } = useSelector(state => state.products);


    return (
        <>
            <div className="w-main flex mt-6">
                <div className="flex flex-col gap-5 w-[25%] flex-auto">
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className="my-8">
                <PopularProduct />
            </div>
            <div className="my-8 w-main">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">NEW ARRIVALS</h3>
                <div className="mt-4 mx-[-10px]">
                    <CustomSlider products={newProducts} />
                </div>
            </div>
            <div className="my-8">
                <TopRatedProduct />
            </div>
            <div className="my-8 w-main">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">BLOGS POSTS</h3>
            </div>
        </>
    )
}

export default Home 