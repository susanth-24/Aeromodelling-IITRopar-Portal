import React from 'react'
import moment from 'moment'
import {getPost,deletePost} from '../../../actions/posts';
import edit from "../../../assets/edit.png";
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/aeromedelling.jpg";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import deleteIcon from "../../../assets/delete.png";

const Project = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const openPost = () => {
        dispatch(getPost(post._id), navigate);
        navigate(`/Projects/${post._id}`)
    }
    // setCurrentId(123123)
    if (!post) {
        // Handle loading state, for example, show a loader
        return <div>Loading...</div>;
      }
      //console.log(post.post.status)
      post=post
      
    return (
        <div className="w-80 mt-24 m-auto lg:mt-16 max-w-sm">
            <div className="bg-white shadow-2xl rounded-xl">
                {(user?.result?._id === post.creator) && (
                    <div className="items-end">
                        <button onClick={() => {
                            //console.log(post._id)
                            setCurrentId(post._id)
                            //navigate(`/profile/${user?.result?._id}`)
                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                        }}>
                            <img src={edit} className="h-[30px]" />
                        </button>
                    </div>
                )}
                <Link to={`/profile/${post.creator}`} className="flex justify-center py-5 gap-2">
                    <img src={logo} alt="logo" className="w-10 h-10 object-contain rounded-full" />
                    <p className="text-center text-xl mt-2 text-gray-700 font-semibold">{post.name}</p>
                </Link>
                <h2 className="text-center text-gray-800 text-xl mt-[-20px] font-bold pt-6">Project : {post.title}</h2>

                <div className="w-5/6 m-auto">
                    <p className="text-center text-gray-800 pt-2">Type : {post.type}</p>
                </div>
                <div className="justify-center mt-4 flex flex-wrap gap-2">
                                <p className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                    {post.status}
                                </p>
                            </div>
                <div className="justify-center mt-4 flex flex-wrap gap-2">
                                                {post.tags.map((tag) => (
                                                    <p className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                                        #{tag}
                                                    </p>
                                                ))}
                                            </div>   
                <div className="w-5/6 m-auto">
                    <p className="text-center text-gray-700 font-medium pt-5">Released {moment(post.createdAt).fromNow()}</p>
                </div>

                <div className="w-5/6 m-auto">
                                <p className="text-center text-gray-800 pt-5 truncate hover:text-clip">Description: {post.description}</p>
                            </div>
                

                
                <div className="flex justify-between mt-1 py-8 px-6 items-center font-medium text-gray-500">
                <div className="grid grid-cols-4 w-72 lg:w-5/6 m-auto bg-indigo-50 mt-0 p-4 lg:p-4 rounded-2xl">
                                <div className="col-span-1">
                                </div>
                                <div className="col-span-2 pt-1">
                                    <p className="text-gray-800 font-bold lg:text-sm">Project Manager:</p>
                                    <p className="text-gray-500 text-sm">{post.projectManager}</p>
                                    
                                </div>

                            </div>
                            


                    {(user?.result?._id === post?.creator) && (
                        <button onClick={() => dispatch(deletePost(post._id))}>
                            <img src={deleteIcon} className="h-[30px] py-0.5" alt="Delete Icon" />
                        </button>
                    )}
                </div>
                <div class="py-5 px-5 mt-[-10px]">
                    <button onClick={openPost} class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span class="inline-block mr-2">More Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                            <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Project
