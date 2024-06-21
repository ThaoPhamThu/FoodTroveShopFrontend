import React, { useCallback, useEffect, useState } from 'react';
import { InputForm, Pagination } from '../../components';
import { useForm } from 'react-hook-form';
import { apiGetProducts, apiDeleteProduct } from '../../apis/product';
import moment from 'moment';
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { UpdateProduct } from './';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageProducts = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, formState: { errors }, watch } = useForm();
    const [products, setProducts] = useState(null);
    const [counts, setCounts] = useState(0);
    const [editProduct, setEditProduct] = useState(null)
    const [update, setUpdate] = useState(false)

    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])

    const fetchProducts = async (params) => {
        const response = await apiGetProducts({ ...params, limit: process.env.REACT_APP_LIMIT })
        if (response.success) {
            setCounts(response.counts)
            setProducts(response.products)
        }
    };

    const queryDebounce = useDebounce(watch('q'), 800)

    useEffect(() => {
        if (queryDebounce) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({ q: queryDebounce }).toString()
            })
        } else navigate({
            pathname: location.pathname,
        })
    }, [queryDebounce]);

    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
        fetchProducts(searchParams)
    }, [params, update]);

    const handleDeleteProduct = (pid) => {
        Swal.fire({
            title: 'Are you sure...?',
            text: 'Are you sure delete this product?',
            icon: 'warning',
            showCancelButton: true
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteProduct(pid)
                if (response.success) toast.success(response.mes)
                else toast.error(response.mes)
                render()
            }
        })
    }

    return (
        <div className='w-full flex flex-col gap-4 relative'>
            {editProduct && <div className='absolute inset-0 min-h-screen bg-gray-200'>
                <UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct} />
            </div>}
            <div className='p-4 border-b w-full flex justify-between items-center'>
                <h1 className='text-3xl font-bold tracking-tight'>Manage products</h1>
            </div>
            <div className='flex justify-end items-center w-full px-4'>
                <form className='w-[45%]'>
                    <InputForm
                        id='q'
                        register={register}
                        errors={errors}
                        fullWidth
                        placaholder='Search products by title'
                    />
                </form>
            </div>
            <table className='table-auto'>
                <thead>
                    <tr className='border bg-sky-900 text-white border-white'>
                        <th className='text-center py-2'>#</th>
                        <th className='text-center py-2'>Thumb</th>
                        <th className='text-center py-2'>Title</th>
                        <th className='text-center py-2'>Brand</th>
                        <th className='text-center py-2'>Category</th>
                        <th className='text-center py-2'>Price</th>
                        <th className='text-center py-2'>Sale</th>
                        <th className='text-center py-2'>Weight</th>
                        <th className='text-center py-2'>Quantity</th>
                        <th className='text-center py-2'>Sold</th>
                        <th className='text-center py-2'>Ratings</th>
                        <th className='text-center py-2'>Created At</th>
                        <th className='text-center py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((el, index) => (
                        <tr className='border-b border-white' key={el._id}>
                            <td>{((+params.get('page') > 1 ? (+params.get('page') - 1) : 0) * process.env.REACT_APP_LIMIT) + index + 1}</td>
                            <td>
                                <img src={el.imagesProduct[0]} alt='thumb' className='w-12 h-12 object-cover' />
                            </td>
                            <td className='text-center py-2'>{el.titleProduct}</td>
                            <td className='text-center py-2'>{el.brand}</td>
                            <td className='text-center py-2'>{el.category}</td>
                            <td className='text-center py-2'>{el.price}</td>
                            <td className='text-center py-2'>{`${el.saleProduct}%`}</td>
                            <td className='text-center py-2'>{el.weightProduct}</td>
                            <td className='text-center py-2'>{el.stock}</td>
                            <td className='text-center py-2'>{el.productSold}</td>
                            <td className='text-center py-2'>{el.ratingsProduct}</td>
                            <td className='text-center py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                            <td className='text-center py-2'>
                                <span onClick={() => setEditProduct(el)} className='text-blue-500 hover:underline inline-block cursor-pointer px-1'><FaRegEdit /></span>
                                <span onClick={() => handleDeleteProduct(el._id)} className='text-red-500 hover:underline inline-block cursor-pointer px-1'><RiDeleteBin6Line /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end my-6'>
                <Pagination totalCount={counts} />
            </div>
        </div>
    )
}

export default ManageProducts