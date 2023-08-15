import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../actions/auth';
import Navbar from '../Navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import decode from "jwt-decode";
import logo from '../../assets/aeromedelling.jpg';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import { acceptRequest, getRequests, rejectRequest } from '../../actions/requests';
import moment from 'moment';
import Footer from '../Footer/Footer';


const UserProfile = ({ }) => {
    const userdata = useSelector(state => state.authReducer.userData);


    const { id } = useParams();
    useEffect(() => {
        dispatch(userProfile(id));
    }, [id]);
    console.log(userdata)
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/');
        setUser(null);
    }
    useEffect(() => {
        dispatch(getRequests());
    }, []);
    const requests = useSelector(state => state.requests);
    const filteredRequests = requests.requests.filter(request => request.requestedBy === user?.result?._id);

    console.log(requests)

    if (userdata._id !== id) {
        Object.keys(userdata).forEach((key) => {
            userdata[key] = null;
        });
    }
    console.log(user)
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="relative z-20">
                <Navbar />
            </div>

            <div className="bg-gray-100 justify-center min-h-screen ">
                <div class="p-16">
                    <div class="p-8 bg-white shadow mt-4">
                        <div className="flex justify-center items-center">

                        </div>
                        <div class="relative z-30">
                            <div class="w-24 h-24 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div class="mt-10 text-center border-b pb-12">
                            <h1 class="text-4xl font-medium text-black">{userdata?.name}</h1>


                            <p class="text-gray-800 mt-3 font-normal">Level : {userdata?.post}</p>


                        </div>
                        <p class="text-gray-800 text-center font-light lg:px-16">
                            <h1 className="text-center text-2xl mt-2 text-black font-semibold">Description</h1>
                            {userdata?.description}

                        </p>
                        {(user?.result.post === "Admin" && userdata?._id === user?.result?._id && user?.result) && (
                            <>
                                <div class="mt-10 text-center border-b pb-12"></div>
                                <h1 class="text-xl text-center font-medium text-black">Create A Project Post</h1>
                                <Form currentId={currentId} setCurrentId={setCurrentId} />

                            </>
                        )}

                        {(userdata?.post === "Admin" && userdata?._id === user?.result?._id && user?.result) && (
                            <>
                                <div class="mt-10 text-center border-b pb-12">

                                </div>
                                <h1 className="text-center text-2xl mt-2 text-black font-semibold">Admin Powers</h1>
                                <h1 class="text-l text-center font-medium text-gray-500">Note : The word "Admin" is case sensitive and cannot be used often!</h1>
                                <div class="mt-1 flex flex-col justify-center">

                                    <div class="flex mt-10 gap-5 justify-center">
                                        <Link to="/createExecutive">
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
                                        </Link>

                                        <Link to="/blogCreate">
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create A Blog</button>
                                        </Link>
                                    </div>



                                    <div>
                                        <div>
                                            <h1 className="text-center text-2xl mt-5 text-black font-semibold">Requests For Items</h1>
                                            {requests.requests.map((row) => (
                                                <>
                                                    <div class="mt-1  border-b pb-12">

                                                        <div class="shadow-lg rounded-lg border-black border-[2px] bg-white mx-auto m-8 p-4 notification-box">
                                                            <div class="text-sm pb-2">
                                                                <label class="font-semibold text-sm text-black pb-1 block">Requested By: {row.name}</label>

                                                                <label class="font-semibold text-sm text-black pb-1 block">Item To Be Issued : {row.itemName}</label>
                                                                <label class="font-semibold text-sm text-black pb-1 block">Quantity : {row.quantity}</label>
                                                                <label class="font-semibold text-sm text-black pb-1 block">Requested Time: {row.requestTime} Days</label>
                                                                <label class="font-semibold text-sm text-black pb-1 block">Reason : {row.reason}</label>
                                                                <label class="font-semibold text-sm text-black pb-1 block">Remark : {row.remarks}</label>
                                                                <label class="font-semibold text-sm text-black pb-1 block">Status : {row.requestStatus}</label>
                                                                {row.requestStatus === "Approved" ? 
                                                        (row.outTime !== 0 && (new Date(row.outTime) - new Date(row.inTime)) >= row.requestTime * 24 * 60 * 60 * 1000 ?
                                                         (<label class="font-semibold text-sm text-black pb-1 block">Return is Due</label>) :
                                                          (<label class="font-semibold text-sm text-black pb-1 block">Member still has time to submit</label>)) :
                                                           (row.requestStatus==="Declined")?(<label class="font-semibold text-sm text-black pb-1 block">You request has been rejected</label>):(row.requestStatus==="Approved and Returned"?(<label class="font-semibold text-sm text-black pb-1 block">The member as returned the equipment</label>):(<label class="font-semibold text-sm text-black pb-1 block">Do you want to accept this request</label>))}



                                                                {row.requestStatus === "Pending" ? (<div >
                                                                    <button onClick={() => { dispatch(acceptRequest(row._id)) }} class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white py-2.5 px-3 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                                                        <span class="inline-block mr-2">Approve</span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                                                            <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                        </svg>
                                                                    </button>
                                                                    <button onClick={() => { dispatch(rejectRequest(row._id)) }} class="transition duration-200 ms-5 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white py-2.5 px-3 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                                                        <span class="inline-block mr-2">Decline</span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                                                            <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                        </svg>
                                                                    </button>
                                                                </div>) : (<label class="font-semibold text-sm text-black pb-1 block"> {row.requestStatus}</label>)}


                                                            </div>

                                                        </div>

                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div >
                            </>
                        )}
                        {(userdata?._id === user?.result?._id && user?.result && userdata?.post !== "Admin") && (
                            <>
                                <div class="mt-1 text-center border-b pb-12">

                                </div>
                                <h1 className="text-center text-2xl mt-2 text-black font-semibold">Equipment Portal</h1>
                                <h1 class="text-l text-center font-medium text-gray-500">Note : Write The Equipment in Detials!</h1>
                                <div class="mt-1 flex flex-col justify-center">

                                    <div class="flex mt-10 gap-5 justify-center">
                                        <Link to="/createRequest">
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Request Items</button>
                                        </Link>

                                        <Link to="/submitItem">
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Items</button>
                                        </Link>
                                    </div>



                                    <div>

                                    </div>
                                </div >
                                <div>
                                    <h1 className="text-center text-2xl mt-5 text-black font-semibold">Requests Log</h1>
                                    {filteredRequests.map((row) => (
                                        <>
                                            <div class="mt-1  border-b pb-12">

                                                <div class="shadow-lg rounded-lg border-black border-[2px] bg-white mx-auto m-8 p-4 notification-box">
                                                    <div class="text-sm pb-2">
                                                        <label class="font-semibold text-sm text-black pb-1 block">Requested By: {row.name}</label>

                                                        <label class="font-semibold text-sm text-black pb-1 block">Item To Be Issued : {row.itemName}</label>
                                                        <label class="font-semibold text-sm text-black pb-1 block">Quantity : {row.quantity}</label>
                                                        <label class="font-semibold text-sm text-black pb-1 block">Requested Time: {row.requestTime} Days</label>
                                                        <label class="font-semibold text-sm text-black pb-1 block">Reason : {row.reason}</label>
                                                        <label class="font-semibold text-sm text-black pb-1 block">Remark : {row.remarks}</label>
                                                        <label class="font-semibold text-sm text-black pb-1 block">Status : {row.requestStatus}</label>
                                                        
                                                        {row.requestStatus === "Approved" ? 
                                                        (row.outTime !== 0 && (new Date(row.outTime) - new Date(row.inTime)) >= row.requestTime * 24 * 60 * 60 * 1000 ?
                                                         (<label class="font-semibold text-sm text-black pb-1 block">Return is Due</label>) :
                                                          (<label class="font-semibold text-sm text-black pb-1 block">Dont worry you still have time to submit</label>)) :
                                                           (row.requestStatus==="Declined")?(<label class="font-semibold text-sm text-black pb-1 block">You request has been rejected</label>):(<label class="font-semibold text-sm text-black pb-1 block">You request is sent</label>)}

                                                    </div>

                                                </div>

                                            </div>
                                        </>
                                    ))}
                                </div>
                            </>
                        )}







                    </div>
                </div>

            </div>
<Footer/>
        </div>
    )
}

export default UserProfile
