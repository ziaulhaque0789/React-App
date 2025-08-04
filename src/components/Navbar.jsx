import React from 'react';
import instagramIcon from '../assets/icons/instagram.svg';

// Navbar Component
const Navbar = ({ toggleOffcanvas }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-md ">
            <div className="container mx-auto flex flex-wrap items-center justify-between p-4 lg:px-8">
                {/* Mobile Toggler */}
                <button
                    className="block lg:hidden text-white focus:outline-none"
                    onClick={toggleOffcanvas}
                >
                    <span className="sr-only">Open menu</span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Brand */}
                <a className="text-xl font-bold ml-2" href="https://brightfuturei.com/">Merchan & Web</a>

                {/* Social Icons - Visible on all screen sizes */}
                <div className="flex items-center space-x-2 mt-2 lg:mt-0">
                    <a href="https://www.facebook.com/ziayouright" target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-md bg-[#1877F2] text-white hover:opacity-90 transition-opacity">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 
                            9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 
                            3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 
                            0-1.63.771-1.63 1.562V12h2.773l-.443 
                            2.89h-2.33V22C17.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/ziayouright" target="_blank" rel="noopener noreferrer"
   className="p-2 rounded-md  hover:opacity-90 transition-opacity">
   <img src={instagramIcon} alt="Instagram" className="w-9 h-9" />
</a>
                    <a href="https://www.linkedin.com/in/ziaul-haque-40b23a241" target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-md bg-[#0077B5] text-white hover:opacity-90 transition-opacity">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 
                            0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 
                            0 0020.5 2zM8 19H5v-9h3zM6.5 
                            8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 
                            016.5 8.25zM19 19h-3v-4.75c0-1.76-.75-2.25-2-2.25s-2 
                            1.5-2 2.25V19h-3V10h3v1.5c.75-1 2-2.5 
                            3-2.5 2.25 0 3 1.5 3 4.25V19z" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
