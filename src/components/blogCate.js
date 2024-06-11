import React, { memo, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { useDispatch, useSelector } from 'react-redux'
import { getNewBlogs } from '../store/blogs/asyncActions';
import moment from 'moment';

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
};
const BlogCate = () => {


    return (
        <div>

        </div>
    )
}

export default memo(BlogCate)