import React, { useState, useEffect } from 'react';
import { MerchWeb } from '../utils/constants'; // Import MerchWeb from constants

const SinglePost = ({ postId, setActivePage }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const restApiUrl = `${MerchWeb.rest_url}wp/v2/posts/${postId}?_embed`;
                const response = await fetch(restApiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (err) {
                console.error('Error fetching single post:', err);
                setError('Failed to load post content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId]);

    if (loading) return <p className="text-center text-gray-600 text-lg mt-10">Loading post...</p>;
    if (error) return <p className="text-center text-red-600 text-lg mt-10">{error}</p>;
    if (!post) return <p className="text-center text-gray-600 text-lg mt-10">Post not found.</p>;

    const author = post._embedded?.author?.[0]?.name || 'Unknown Author';
    const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const categories = post._embedded?.['wp:term']?.[0]?.map(term => term.name).join(', ') || 'Uncategorized';
    const tags = post._embedded?.['wp:term']?.[1]?.map(term => term.name).join(', ') || 'No Tags';
    const thumbnailUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

    return (
        <section id="single-post" className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <article className="blog-single-post">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{post.title.rendered}</h1>
                    <p className="text-gray-600 text-sm mb-6">
                        By {author} | Published on {date} | Categories: {categories}
                    </p>
                    {thumbnailUrl && (
                        <img src={thumbnailUrl} className="w-full h-auto object-cover rounded-lg mb-8 shadow-md" alt={post.title.rendered} loading="lazy" />
                    )}
                    <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                    <p className="text-gray-600 text-sm mt-8">Tags: {tags}</p>
                </article>

                <div className="mt-10">
                    <button
                        onClick={() => setActivePage('blog')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                        ← Back to Blog
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SinglePost;
