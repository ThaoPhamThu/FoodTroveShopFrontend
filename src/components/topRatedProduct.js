import React, { useEffect, useState, memo } from "react";
import { ProductCard } from './'
import { apiGetProducts } from "../apis";


const TopRatedProduct = () => {
    const [popularProduct, setPopularProduct] = useState(null);

    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 6, page: 1, sort: '-ratingsProduct' });

        if (response?.success) setPopularProduct(response.products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-main ">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">TOP RATED</h3>
            <div className="flex flex-wrap mt-[15px] mx-[-10px]">
                {popularProduct?.map((el) => (
                    <ProductCard key={el._id} image={el.imagesProduct[0]} title={el.titleProduct} ratingsProduct={el.ratingsProduct} price={el.price} />
                ))}
            </div>
        </div>
    )
}

export default memo(TopRatedProduct)