import React from 'react'
import logo from '../../assets/aeromedelling.jpg';
import { Link } from 'react-router-dom';

const StartPage = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <div className="bg-gray-100 justify-center min-h-screen ">
            <div class="p-16">
                <div class="p-8 bg-white shadow mt-4">
                    <div className="flex justify-center items-center">
                        <div className="items-center">
                            <img src={logo} alt="logo" className="h-[150px] object-contain rounded-full" />
                        </div>
                    </div>

                    <div class="mt-10 text-center border-b pb-12">
                        <h1 class="text-4xl font-medium text-black">Aeromodelling Club</h1>
                    </div>

                    <div class="mt-12 flex flex-col justify-center">
                        <p class="text-gray-800 text-center font-light lg:px-16">
                            Welcome to Aeromodelling Club of Indian Institute of Technology Ropar.
                            Established in 2017, a vibrant community where the skies are no longer
                            the limit. Nestled amidst the thrill of soaring planes and the camaraderie
                            of aviation enthusiasts, our club is a haven for anyone passionate about aeromodelling,
                            RC planes, Jet Engines and Automated Drones.

                        </p>
                        <div class="flex mt-20 gap-5 justify-center">
                            <Link to="/projects">
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Explore Projects</button>
                            </Link>

                            <Link to="/blogs">
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Explore Blogs</button>
                            </Link>
                        </div>



                        <div>

                        </div>
                    </div >

                </div>
            </div>
        </div>
    )
}

export default StartPage