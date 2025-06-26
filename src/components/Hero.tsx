import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d946ef' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='45' cy='15' r='2'/%3E%3Ccircle cx='15' cy='45' r='2'/%3E%3Ccircle cx='45' cy='45' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-100">
        <Heart className="w-8 h-8 text-rose-300 opacity-60" />
      </div>
      <div className="absolute top-32 right-16 animate-bounce delay-300">
        <Sparkles className="w-6 h-6 text-purple-300 opacity-60" />
      </div>
      <div className="absolute bottom-40 left-20 animate-bounce delay-500">
        <Heart className="w-6 h-6 text-pink-300 opacity-60" />
      </div>
      <div className="absolute bottom-32 right-12 animate-bounce delay-700">
        <Sparkles className="w-8 h-8 text-rose-300 opacity-60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-6 tracking-tight">
            Hammies
          </h1>
          <h2 className="text-4xl md:text-5xl font-light text-gray-700 mb-8 tracking-wide">
            Yarnistry
          </h2>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light leading-relaxed animate-fadeIn delay-300">
          Where every stitch tells a story of love, warmth, and artisanal beauty
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeIn delay-500">
          <button 
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-rose-500 hover:to-pink-600"
          >
            Explore Collection
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-medium text-lg hover:border-rose-400 hover:text-rose-500 transition-all duration-300 hover:scale-105"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;