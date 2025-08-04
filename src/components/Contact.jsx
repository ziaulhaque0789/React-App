import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending message (you can replace this with actual API call)
    setTimeout(() => {
      setResponse('✅ Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="py-5 text-white font-sans"
      style={{ background: 'linear-gradient(135deg, #8BC34A, #2c5364, #4CAF50)' }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <main className="bg-white bg-opacity-95 text-gray-800 rounded-xl shadow-xl p-6 md:p-10 mt-10">
          <h2 className="text-center text-2xl md:text-4xl font-bold text-gray-800 border-b border-gray-300 pb-3 mb-8">
            Contact Me – Let’s Build Something Together
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">I'd Love to Hear From You</h3>
              <p className="mb-4">
                Have a project in mind? Need advice? Or just want to say hi?
                Don’t hesitate—I'm always happy to connect.
              </p>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:zia@brightfuturei.com" target="_blank" rel="noopener noreferrer">
                    <button className="w-full btn border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded flex items-center justify-start gap-2">
                      <i className="bi bi-envelope text-black"></i> zia@brightfuturei.com
                    </button>
                  </a>
                </li>
                <li>
                  <a href="tel:+8801327227048" target="_blank" rel="noopener noreferrer">
                    <button className="w-full btn border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded flex items-center justify-start gap-2">
                      <i className="bi bi-telephone text-black"></i> +88 01327227048
                    </button>
                  </a>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/Jf8cYmEV6FKsjPVx8" target="_blank" rel="noopener noreferrer">
                    <button className="w-full btn border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded flex items-center justify-start gap-2">
                      <i className="bi bi-geo-alt text-black"></i> Mirpur-12, Dhaka, Bangladesh
                    </button>
                  </a>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/Jf8cYmEV6FKsjPVx8" target="_blank" rel="noopener noreferrer">
                    <button className="btn border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
                      View Location on Map
                    </button>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded shadow-md">
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="name" className="block font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-semibold mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  ></textarea>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                    Send Message
                  </button>
                </div>
              </form>

              {response && (
                <div id="response" className="mt-3 text-green-600 text-center font-semibold">
                  {response}
                </div>
              )}
            </div>
          </div>
        </main>

        <div className="text-center py-6">
          <a href="https://brightfuturei.com/">
            <button className="btn bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
              Return to Home
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
