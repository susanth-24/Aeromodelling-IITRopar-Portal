import React from 'react'
import moment from 'moment';
import { getBlog } from '../../../actions/blogs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from "../../../assets/aeromedelling.jpg";
import DOMPurify from 'dompurify';

const Blog = ({ blog }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const openBlog = () => {
        dispatch(getBlog(blog._id), navigate);
        navigate(`/blogs/${blog._id}`)
    }
    const extractTextFromHTML = (html) => {
        const purified = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
        const div = document.createElement('div');
        div.innerHTML = purified;
        return div.textContent || div.innerText || '';
      };
      const shortenedContent =
      extractTextFromHTML(blog.content).split('.').slice(0, 2).join('.') + '...';
      return (
        <div>
            <div class="p-18 ">
                <div class="w-full lg:max-w-full mt-7 rounded-lg shadow-md shadow-gray-500 lg:flex">
                    <img class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" src={`https://drive.google.com/uc?export=view&id=${blog.link}`} title="thumbnail" />
                    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div class="mb-8">
                            <div className=" mt-1 flex flex-wrap gap-2">
                                {blog.tags.map((tag) => (
                                    <p className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                        #{tag}
                                    </p>
                                ))}
                            </div>
                            <div class="text-gray-900 font-bold text-xl mb-2">{blog.title}</div>
                            <p class="text-gray-700 text-base">{shortenedContent}</p>
                        </div>
                        <div class="flex items-center">
                            
                            <img class="w-10 h-10 rounded-full mr-4" src={logo} alt="thumbnail" />
                            <div class="text-sm">
                                <p class="text-gray-900 leading-none">Aeromodelling Club</p>
                                <p class="text-gray-600">Created {moment(blog.createdAt).fromNow()}</p>
                            </div>
                            <div class="ms-5 sm:ms-0 md:ms-10">
                    <button onClick={openBlog} class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 px-3.5 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span class="inline-block mr-2">More Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                            <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
                    </div>
                           
                        </div>
                        
                </div>
            </div>
        </div>
    )
}

export default Blog
