import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRequest } from '../../actions/requests'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


const Portal = ({ currentId, setCurrentId }) => {
  const navigate = useNavigate();
  currentId=0;
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({
    itemName: "",
    quantity: "",
    requestTime: "",
    reason: "",
    remarks:""
  });
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createRequest({ ...postData, name: user?.result?.name }, navigate));
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
    setPostData({ itemName: "",
    quantity: "",
    requestTime: "",
    reason: "",
    remarks:"" });
  };
  return (
    <div  >
      <Navbar/>
      <form autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        class=" flex flex-col justify-end sm:py-12 mt-10" >
        <div class="p-10 xs:p-0 mx-auto shadow-2xl md:w-full md:max-w-md max-w-sm ">

          <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div class="px-5 py-7">
              <label class="font-black text-lg items-center text-gray-600 pb-5 block">{currentId ? `Editing "${post.title}"` : 'Create a Request'}</label>
              <label class="font-semibold text-sm text-gray-600 pb-1 block">Item Name</label>
              <input name="itemName"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.itemName}
                placeholder='enter the details completely'
                onChange={(e) => setPostData({ ...postData, itemName: e.target.value })}
              />
              <label class="font-semibold text-sm text-gray-600 pb-1 block">Quantity</label>
              <input name="quantity"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.quantity}
                onChange={(e) =>
                  setPostData({ ...postData, quantity: e.target.value })
                } />

              <label class="font-semibold text-sm text-gray-600 pb-1 block">Request Time in Days</label>
              <input name="requestTime"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.requestTime}
                onChange={(e) =>
                  setPostData({ ...postData, requestTime: e.target.value })
                } />
              <label class="font-semibold text-sm text-gray-600 pb-1 block">Reason</label>
              <input name="reason"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.reason}
                onChange={(e) =>
                  setPostData({ ...postData, reason: e.target.value })
                } />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">remarks</label>
              <input name="remarks"
                type="text"
                class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={postData.remarks}
                onChange={(e) =>
                  setPostData({ ...postData, remarks: e.target.value })
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
      <Footer/>
    </div>
  )
}

export default Portal
