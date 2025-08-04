import React from 'react';

const Services = ({ setActivePage }) => {
    return (
        <section className="py-12 bg-gray-50" id="services">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">My Services</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* Merchandising Services */}
                    <div className="bg-white p-8 shadow-lg rounded-lg h-full border-l-4 border-blue-600">
                        <h3 className="text-3xl font-bold text-blue-600 mb-4">Apparel Merchandising Services</h3>
                        <p className="text-lg text-gray-700 mb-6">With strong planning and merchandising strategies, I provide you with services from the day after the order is confirmed to delivery,
                             so that your products do not go through any delays, avoid air shipments, and deliver quality garments on time.</p>
                        <ul className="list-none p-0 space-y-4">
                            <li className="flex items-start text-gray-800">
                                <span className="text-green-500 text-xl mr-3">✅</span>
                                <div>
                                    <strong className="font-semibold">Product Sourcing:</strong> Connect with reliable factories at competitive prices.
                                </div>
                            </li>
                            <li className="flex items-start text-gray-800">
                                <span className="text-green-500 text-xl mr-3">✅</span>
                                <div>
                                    <strong className="font-semibold">Order & Production Management:</strong> Timely follow-ups, approvals, and updates — every step of the way.
                                </div>
                            </li>
                            <li className="flex items-start text-gray-800">
                                <span className="text-green-500 text-xl mr-3">✅</span>
                                <div>
                                    <strong className="font-semibold">Costing & Negotiation:</strong> Realistic pricing based on market conditions.
                                </div>
                            </li>
                            <li className="flex items-start text-gray-800">
                                <span className="text-green-500 text-xl mr-3">✅</span>
                                <div>
                                    <strong className="font-semibold">Buyer Communication:</strong> Smooth handling of tech packs, revisions, and delivery plans.
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Web Solutions */}
                    <div className="bg-white p-8 shadow-lg rounded-lg h-full border-l-4 border-green-600">
                        <h3 className="text-3xl font-bold text-green-600 mb-4">Web Development & Digital Solutions</h3>
                        <p className="text-lg text-gray-700 mb-6">I build responsive, fast, and user-friendly websites tailored to your brand or business. Whether you're a startup, small business, or personal brand — I help you stand out online with clean code and modern design.</p>
                        <ul className="list-none p-0 space-y-4">
                            <li className="flex items-start text-gray-800">
                                <span className="text-blue-500 text-xl mr-3">💻</span>
                                <div>
                                    <strong className="font-semibold">Custom Website Development:</strong> Using React, Bootstrap, or WordPress to match your goals.
                                </div>
                            </li>
                            <li className="flex items-start text-gray-800">
                                <span className="text-blue-500 text-xl mr-3">💌</span>
                                <div>
                                    <strong className="font-semibold">HTML Email Templates:</strong> Mobile-friendly designs that work across all major platforms.
                                </div>
                            </li>
                            <li className="flex items-start text-gray-800">
                                <span className="text-blue-500 text-xl mr-3">🧩</span>
                                <div>
                                    <strong className="font-semibold">Landing Pages & Portfolios:</strong> Designed to convert and showcase your work beautifully.
                                </div>
                            </li>
                            <li className="flex items-start text-gray-800">
                                <span className="text-blue-500 text-xl mr-3">🛠️</span>
                                <div>
                                    <strong className="font-semibold">Ongoing Support:</strong> Need edits or fixes? I’m just a message away.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => setActivePage('contact')} // Link to contact page
                        className="px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Let's Work Together
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;
