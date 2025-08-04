import React, { useState, useEffect } from 'react';
import { MerchWeb } from '../utils/constants'; // Import MerchWeb from constants

const Blog = ({ setActivePage }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const restApiUrl = MerchWeb.rest_url + 'wp/v2/posts?_embed&per_page=6';
                const response = await fetch(restApiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setError('Failed to load blog posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogPosts();
    }, []);

    return (
        <section id="blog" className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Latest Thoughts & Insights</h1>

                {loading && <p className="text-center text-gray-600 text-lg">Loading blog posts...</p>}
                {error && <p className="text-center text-red-600 text-lg">{error}</p>}

                {!loading && !error && posts.length === 0 && (
                    <p className="text-center text-gray-600 text-lg">No blog posts found.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
                            <img
                                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/400x250/E0E0E0/333333?text=No+Image'}
                                alt={post.title.rendered}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h5 className="text-xl font-bold mb-2 text-gray-800">{post.title.rendered}</h5>
                                <p className="text-gray-600 text-sm mb-3">
                                    By {post._embedded?.author?.[0]?.name || 'Unknown Author'} | {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <div className="text-gray-700 text-base mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                <button
                                    onClick={() => setActivePage(`single-post?post_id=${post.id}`)}
                                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
