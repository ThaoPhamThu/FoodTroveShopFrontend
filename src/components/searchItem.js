import React, { memo, useState, useEffect } from 'react';
import icons from '../ultils/icons';
import { brands } from '../ultils/constants';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiGetProducts } from '../apis';
import useDebounce from '../hooks/useDebounce';

const { IoIosArrowDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const navigate = useNavigate()
    const { category } = useParams()
    const [params] = useSearchParams()
    const [selected, setSelected] = useState([]);
    const [bestPrice, setBestPrice] = useState(null);
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })
    const handleSelect = (e) => {
        changeActiveFilter(null)
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
    }

    useEffect(() => {

        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of param) queries[i[0]] = i[1];
        if (selected.length > 0) {
            queries.brand = selected;
            queries.page = 1
        } else delete queries.brand
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })

    }, [selected]);

    const fetchBestprice = async () => {
        const response = await apiGetProducts({ sort: '-price', limit: 1 });
        if (response.success) setBestPrice(response?.products[0]?.price)
    }
    useEffect(() => {
        if (type === 'input') fetchBestprice()
    }, [type]);

    const debouncePriceFrom = useDebounce(price.from, 500)
    const debouncePriceTo = useDebounce(price.to, 500)
    useEffect(() => {
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of param) queries[i[0]] = i[1];
        if (Number(price.from) > 0) queries.from = price.from
        else delete queries.from
        if (Number(price.to) > 0) queries.to = price.to
        else delete queries.to
        queries.page = 1
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })


    }, [debouncePriceFrom, debouncePriceTo])
    return (
        <div
            className='p-3 text-gray-500 cursor-pointer text-xs gap-6 border border-gray-800 flex justify-between items-center relative'
            onClick={() => changeActiveFilter(name)}
        >
            <span className='capitalize'>{name}</span>
            <IoIosArrowDown />
            {activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]'>
                {type === 'checkbox' && <div className='p-2'>
                    <div className='pb-4 flex items-center justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                        <span onClick={e => {
                            e.stopPropagation()
                            setSelected([])
                            changeActiveFilter(null)
                        }}
                            className='underline cursor-pointer hover:text-main'>Reset</span>
                    </div>
                    <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                        {brands.map((el, index) => (
                            <div className='flex items-center gap-4'>
                                <input
                                    type='checkbox'
                                    key={index}
                                    name={el}
                                    value={el}
                                    onChange={handleSelect}
                                    checked={selected.some(selectedItem => selectedItem === el)}
                                    className='' />
                                <label htmlFor={el} className='capitalize text-gray-700'>{el}</label>
                            </div>
                        ))}
                    </div>
                </div>}
                {type === 'input' && <div onClick={e => e.stopPropagation()}>
                    <div className='pb-4 flex items-center justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{`The highest price is ${Number(bestPrice).toLocaleString()} VND`}</span>
                        <span onClick={e => {
                            e.stopPropagation()
                            setPrice({ from: '', to: '' })
                            changeActiveFilter(null)
                        }}
                            className='underline cursor-pointer hover:text-main'>Reset</span>
                    </div>
                    <div className='flex items-center p-2 gap-2 mt-2'>
                        <div className=' flex items-center gap-2'>
                            <label htmlFor='from'>From</label>
                            <input
                                className='p-3 border'
                                type='number' id='from'
                                value={price.from}
                                onChange={e => setPrice(prev => ({ ...prev, from: e.target.value }))} />
                        </div>
                        <div className=' flex items-center gap-2'>
                            <label htmlFor='to'>to</label>
                            <input
                                className='p-3 border' type='number' id='to'
                                value={price.to}
                                onChange={e => setPrice(prev => ({ ...prev, to: e.target.value }))} />
                        </div>
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default memo(SearchItem)