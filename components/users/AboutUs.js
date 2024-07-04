import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from 'react-intersection-observer';

const AboutUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="bg-gray-800 p-12 rounded-lg shadow-lg mt-8 mx-4 text-center">
      <h2 className="text-4xl font-bold mb-6 text-white">About Auto Latino</h2>
      <div className="mb-6 text-lg leading-relaxed text-white">
        {inView && (
          <Typewriter
            words={[
              "Auto Latino is a company based in Montreal, Quebec. Our mission is to provide high-quality pre-owned vehicles to the Latino community in Montreal, ensuring trust and satisfaction in every transaction.",
              "We understand the unique needs of our community and strive to offer the best deals and customer service to our clients.",
              "At Auto Latino, we are committed to transparency, integrity, and excellence, making your car buying experience smooth and enjoyable.",
              "Join us at Auto Latino, where quality meets trust!"
            ]}
            loop={1}
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1000}
          />
        )}
      </div>
    </section>
  );
};

export default AboutUs;
