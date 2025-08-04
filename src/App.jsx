import React, { useState, useEffect, useCallback } from 'react';

// Import all your individual components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Services from './components/Services';
import Consumption from './components/Consumption';
import Cm from './components/Cm';
import YarnCount from './components/YarnCount';
import Costing from './components/Costing';
import Tna from './components/Tna';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Blog from './components/Blog';
import SinglePost from './components/SinglePost';
import Footer from './components/Footer';


// Helper for dynamic content (simulates wp_localize_script for a standalone app)
// In a real WordPress React theme, these would be passed from PHP.
export const MerchWeb = {
    partials_url: '/', // Assuming partials are at the root for a standalone React app
    home_partial: 'home', // 'home' will map to the Home component
    rest_url: 'https://brightfuturei.com/wp-json/', // Your WordPress REST API URL
};

// --- Main App Component ---
export default function App() {
    const [activePage, setActivePage] = useState(MerchWeb.home_partial);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [postId, setPostId] = useState(null); // State to hold postId for SinglePost

    const toggleOffcanvas = useCallback(() => {
        setIsOffcanvasOpen((prev) => !prev);
    }, []);

    // Effect to handle routing based on activePage
    useEffect(() => {
        // This is a simplified "routing" for the SPA.
        // For actual browser history and URLs, you'd use React Router.
        // Here, we just ensure the correct component is rendered.
        if (activePage.startsWith('single-post')) {
            const urlParams = new URLSearchParams(activePage.split('?')[1]);
            setPostId(urlParams.get('post_id'));
        } else {
            setPostId(null); // Clear postId if not on a single post page
        }
    }, [activePage]);

    const renderPageContent = () => {
        switch (activePage) {
            case 'home':
                return <Home setActivePage={setActivePage} />;
            case 'services':
                return <Services setActivePage={setActivePage} />;
            case 'consumption':
                return <Consumption />;
            case 'cm':
                return <Cm />;
            case 'yarnCount':
                return <YarnCount />;
            case 'costing':
                return <Costing />;
                  case 'tna':
                return <Tna />;
            case 'aboutMe':
                return <AboutMe />;
            case 'contact':
                return <Contact />;
            case 'blog':
                return <Blog setActivePage={setActivePage} />;
            case 'single-post': // This case handles the base 'single-post' route
                return <SinglePost postId={postId} setActivePage={setActivePage} />;
            default:
                return <Home setActivePage={setActivePage} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Navbar toggleOffcanvas={toggleOffcanvas} />
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                isOffcanvasOpen={isOffcanvasOpen}
                toggleOffcanvas={toggleOffcanvas}
            />

            <main className="lg:ml-64 pt-14"> {/* Adjusted padding-top for fixed navbar */}
                <div className="p-4">
                    {renderPageContent()}
                </div>
                <Footer/>
            </main>
           
        </div>
    );
}
