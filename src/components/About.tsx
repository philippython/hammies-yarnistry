import React from 'react';
import { Heart, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Crafted with
              <span className="text-rose-500"> Love</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Hammies Yarnistry, every piece tells a story of passion, patience, and artisanal excellence. 
              We believe that handmade items carry a special warmth that mass-produced goods simply cannot match.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Made with Love</h3>
                  <p className="text-gray-600">Every stitch is crafted with care and attention to detail</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
                  <p className="text-gray-600">Using only the finest yarns and materials for lasting beauty</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Touch</h3>
                  <p className="text-gray-600">Custom designs and personal consultations available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1619608155967-7a5058b2a963?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Crocheting hands"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-rose-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;