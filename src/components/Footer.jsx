import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (

    <footer className="bg-gray-900 z-100 text-gray-100 pt-10 pb-6 shadow-2xl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div>
            <h5 className="text-xl font-bold mb-4">Get in Touch</h5>
            <ul className="text-sm space-y-3">
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <a href="mailto:zia@brightfuturei.com" className="hover:underline">
                  zia@brightfuturei.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3" />
                <a href="tel:+8801327227048" className="hover:underline">
                  +8801327227048
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                Mirpur-12, Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h5 className="text-xl font-bold mb-4">Follow Me</h5>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://www.facebook.com/ziayouright" target="_blank" rel="noreferrer">
                <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 text-white">
                  <Facebook className="w-5 h-5" />
                </button>
              </a>
              <a href="https://www.instagram.com/ziayouright" target="_blank" rel="noreferrer">
                <button className="p-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:scale-105 transition-transform text-white">
                  <Instagram className="w-5 h-5" />
                </button>
              </a>
              <a href="https://www.linkedin.com/in/ziaul-haque-40b23a241" target="_blank" rel="noreferrer">
                <button className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-transform transform hover:scale-105 text-white">
                  <Linkedin className="w-5 h-5" />
                </button>
              </a>
            </div>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom Line */}
        <div className="text-center text-xs text-gray-400">
          © 2025 <strong className="text-white">Ziaul Haque</strong> — All Rights Reserved | Apparel Merchandiser & Web Solutions
        </div>
      </div>
    </footer>
  );
};

export default Footer;
