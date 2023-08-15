import React, { useEffect } from 'react'
import Blog from './blog/Blog'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getBlogs } from '../../actions/blogs'

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading } = useSelector((state) => state.blogs);
    console.log(blogs)
    //   useEffect(() => {
    //     dispatch(getBlogs());
    //     console.log("yea")
    //   }, []);
    if (!blogs.length && !isLoading) return 'No Blogs';

    console.log(blogs)
    return (
        <div>
            <div class="p-10 ">
                {blogs.map((post) => (
                    <div key={post._id}>
                        <Blog blog={post} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blogs
