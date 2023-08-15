import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlog } from '../../actions/blogs';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import logo from "../../assets/aeromedelling.jpg";
import DOMPurify from 'dompurify';
import Comments from './Comments';
import edit from "../../assets/edit.png";
import Blog from './Blog';
import CreateBlog from './CreateBlog';


const RealBlog = () => {
    const {blog,blogs}=useSelector((state) => state.blogs);
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [blogId, setBlogId] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        console.log("ig")
        dispatch(getBlog(id));
    }, [id]);
    console.log(blog)
    const extractTextFromHTML = (html) => {
        const purified = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
        const div = document.createElement('div');
        div.innerHTML = purified;
        return div.textContent || div.innerText || '';
      };
      const renderQuillContent = (content) => {
        const purified = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
        return <div dangerouslySetInnerHTML={{ __html: purified }} />;
      };
    const Content =
      extractTextFromHTML(blog?.content)
  return (
    <div>
        <Navbar/>
    <div class="pt-8 pb-16 lg:pt-16 lg:pb-24  bg-gray-100 min-h-screen">
    <div class="flex justify-center">
    <img class="h-48  flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" src={`https://drive.google.com/uc?export=view&id=${blog?.link}`} title="thumbnail" />

</div>
    <div class="flex mt-5 gap-5 justify-center">
    <p class=" text-white  dark:text-black font-semibold text-3xl">{blog?.title}</p>
    {(user?.result?._id === blog?.creator) && (
                    <div className="items-end">
                        <button onClick={() => {
                            //console.log(post._id)
                            setBlogId(blog._id)
                            //navigate(`/profile/${user?.result?._id}`)
                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                        }}>
                            <img src={edit} className="h-[30px]" />
                        </button>
                    </div>
                )}
</div>

    <div class="flex justify-between px-4 mx-auto max-w-screen-xl" >
    

              <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header class="mb-4 lg:mb-6 not-format"/>
              <div className="justify-center mb-5 mt-4 flex flex-wrap gap-2">
                                {blog?.tags.map((tag) => (
                                    <p className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                        #{tag}
                                    </p>
                                ))}
                            </div>

                <div >
                {renderQuillContent(blog?.content)}
                </div>
              <address class="flex mt-5 items-center mb-6 not-italic">
              

                  <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-black">
                      <img class="mr-4 w-16 h-16 rounded-full" src={logo} alt="Jese Leos"/>
                      <div>
                          <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-black">{blog?.name}</a>
                          <p class="text-base font-light text-gray-500 dark:text-black-400">IIT Ropar</p>
                          <p class="text-base font-light text-gray-500 dark:text-black-400">Created {moment(blog?.createdAt).fromNow()}</p>
                          
                      </div>
                      
                  </div>
                  
              </address>
                </article>
    </div>
    </div>
    <div>
    {blogId !== 0 ? <CreateBlog blogId={blogId} setBlogId={setBlogId} /> : null}

    </div>
    <div>
        <Comments blog={blog}/>
    </div>
    </div>
  )
}

export default RealBlog
