import { useState,useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../Navbar/Navbar";
import ImageResize from 'quill-image-resize-module-react';
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, getBlog, updateBlog } from "../../actions/blogs";
import { useNavigate } from 'react-router-dom'
import Footer from "../Footer/Footer";


Quill.register('modules/imageResize', ImageResize);


const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],

    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
    }
};

const CreateBlog = ({blogId,setBlogId}) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const blog_now = useSelector((state) => (blogId ? state.blogs.blog : null));
    //const [blogId,setBlogId]=useState(0);
    const [blogData, setBlogData] = useState({
        title: blog_now?.title || '',
        link: blog_now?.link || '',
        tags: blog_now?.tags.join(',') || '',
        content: blog_now?.content || '',
      });
    
    // useEffect(() => {
    //     console.log(blog_now); // Check the value of blog_now
    //     if (blog_now) {
    //         console.log("sdjfbskjfd")
    //       setBlogData({
    //         title: blog_now?.title,
    //         link: blog_now?.link,
    //         tags: blog_now?.tags.join(","),
    //         content: blog_now?.content,
    //       });
    //     }
        
    //   }, [blogId, blog_now]);
      console.log(blogData)
    const clear=()=>{
        setBlogId(0);
        setBlogData({title:"",link:"",tags:"",content:""})
    }
    console.log(blogData)
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(blogId===0){
            dispatch(createBlog({...blogData,name:user?.result?.name},navigate))
            clear();
        }else {
            dispatch(updateBlog(blogId, { ...blogData, name: user?.result?.name }));
            clear();
          }
    }
    return (
        <div className="bg-white">
            <form autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        >
            <div className="w-full flex justify-center py-10">
        <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 mt-10  rounded-xl border-2 border-black">
          <div className="px-5 py-7 w-full">
          <label class="font-black text-lg items-center text-gray-600 pb-5 block">{blogId ? `Editing "${blogData?.title}"` : 'Create a Blog'}</label>
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Title For The Blog</label>
            <input name="title"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={blogData.title}
                placeholder="Enter the title..."
                onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
              />

<label class="font-semibold text-sm text-gray-600 pb-1 block">Thumbnail Link</label>
              <input name="link"
                type="url"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={blogData.link}
                placeholder="Only input the drive link"
                onChange={(e) =>
                    setBlogData({ ...blogData, link: e.target.value })
                } />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Tags</label>
              <input name="tags"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={blogData.tags}
                placeholder="Enter tags seperated with comma"
                onChange={(e) =>
                    setBlogData({ ...blogData, tags: e.target.value.split(',') })
                } />
          </div>
        </div>
      </div>
            <div>
                <ReactQuill className="text-black " modules={modules} theme="snow" value={blogData.content}
                        onChange={(content) => setBlogData({ ...blogData, content })}
                        placeholder="Content goes here..." />
            </div>
            <div class="py-5 px-5">
              <button type="submit" class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span class="inline-block mr-2">Submit</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                  <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            <div class="py-5 px-5">
              <button type="button" onClick={clear} class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span class="inline-block mr-2">Clear</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                  <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              </div>
            {/* <div>
                <p>output</p>
                <p

                    dangerouslySetInnerHTML={{ __html: value}}
                />
            </div> */}
            </form>
        </div>
    );
};

export default CreateBlog;