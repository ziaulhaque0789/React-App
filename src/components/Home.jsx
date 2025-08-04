import React from 'react';

const Home = ({ setActivePage }) => {
    return (
        <section className="py-10 mt-4 text-center md:text-left bg-gray-800 text-white rounded-lg shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">

 <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                        <img src="https://brightfuturei.com/wp-content/uploads/2025/07/me-black-shirt.jpg" alt="Apparel and Web Consultant" className="w-full max-w-md rounded-lg shadow-xl" />
                    </div>

                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Expert in<br className="hidden md:block" /> <span className="text-blue-400">Apparel Merchandising</span>
                        </h1>
                        <p className="text-lg mt-4">
                            If you are looking for a merchandiser who will help you grow your business through responsibility, dedication, and smart strategies <span className="text-blue-400">- then you've come to the right place.</span>
                        </p>
                        <p className="text-lg mt-4">
                            Let's work together to create something exceptional ! <span className="text-blue-400">-Your success is my priority.</span>
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => setActivePage('services')}
                                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
                            >
                                Get Free Consultation
                            </button>
                        </div>
                    </div>
                   
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 mt-12 bg-white text-gray-800 rounded-lg shadow-inner">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Why Choose Me</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Experience */}
                    <div className="p-6 shadow-md h-full bg-white rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-bold text-lg mb-2">
                            <i className="bi bi-patch-check-fill text-blue-500 mr-2"></i>13+ Years in Apparel Merchandising
                        </h5>
                        <p className="text-gray-700">I bridge the gap between buyers and factories — making sure products are right, timelines are tight, and costs stay under control. <span className="font-bold">I have the skill to get work done through others — efficiently and effectively.</span></p>
                    
                    
                    </div>

                    {/* Web Dev Skill */}
                    <div className="p-6 shadow-md h-full bg-white rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-bold text-lg mb-2">
                            <i className="bi bi-laptop-fill text-blue-500 mr-2"></i>Modern Web Development Expertise
                        </h5>
                        <p className="text-gray-700">From building professional websites to responsive HTML email templates, I use the latest tools like React, Tailwind, and Bootstrap to bring your brand online — beautifully and efficiently.</p>
                    </div>

                    {/* Real-World Perspective */}
                    <div className="p-6 shadow-md h-full bg-white rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-bold text-lg mb-2">
                            <i className="bi bi-lightbulb-fill text-blue-500 mr-2"></i>A Practical, Business-Focused Mindset
                        </h5>
                        <p className="text-gray-700">I don’t just offer ideas — I make sure they work. From reducing lead times to building your online presence, I focus on what gets real results for your business.</p>
                    </div>

                    {/* One-on-One Support */}
                    <div className="p-6 shadow-md h-full bg-white rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-bold text-lg mb-2">
                            <i className="bi bi-person-fill text-blue-500 mr-2"></i>Personalized, Honest Support
                        </h5>
                        <p className="text-gray-700">You’ll work directly with me — not an agency or middleman. I’m committed to transparency, fast communication, and building long-term partnerships you can count on.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
