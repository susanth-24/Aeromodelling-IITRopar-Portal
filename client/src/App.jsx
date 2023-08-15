import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import StartPage from './components/StartPage/StartPage'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import UserProfile from './components/Profile/UserProfile'
import Signup from './components/Auth/Signup'
import ProjectDetails from './components/ProjectDetails/ProjectDetails'
import Blog from './components/Blog/Blog'
import BlogPage from './components/BlogPage/BlogPage'
import RealBlog from './components/Blog/RealBlog'
import Portal from './components/Portal/Portal'
import SubmitItem from './components/SubmitEquip/SubmitEqip'



function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="/projects" element={<Home/>}/>
        <Route path="/auth"  Component={() => !user ? <Auth /> : <Navigate to="/" />} />
        <Route path="/createExecutive"  Component={() => user?.result?.post==="Admin" &&user?.result?.email==="aeromodelling@iitrpr.ac.in" ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/blogCreate" Component={() => user?.result?.post==="Admin" ||user?.result?.post==="Executive_01" ? <Blog /> : <Navigate to="/Projects" /> }/>
        <Route path="/blogs" element={<BlogPage/>}/>
        <Route path="/blogs/:id" element={<RealBlog/>}/>
        <Route path="/blogs/search"  element={<BlogPage />} />
        <Route path="/projects/search"  element={<Home />} />
        <Route path="/createRequest" Component={() => user ? <Portal /> : <Navigate to="/" />}/>
        <Route path="/submitItem" Component={() => user ? <SubmitItem /> : <Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
