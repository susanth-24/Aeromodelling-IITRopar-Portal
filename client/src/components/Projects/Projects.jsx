import React from 'react'
import Project from './Project/Project'
import { useSelector } from 'react-redux';
const Projects = ({ setCurrentId }) => {
    const {posts,isLoading}=useSelector((state)=>state.posts);
    if (!posts.length && !isLoading) return 'No Posts';
    const ongoingPosts = posts.filter((post) => post.status === 'Ongoing' ||post.status === 'ongoing');
    const completedPosts = posts.filter((post) => post.status === 'Completed' || post.status === 'completed');
    const upcommingPosts = posts.filter((post) => post.status === 'Upcomming' || post.status === 'Upcomming');
    console.log(setCurrentId)

  return (
    <>
        
    <div>
      <p className="text-center text-3xl mt-2 text-black font-semibold">Ongoing Projects</p>

      {ongoingPosts.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">Coming Soon</p>
      ) : (
        <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {ongoingPosts.map((post) => (
            <div key={post._id}>
              <Project post={post} setCurrentId={setCurrentId} />
            </div>
          ))}
        </div>
      )}
    </div>
    <div>
      <p className="text-center text-3xl mt-2 text-black font-semibold">Upcoming Projects</p>

      {upcommingPosts.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">Coming Soon</p>
      ) : (
        <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {upcommingPosts.map((post) => (
            <div key={post._id}>
              <Project post={post} setCurrentId={setCurrentId} />
            </div>
          ))}
        </div>
      )}
    </div>
    <div>
      <p className="text-center text-3xl mt-2 text-black font-semibold">Completed Projects</p>

      {completedPosts.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">Coming Soon</p>
      ) : (
        <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {completedPosts.map((post) => (
            <div key={post._id}>
              <Project post={post} setCurrentId={setCurrentId} />
            </div>
          ))}
        </div>
      )}
    </div>
    
    </>
  )
}

export default Projects
