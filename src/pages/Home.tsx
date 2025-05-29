import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, BookOpen, BarChart, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Elevate Your Preaching with <span className="text-amber-400">Expert Guidance</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
              Compare your sermons to renowned preachers and receive personalized feedback to refine your delivery, structure, and content.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/profiles" className="btn-secondary">
                Select a Preaching Profile
                <ChevronRight size={20} />
              </Link>
              <Link to="/submit" className="btn-outline border-white text-white hover:bg-indigo-800">
                Evaluate My Sermon
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">How Sermon Steward Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers unique insights by comparing your sermons to time-tested preaching patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass className="h-10 w-10 text-indigo-900" />,
                title: "Select Your Guide",
                description: "Choose from renowned preachers like John Piper, Billy Graham, and others as your sermon benchmark."
              },
              {
                icon: <BookOpen className="h-10 w-10 text-indigo-900" />,
                title: "Submit Your Sermon",
                description: "Upload your sermon transcript or recording for our AI-powered analysis system to review."
              },
              {
                icon: <BarChart className="h-10 w-10 text-indigo-900" />,
                title: "Receive Detailed Feedback",
                description: "Get comprehensive analysis on structure, content, delivery, and biblical accuracy."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="card flex flex-col items-center text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">What Pastors Are Saying</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join hundreds of pastors who have improved their preaching with Sermon Steward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Sermon Steward has transformed my preaching. The detailed feedback helped me identify patterns I wasn't aware of and improve my delivery substantially.",
                author: "Pastor Michael Johnson",
                church: "Grace Community Church"
              },
              {
                quote: "As a new pastor, having my sermons evaluated against the greats like Billy Graham has been invaluable. I've seen tremendous growth in just months.",
                author: "Pastor Sarah Williams",
                church: "New Hope Fellowship"
              },
              {
                quote: "The structural analysis helped me organize my thoughts better. My congregation has noticed the improvement in clarity and impact.",
                author: "Pastor David Thompson",
                church: "Cornerstone Baptist Church"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.church}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold">Ready to Enhance Your Preaching?</h2>
            <p className="mt-4 text-lg text-indigo-200">
              Join our community of pastors committed to excellence in preaching. Your first sermon evaluation is free.
            </p>
            <div className="mt-10">
              <Link to="/submit" className="btn-secondary">
                Get Started Today
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;