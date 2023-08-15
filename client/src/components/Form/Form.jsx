import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom'


const Form = ({ currentId, setCurrentId }) => {
  console.log(currentId)
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({
    title: "",
    description:"",
    type: "",
    imageLink:"",
    projectManager:"",
    teamMembers:"",
    tags: "",
    status:"",
    startDate:"",
    remark:"",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (post) setPostData(post);
  }, [post])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };
  if (!user?.result?.name) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
          <div className="px-5 py-7 w-full">
            <h1 class="font-semibold text-sm text-gray-600 pb-1 block">Please SignIn to Like, Create Posts and Follow Users</h1>
          </div>
        </div>
      </div>
    )
  }
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "",
    description:"",
    type: "",
    imageLink:"",
    projectManager:"",
    teamMembers:"",
    tags: "",
    status:"",
    startDate:"",
    remark:"",});
  };
  return (
    <div className=" mt-5" >
      <form autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        class=" flex flex-col justify-end sm:py-12" >
        <div class="p-10 xs:p-0 mx-auto shadow-2xl md:w-full md:max-lg:w-full md:max-sm:w-full ">

          <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div class="px-5 py-7">
              <label class="font-black text-lg items-center text-gray-600 pb-5 block">{currentId ? `Editing "${post.title}"` : 'Create a Project'}</label>
              <label class="font-semibold text-sm text-gray-600 pb-1 block">Title</label>
              <input name="title"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
              />
              <label class="font-semibold text-sm text-gray-600 pb-1 block">Description</label>
              <input name="description"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.description}
                onChange={(e) =>
                  setPostData({ ...postData, description: e.target.value })
                } />

              <label class="font-semibold text-sm text-gray-600 pb-1 block">Type</label>
              <input name="type"
                type="text"
                placeholder="Open Project or Closed Project"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.type}
                onChange={(e) =>
                  setPostData({ ...postData, type: e.target.value })
                } />
              <label class="font-semibold text-sm text-gray-600 pb-1 block">ImageLink</label>
              <input name="imageLink"
                type="url"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.imageLink}
                placeholder="Only input the drive link"
                onChange={(e) =>
                  setPostData({ ...postData, imageLink: e.target.value })
                } />

<label class="font-semibold text-sm text-gray-600 pb-1 block">Project Manager</label>
              <input name="projectManager"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.projectManager}
                onChange={(e) =>
                  setPostData({ ...postData, projectManager: e.target.value })
                } />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Team Members</label>
              <input name="teamMembers"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.teamMembers}
                placeholder="Enter names seperated with comma"
                onChange={(e) =>
                  setPostData({ ...postData, teamMembers: e.target.value.split(',') })
                } />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Tags</label>
              <input name="tags"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.tags}
                placeholder="Enter tags seperated with comma"
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(',') })
                } />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Status</label>
              <input name="status"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.status}
                placeholder="Ongoing / Completed"
                onChange={(e) =>
                  setPostData({ ...postData, status: e.target.value })
                } />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Start Date</label>
              <input name="startDate"
                type="date"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.startDate}
                placeholder="Ongoing / Completed"
                onChange={(e) =>
                  setPostData({ ...postData, startDate: e.target.value })
                } />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Remark</label>
              <input name="remark"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.remark}
                placeholder="Ongoing / Completed"
                onChange={(e) =>
                  setPostData({ ...postData, remark: e.target.value })
                } />
                


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
          </div>

        </div>
      </form>
    </div>
  )
}

export default Form
