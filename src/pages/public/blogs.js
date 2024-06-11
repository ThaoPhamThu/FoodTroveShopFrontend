import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, createSearchParams, useLocation, NavLink } from "react-router-dom";
import { apiGetBlogCategories, apiGetBlogs } from "../../apis/blog";
import { Pagination, InputForm, BreadCrumbBlog } from "../../components";
import Masonry from "react-masonry-css";
import { useForm } from "react-hook-form";
import path from "../../ultils/path";
import useDebounce from "../../hooks/useDebounce";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getNewBlogs } from "../../store/blogs/asyncActions";

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
};

const Blogs = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { newBlogs } = useSelector(state => state.blogs)
    const [blogs, setBlogs] = useState(null);
    const [categories, setCategories] = useState(null);
    const [params] = useSearchParams()
    const { register, formState: { errors }, watch } = useForm();

    const fetchBlogs = async (queries) => {
        queries.sort = '-createdAt'
        queries.limit = 3
        const response = await apiGetBlogs(queries);
        if (response.success) setBlogs(response)
    }

    const fetchBlogsCategory = async () => {
        const response = await apiGetBlogCategories();
        if (response.success) setCategories(response)
    }

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
        fetchBlogs(searchParams)
        fetchBlogsCategory()
        dispatch(getNewBlogs())
        window.scrollTo(0, 0)
    }, [params]);
    return (
        <div className="w-full">
            <div className="h-[51px] flex justify-center items-center bg-main mb-14">
                <div className="w-main flex justify-between  text-white">
                    <h3 className="font-semibold capitalize">Blogs</h3>
                    <BreadCrumbBlog />
                </div>
            </div>
            <div className="w-main flex m-auto gap-4">
                <div className="w-[80%]">
                    <div className="flex flex-col">
                        <div onClick={() => navigate(`/blogs/${blogs?.blogs[0]?.category}/${blogs?.blogs[0]?._id}/${blogs?.blogs[0]?.title}`)} className='flex flex-col gap-4 mb-8 cursor-pointer'>
                            <img src={blogs?.blogs[0]?.imageBlog} className='w-full h-[455px] object-cover rounded-md' />
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <span className='text-main font-semibold text-[15px]'>{`By ${blogs?.blogs[0]?.author}`}</span>
                                    <span className='font-semibold text-[15px] text-[#7A7A7A]'>/</span>
                                    <span className='font-semibold text-[15px] text-[#7A7A7A]'>{`Date-${moment(blogs?.blogs[0]?.createdAt).format('DD, MM, YYYY')}`}</span>
                                </div>
                                <h3 className='font-bold text-[#2B2B2D] text-[32px]'>{blogs?.blogs[0]?.title}</h3>
                                <div className='text-sm font-normal text-[#7A7A7A]' >{blogs?.blogs[0]?.subtitle}</div>
                            </div>
                        </div>
                        {blogs?.blogs[1] && !blogs?.blogs[2] &&
                            <div onClick={() => navigate(`/blogs/${blogs?.blogs[1]?.category}/${blogs?.blogs[1]?._id}/${blogs?.blogs[1]?.title}`)} className="w-full flex flex-col gap-4 cursor-pointer">
                                <img src={blogs?.blogs[1]?.imageBlog} className="w-full h-[455px] object-cover rounded-md" />
                                <div className="flex gap-2">
                                    <div className="w-5 h-5 bg-main rounded-full text-white text-center ">
                                        {`->`}
                                    </div>
                                    <span className="text-[#2B2B2D] font-bold text-base">{blogs?.blogs[1]?.title}</span>
                                </div>

                            </div>}
                        {blogs?.blogs[1] && blogs?.blogs[2] &&
                            <div className="flex gap-4 w-full">
                                <div onClick={() => navigate(`/blogs/${blogs?.blogs[1]?.category}/${blogs?.blogs[1]?._id}/${blogs?.blogs[1]?.title}`)} className="w-1/2 cursor-pointer flex flex-col gap-4">
                                    <img src={blogs?.blogs[1]?.imageBlog} className="w-full h-[220px] object-cover rounded-md" />
                                    <div className="flex gap-2">
                                        <div className="w-5 h-5 bg-main rounded-full text-white text-center ">
                                            {`->`}
                                        </div>
                                        <span className="text-[#2B2B2D] font-bold text-base">{blogs?.blogs[1]?.title}</span>
                                    </div>

                                </div>
                                <div onClick={() => navigate(`/blogs/${blogs?.blogs[2]?.category}/${blogs?.blogs[2]?._id}/${blogs?.blogs[2]?.title}`)} className="w-1/2 cursor-pointer flex flex-col gap-4">
                                    <img src={blogs?.blogs[2]?.imageBlog} className="w-full h-[220px] object-cover rounded-md" />
                                    <div className="flex gap-2">
                                        <div className="w-5 h-5 bg-main rounded-full text-white text-center">
                                            {`->`}
                                        </div>
                                        <span className="text-[#2B2B2D] font-bold text-base">{blogs?.blogs[2]?.title}</span>
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <div className="w-full my-4 flex justify-end">
                        <Pagination totalCount={blogs?.counts} page={3} />
                    </div>
                </div>
                <div className="w-[20%] flex flex-col h-min border px-4">
                    <InputForm
                        id='q'
                        register={register}
                        errors={errors}
                        fullWidth
                        placaholder='Search here...'
                    />
                    <div className="flex flex-col gap-2">
                        <span className="text-base font-medium">Category</span>
                        {categories?.categories?.map(el => (
                            <NavLink key={el.title} to={`/blogs/${el.title}`} className={({ isActive }) => isActive ? 'bg-main font-normal text-white px-5 py-2 text-sm border' : 'px-5 font-normal py-2 text-sm border text-[#7A7A7A] hover:text-main'}>
                                {el.title}
                            </NavLink>
                        ))}
                    </div>
                    {/* <div className="mt-4 flex flex-col gap-2">
                        <span className="text-base font-medium">Recent Post</span>
                        <div className="flex flex-col gap-4 border p-2">
                            <img src={newBlogs[0]?.imageBlog} />
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-[13px] font-normal text-main">{moment(newBlogs[0]?.createdAt).format('MMM DD, YYYY')}</span>
                                <span className="text-sm font-bold text-center">{newBlogs[0]?.title}</span>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="mt-4 flex flex-col gap-2">
                        <span className="text-base font-medium">Latest Gallery</span>
                        <div className="flex gap-4">
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid flex mx-[-5px]"
                                columnClassName="my-masonry-grid_column">
                                {newBlogs?.map(el => (
                                    <div className="px-1 "><img className="w-[64px] rounded-md h-[64px] object-cover" src={el?.imageBlog} /></div>
                                ))}
                            </Masonry>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="h-[56px]"></div>
        </div>

    )
}

export default Blogs