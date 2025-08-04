import React from 'react';

const AboutMe = () => {
    return (
    <>
      {/* Hero Section */}
      <section className="py-5 my-5 text-white" style={{ background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            {/* TEXT CONTENT */}
            <div className="lg:w-1/2 text-start">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-cyan-400">Two Worlds. One Vision.</h1>
              <p className="text-lg mb-3">I am not just a merchandiser or a web developer - I am both. I blend the creativity of digital design with the accuracy of the apparel supply chain to deliver real world impact.</p>
              <p className="text-lg text-yellow-400 font-semibold">From order confirmation to final shipment, and from clean code to captivating UI — I own the journey.</p>
              <h2 className="mt-4">
                <span className="block text-green-400 font-bold text-3xl">Positive Thinking</span>
                <span className="block text-white text-2xl">Breeds Success</span>
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="https://brightfuturei.com/resume/" className="btn btn-outline-light border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">View My Resume</a>
                <a href="https://brightfuturei.com/merchandiser-sop/" className="btn btn-outline-warning border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition">S.O.P (Merchandising)</a>
              </div>
            </div>

            {/* IMAGE */}
            <div className="lg:w-1/2 text-center mt-8 lg:mt-0">
              <img src="https://brightfuturei.com/wp-content/uploads/2025/07/me.png" alt="Ziaul Haque" className="mx-auto rounded shadow-lg border-4 border-white max-w-xs lg:max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Get to Know Section */}
      <section className="py-5 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-bold text-2xl border-b-4 border-cyan-500 pb-2">Get to Know Me More</h2>
          <p className="text-lg text-center mt-2">I work in a competitive but friendly environment where hard work and dedication are valued. I am here to build lasting value—for your brand and for your backend, helping both myself and the company succeed.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Experience Image */}
            <div className="bg-gray-800 rounded p-4">
              <img src="https://brightfuturei.com/wp-content/uploads/2025/07/me-black-shirt.jpg" alt="Merchandising Journey" className="rounded shadow-lg" />
            </div>

            {/* About Me */}
            <div className="bg-white rounded p-4 shadow">
              <h3 className="text-xl font-bold text-gray-800">About Me</h3>
              <h4 className="text-2xl text-gray-500">Who is <span className="text-blue-600">Ziaul Haque</span></h4>
              <p className="mt-3 text-base">I have experience in apparel merchandising of a few knit garments factories about 16 years. <span className="font-bold">I am an expert in the planning and implementation of merchandising strategies.</span> I have experience of product development, sourcing, and dealing with worldwide, especially European customers. I also have experience in handling a large variety of knit products like men's, ladies, boy's, girl's, kid’s tops & bottoms, outerwear, rompers etc.</p>
              <p className="font-bold mt-2">I also build and maintain web applications that solve real business problems in the garment supply chain.</p>
              <p className="text-blue-600 font-semibold">I bridge strategy and execution—from costing sheets to CSS sheets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-5 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-blue-600 font-bold text-3xl mb-8">Skills</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Skill Card */}
            <div className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-semibold">Merchandising</h3>
              <p>Coordinating production and delivery with precision.</p>
              <span className="block text-right">97%</span>
              <div className="w-full bg-gray-200 rounded h-2 mt-1">
                <div className="bg-green-500 h-2 rounded" style={{ width: '97%' }}></div>
              </div>
            </div>

            <div className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-semibold">HTML</h3>
              <p>Crafting responsive, accessible layouts with clean markup.</p>
              <span className="block text-right">90%</span>
              <div className="w-full bg-gray-200 rounded h-2 mt-1">
                <div className="bg-cyan-500 h-2 rounded" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-semibold">CSS</h3>
              <p>Designing fluid interfaces with scalable styles.</p>
              <span className="block text-right">80%</span>
              <div className="w-full bg-gray-200 rounded h-2 mt-1">
                <div className="bg-blue-500 h-2 rounded" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-semibold">JavaScript</h3>
              <p>Adding interactivity and logic to web experiences.</p>
              <span className="block text-right">65%</span>
              <div className="w-full bg-gray-200 rounded h-2 mt-1">
                <div className="bg-yellow-400 h-2 rounded" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return to Home Button */}
      <div className="text-center py-6">
        <a href="https://brightfuturei.com/">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition">Return to Home</button>
        </a>
      </div>
    </>
  );
};


export default AboutMe;
