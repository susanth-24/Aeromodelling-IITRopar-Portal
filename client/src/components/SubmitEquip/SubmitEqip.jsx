import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { getRequests, submitEqip } from '../../actions/requests';
import Footer from '../Footer/Footer';

const SubmitItem = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const [returnId, setReturnId] = useState(0);
  //const requestData=useSelector(state)
  const requestData = useSelector((state) => returnId ? state.requests.requests.find((p) => p._id === returnId) : null);
  const [reqData, setReqData] = useState({
    remarks: requestData?.remarks || '',
  });
  console.log(requestData)
  console.log(returnId)
  useEffect(() => {
    dispatch(getRequests());
  }, []);
  const clear = () => {
    setReturnId(0);
    setReqData({ remarks: "" })
  }
  const requests = useSelector(state => state.requests);
  const filteredRequests = requests.requests.filter(request => request.requestedBy === user?.result?._id);
  console.log(filteredRequests);
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(submitEqip(returnId, { ...reqData, name: user?.result?.name }));
    clear();

  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div>
        <h1 className="text-center text-2xl mt-2 text-black font-semibold">Your Requests</h1>
        <h1 className="text-center text-1xl mt-2 text-black font-semibold">Please click on the button to submit the equipment</h1>
        <div>
          {filteredRequests.map((row) => (
            <>
              <div class="mt-1 px-5 border-b pb-12">

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
                      (row.requestStatus === "Declined") ? (<label class="font-semibold text-sm text-black pb-1 block">You request has been rejected</label>) : (row.requestStatus === "Approved and Returned") ? (<label class="font-semibold text-sm text-black pb-1 block">You have submitted the equipment</label>) : (<label class="font-semibold text-sm text-black pb-1 block">You request has been sent</label>)}
                    {row.requestStatus === "Approved and Returned" ? (
                      <label class="font-semibold text-sm text-black pb-1 block">You have returned the equipment</label>
                    ) : row.requestStatus === "Declined" ? (
                      null
                    ) : (row.requestStatus==="Approved"?(
                      <button
                        onClick={() => {
                          //console.log(post._id)
                          setReturnId(row._id)
                          //navigate(`/profile/${user?.result?._id}`)
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }}
                        class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white py-2.5 px-3 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                      >
                        <span class="inline-block mr-2">Submit Equipment</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                          <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    ):(                      <label class="font-semibold text-sm text-black pb-1 block">The approval is still pending</label>
                    )
                      
                    )}


                  </div>

                </div>

              </div>
            </>
          ))}
        </div>
      </div>
      <div>
        {returnId !== 0 ? (
          <>
            <div className="bg-white">
              <form autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="w-full flex justify-center py-10">
                  <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 mt-10  rounded-xl border-2 border-black">
                    <div className="px-5 py-7 w-full">
                      <label class="font-black text-lg items-center text-gray-600 pb-5 block">{`Returning ${requestData.itemName}`}</label>
                      <label class="font-black text-lg items-center text-gray-600 pb-5 block">{`Returning Quantity ${requestData.quantity}`}</label>


                      <label class="font-semibold text-sm text-gray-600 pb-1 block">Remarks</label>
                      <input name="remarks"
                        type="url"
                        class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                        value={reqData.remarks}
                        placeholder="Only input the drive link"
                        onChange={(e) =>
                          setReqData({ ...reqData, remarks: e.target.value })
                        } />

                    </div>
                  </div>
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

              </form>
            </div>
          </>
        ) : null}
      </div>
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default SubmitItem;
