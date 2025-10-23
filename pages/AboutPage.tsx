
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-brand-lavender/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-text">The Heart Behind the Art</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the story of Parul, the passion, and the process that brings each unique piece to life.
          </p>
        </div>
      </div>
      
      {/* Parul's Story */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/id/1027/800/1000" 
              alt="Artist Parul" 
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif font-bold mb-4">A Journey of Creation</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              From a young age, I've always been captivated by the magic of creating something beautiful with my own hands. What started as a simple hobby, a way to pour my heart onto a canvas or into clay, has blossomed into HandMadebyParul.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Every piece in this collection is a part of my story. It’s a reflection of late-night inspirations, happy accidents, and the joy of seeing an idea come to fruition. I believe that handmade items carry a unique energy and warmth that mass-produced goods simply cannot replicate.
            </p>
            <p className="text-gray-600 leading-relaxed">
              My workshop is my sanctuary, a place filled with color, texture, and endless possibilities. I hope that when you bring one of my creations into your home, you feel the same love and passion that went into making it.
            </p>
          </div>
        </div>
      </div>

      {/* Workshop Gallery */}
       <div className="bg-brand-secondary/50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <h2 className="text-3xl font-serif font-bold text-center mb-8">From My Workshop to Your Home</h2>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <img src="https://picsum.photos/id/119/800/600" alt="Workshop view 1" className="rounded-lg shadow-md hover:shadow-xl transition-shadow"/>
                <img src="https://picsum.photos/id/24/800/600" alt="Workshop view 2" className="rounded-lg shadow-md hover:shadow-xl transition-shadow"/>
                <img src="https://picsum.photos/id/40/800/600" alt="Workshop view 3" className="rounded-lg shadow-md hover:shadow-xl transition-shadow"/>
             </div>
          </div>
       </div>

      {/* Testimonials */}
      <div className="py-16">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <p className="text-gray-600 italic">"The painting I received is even more beautiful in person! The quality is amazing and it brings so much joy to my living room."</p>
                  <p className="font-semibold mt-4">- Jessica L.</p>
              </div>
               <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <p className="text-gray-600 italic">"I ordered a custom keychain and Parul was so wonderful to work with. She brought my vision to life perfectly. Highly recommend!"</p>
                  <p className="font-semibold mt-4">- Mark T.</p>
              </div>
               <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <p className="text-gray-600 italic">"My earrings are my new favorite accessory. They are so unique and I get compliments every time I wear them."</p>
                  <p className="font-semibold mt-4">- Sarah P.</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutPage;
