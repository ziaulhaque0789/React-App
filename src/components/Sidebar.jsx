import React from 'react';
import { Home, Settings, Layers, DollarSign, LineChart, Info, Phone, FileText, Grid } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage, isOffcanvasOpen, toggleOffcanvas }) => {
    const navItems = [
        { name: 'Home', path: 'home', icon: <Home className="w-5 h-5" /> },
        { name: 'Services', path: 'services', icon: <Settings className="w-5 h-5" /> },
        { name: 'Fabric Consumption', path: 'consumption', icon: <Layers className="w-5 h-5" /> },
        { name: 'Cm', path: 'cm', icon: <DollarSign className="w-5 h-5" /> },
        { name: 'Yarn Count', path: 'yarnCount', icon: <LineChart className="w-5 h-5" /> },
        { name: 'Costing', path: 'costing', icon: <DollarSign className="w-5 h-5" /> },
        { name: 'Tna', path: 'tna', icon: <Grid className="w-5 h-5" /> },
        { name: 'About Me', path: 'aboutMe', icon: <Info className="w-5 h-5" /> },
        { name: 'Contact Me', path: 'contact', icon: <Phone className="w-5 h-5" /> },
        { name: 'Blog', path: 'blog', icon: <FileText className="w-5 h-5" /> },
    ];

    const renderNavLinks = (isMobile = false) => (
        <ul className={`flex flex-col mt-4 space-y-1`}> 
            {navItems.map((item) => (
                <li key={item.path}>
                    <a
 href="https://brightfuturei.com/"
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 group cursor-pointer 
                        ${activePage === item.path
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100 hover:shadow-md hover:text-blue-600'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setActivePage(item.path);
                            if (isMobile) toggleOffcanvas();
                        }}
                    >
                        <span className="transition-transform duration-300 group-hover:scale-110">
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                    </a>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="hidden lg:block fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-white shadow-xl rounded-tr-2xl rounded-br-2xl p-5 border-r border-gray-200 z-30">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Navigation</h2>
                {renderNavLinks()}
            </nav>

            {/* Mobile Offcanvas Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl transform ${isOffcanvasOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 lg:hidden rounded-tr-2xl rounded-br-2xl`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h5 className="text-lg font-semibold text-blue-700">Menu</h5>
                    <button onClick={toggleOffcanvas} className="text-gray-600 hover:text-red-500 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    {renderNavLinks(true)}
                </div>
            </div>
            {isOffcanvasOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleOffcanvas}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
