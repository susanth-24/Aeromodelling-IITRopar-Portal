import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../assets/aeromedelling.jpg";
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import Navbar from '../Navbar/Navbar';

const ProjectDetails = () => {
    const { post, posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);


    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);
    if (!post) return null;

    const openPost = (p) => navigate(`/projects/${p}`);
    console.log(post)
    const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);
    return (
        <div className="bg-gray-100" >
            <Navbar />
            <div className="justify-center min-h-screen">
                <div className="w-full flex justify-center">
                    <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
                        <div className="px-5 py-7 w-full">
                            
                            <Link to={`/profile/${post.creator}`} className="flex justify-center gap-2">
                                <img src={logo} alt="logo" className="w-10 h-10 object-contain rounded-full" />
                                <p className="text-center text-xl mt-2 text-gray-700 font-semibold">{post.name}</p>
                            </Link>
                            <h2 className="text-center text-gray-800 text-3xl font-bold pt-6">{post.title}</h2>
                            <div className="w-5/6 m-auto">
                                <p className="text-center text-gray-800 pt-2">Type : {post.type}</p>
                            </div>
                            <div className="w-5/6 m-auto">
                                <p className="text-center text-gray-800 pt-2">Start Date : {post.startDate}</p>
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
                                <p className="text-center text-gray-700 font-medium pt-5"> Released {moment(post.createdAt).fromNow()}</p>
                            </div>

                            <div className="w-5/6 m-auto">
                                <img src={`https://drive.google.com/uc?export=view&id=${post.imageLink}`} />
                            </div>
                            <div className="w-5/6 m-auto">
                                <p className="text-center text-gray-800 pt-5">Description: {post.description}</p>
                            </div>
                            <div className="grid grid-cols-4 w-72 lg:w-5/6 m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
                                <div className="col-span-1">
                                </div>
                                <div className="col-span-2 pt-1">
                                    <p className="text-gray-800 font-bold lg:text-sm">Project Manager:</p>
                                    <p className="text-gray-500 text-sm">{post.projectManager}</p>
                                    <p className="text-gray-800 font-bold lg:text-sm">Team Members:</p>

                                    {post.teamMembers.map((person) => (
                                        <p className="text-gray-500 text-sm">
                                            {person}
                                        </p>
                                    ))}
                                </div>

                            </div>

                            <div className="w-5/6 m-auto mt-5">
                                <div className="text-center text-gray-800 pt-2 bg-indigo-50  rounded-2xl">

                                    <p className="text-center text-gray-800 pb-1">Note : {post.remark}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <h2 className="text-center text-gray-800 text-3xl font-bold pt-6">Recommended Projects</h2>
            </div>
            <div>
                {recommendedPosts.length > 0 ? (
                    <div className="bg-gray-100">
                        <div className="flex flex-wrap justify-center -mx-2 py-5">
                            {recommendedPosts.map(({ title, name, tags, type, status, creator, _id }) => (
                                <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
                                    <div className="bg-white flex px-4 mt-10 shadow-2xl rounded-xl">
                                        <div className="px-5 py-7 w-full">
                                            <h2 className="text-center text-gray-800 text-lg font-bold pt-6">{title}</h2>
                                            <Link to={`/profile/${creator}`} className="flex justify-center gap-2">
                                                <img src={logo} alt="logo" className="w-10 h-10 object-contain rounded-full" />
                                                <p className="text-center text-xl mt-2 text-gray-700 font-semibold">{name}</p>
                                            </Link>
                                            <div className="w-5/6 m-auto">
                                                <p className="text-center text-gray-800 pt-2">Type : {type}</p>
                                            </div>

                                            <div className="justify-center mt-4 flex flex-wrap gap-2">
                                                <p className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                                    {status}
                                                </p>
                                            </div>
                                            <div className="justify-center mt-4 flex flex-wrap gap-2">
                                                {tags.map((tag) => (
                                                    <p className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                                        #{tag}
                                                    </p>
                                                ))}
                                            </div>
                                            <div class="py-7 px-7">
                                                <button onClick={() => openPost(_id)} key={_id} class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                                    <span class="inline-block mr-2">More Details</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                                        <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-100 min-h-full">
                        <h2 className="text-center text-gray-800 text-l font-bold pt-6">No Posts To Recommend!</h2>
                    </div>

                )}
            </div>

        </div>
    )
}

export default ProjectDetails
