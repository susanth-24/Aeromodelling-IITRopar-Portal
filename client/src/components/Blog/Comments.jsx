import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlog, commentBlog } from '../../actions/blogs';
import moment from 'moment';

const Comments = ({ blog }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (blog) {
            setComments(blog.comments || []);
        }
    }, [blog]);
    console.log(comments)

    const dispatch = useDispatch();
    const [com, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'))
    const commentsRef = useRef();
    comments.map((commentArray, index) => (
        console.log(commentArray.commenter, index)
    )
    )
    const [name,setName]=useState(user?.result?.name)
    const handleName = (e) => {
        const newName = e.target.value;
        setName(newName);
    };
    
    console.log(name);
    const handleComment = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (com.trim() === '') {
            return;
        }

        const newComments = await dispatch(commentBlog(name, com, blog._id));

        setComment('');
        setComments(newComments);
    };

    const handleRefresh = () => {
        console.log("fdgdsf")
    }
    const { id } = useParams();
    useEffect(() => {
        dispatch(getBlog(id));
    }, [id]);
    return (
        <section class="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div class="max-w-2xl mx-auto px-4">
                <div className="flex justify-center mb-5">
                    <button
                        type="submit"
                        onClick={handleRefresh}
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 transform transition-transform hover:scale-105"
                    >
                        Refresh Comments
                    </button>

                </div>
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({blog?.comments?.length})</h2>
                </div>

                {user?.result ? (
                    <form class="mb-6">

                        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label for="comment" class="sr-only">Your comment</label>
                            <textarea id="comment" rows="6"
                                value={com} onChange={(e) => setComment(e.target.value)}
                                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..." required></textarea>
                        </div>
                        <button type="submit" onClick={handleComment}
                            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Post comment
                        </button>
                    </form>
                ) : (
                    // onChange={handleChange}
                        <form class="mb-6">
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
                        <input name="name"  onChange={handleName} type="text" required class="dark:text-white bg-gray-800 text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

                            <div class="py-2 px-4 mb-4 dark:text-white dark:placeholder-gray-400  rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label for="comment" class="sr-only">Your comment</label>
                                <textarea id="comment" rows="6"
                                    value={com} onChange={(e) => setComment(e.target.value)}
                                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Write a comment..." required></textarea>
                            </div>
                            <button type="submit" onClick={handleComment}
                                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Post comment
                            </button>
                        </form>
                    
                )}

                {comments?.length > 0 &&
                    comments.map((commentArray, index) => (
                        <div key={index}>
                            <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                            <div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                <span class="font-medium text-gray-600 dark:text-gray-300">{commentArray.commenter[0]}</span>
                                            </div>
                                            &nbsp;
                                            {commentArray.commenter}
                                        </p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">{moment(commentArray.timeAt).fromNow()}</p>
                                    </div>
                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">{commentArray.comment}</p>
                            </article>
                            {index !== commentArray.length - 1 && <hr />} {/* Add a line between comments */}


                        </div>
                    ))}



            </div>
        </section>
    )
}

export default Comments
