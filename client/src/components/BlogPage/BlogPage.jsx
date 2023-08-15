import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { getBlogs, getBlogsBySearch } from '../../actions/blogs'
import logo from "../../assets/aeromedelling.jpg";
import Blogs from '../Blogs/Blogs'
import ChipInput from 'material-ui-chip-input';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const BlogPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [blogId, setBlogId] = useState(0);
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const handleAddChip = (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (del) => setTags(tags.filter((tag) => tag !== del));
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    useEffect(() => {
        dispatch(getBlogs());
      }, [dispatch]);
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
      };
      const searchPost = () => {
        if (search.trim() || tags) {
          dispatch(getBlogsBySearch({ search, tags: tags.join(',') }));
          navigate(`/blogs/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
          navigate('/');
        }
      };

    return (
        <div className="bg-gray-100 justify-center min-h-screen">
            <Navbar />
            <p className="text-center text-4xl mt-10 text-black font-semibold">Latest Blogs</p>
            <div className="w-full flex justify-center">
        <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
          <div className="px-5 py-7 w-full">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Search Bar</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} name="search" placeholder="Search for Titles" type="text" class="bg-white text-black border rounded-lg px-3 py-4 mt-1 mb-5 text-sm w-full" />
            <div >
              <ChipInput
                className="w-full"
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
            </div>
            <div class="py-5 px-5">
              <button onClick={searchPost} type="button" class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span class="inline-block mr-2">Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                  <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>


        </div>
      </div>
            <div class="p-3 ">
                <Blogs />


            </div>
            <Footer />

        </div>
    )
}

export default BlogPage
