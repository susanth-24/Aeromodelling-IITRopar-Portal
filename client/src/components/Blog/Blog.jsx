import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../Navbar/Navbar";
import ImageResize from 'quill-image-resize-module-react';
import { useDispatch, useSelector } from 'react-redux'
import CreateBlog from "./CreateBlog";
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

const Blog = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState("");
    console.log(value);
    const [blogId,setBlogId]=useState(0);
    const [blogData,setBlogData]=useState({
        title:"",
        link:"",
        tags:"",
        content:""
    })
    const dispatch = useDispatch();

    const clear=()=>{
        setBlogId(0);
        setBlogData({title:"",content:""})
    }
    console.log(blogData)
    const user = JSON.parse(localStorage.getItem('profile'));
    
    return (
        <div className="bg-white">
            <Navbar/>
            <CreateBlog blogId={blogId} setBlogId={setBlogId} />
            <Footer/>
        </div>
    );
};

export default Blog;