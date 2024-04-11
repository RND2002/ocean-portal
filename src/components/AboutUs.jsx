import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-12 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6 lg:mb-12">About Us</h2>
          <p className="text-gray-700 text-lg lg:text-xl leading-relaxed max-w-3xl text-center mb-8">
            Welcome to our platform! We believe in making quality education accessible to everyone. Whether you're a learner looking to expand your knowledge or an expert eager to share your expertise, we provide a space for you to learn and grow.
          </p>
          <p className="text-gray-700 text-lg lg:text-xl leading-relaxed max-w-3xl text-center mb-8">
            Our community is built on the foundation of collaboration and lifelong learning. Join us today and embark on a journey of discovery and empowerment.
          </p>
          <p className="text-gray-700 text-lg lg:text-xl leading-relaxed max-w-3xl text-center">
            Let's learn together, create together, and inspire each other.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
