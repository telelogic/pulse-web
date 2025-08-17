
import { useState } from "react";

const testimonials = [
  {
    quote: "Pulse saved our $2M ad budget when iOS 17 broke our attribution. We saw 40% better ROAS within 30 days of switching.",
    author: "Sarah Chen",
    position: "CMO, GrowthTech",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    company: "GrowthTech"
  },
  {
    quote: "We migrated from GA4 in one afternoon. Six months later, we're tracking 300% more conversions than before - all privacy-compliant.",
    author: "Marcus Rodriguez",
    position: "Head of Marketing, ScaleCommerce",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    company: "ScaleCommerce"
  },
  {
    quote: "HIPAA compliance used to limit our marketing. Pulse lets us personalize experiences while exceeding the strictest privacy standards.",
    author: "Dr. Emma Thompson",
    position: "VP Marketing, HealthInnovate",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    company: "HealthInnovate"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Trusted by <span className="text-primary-purple">Industry Leaders</span>
          </h2>
          <p className="text-gray-600 text-lg">
            See how forward-thinking companies are already using privacy-led marketing to grow their business
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].author} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                />
              </div>
              
              <div>
                <svg className="h-10 w-10 text-primary-purple/20 mb-4" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 10.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5zm12-10.5c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 10.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
                </svg>
                
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                  {testimonials[activeIndex].quote}
                </p>
                
                <div>
                  <h4 className="font-medium text-lg">{testimonials[activeIndex].author}</h4>
                  <p className="text-gray-600">{testimonials[activeIndex].position}</p>
                  <p className="text-primary-purple font-medium text-sm mt-1">{testimonials[activeIndex].company}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-primary-purple' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="absolute -z-10 top-1/3 left-0 w-20 h-20 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -z-10 bottom-1/3 right-0 w-20 h-20 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          {["NovaTech", "EcoSphere", "QuantumLeap", "Horizons"].map((company, index) => (
            <div key={index} className="flex items-center justify-center py-4">
              <span className="text-xl font-bold text-gray-400">{company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
