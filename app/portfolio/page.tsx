
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'E-commerce'];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A modern e-commerce platform with advanced features and seamless user experience.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://readdy.ai/api/search-image?query=Modern%20e-commerce%20website%20interface%20showing%20product%20listings%2C%20shopping%20cart%2C%20and%20checkout%20process%2C%20clean%20professional%20design%2C%20online%20shopping%20platform&width=600&height=400&seq=portfolio-ecommerce&orientation=landscape",
      link: "#"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile Apps",
      description: "Secure and intuitive mobile banking application with biometric authentication.",
      technologies: ["React Native", "Firebase", "Biometric API"],
      image: "https://readdy.ai/api/search-image?query=Mobile%20banking%20app%20interface%20showing%20account%20dashboard%2C%20transaction%20history%2C%20and%20security%20features%2C%20modern%20fintech%20design%2C%20professional%20mobile%20interface&width=600&height=400&seq=portfolio-banking&orientation=landscape",
      link: "#"
    },
    {
      id: 3,
      title: "Healthcare Dashboard",
      category: "UI/UX Design",
      description: "Comprehensive healthcare management dashboard for medical professionals.",
      technologies: ["Figma", "Adobe XD", "Prototyping"],
      image: "https://readdy.ai/api/search-image?query=Healthcare%20dashboard%20interface%20with%20patient%20data%2C%20medical%20charts%2C%20and%20analytics%2C%20clean%20medical%20software%20design%2C%20professional%20healthcare%20interface&width=600&height=400&seq=portfolio-healthcare&orientation=landscape",
      link: "#"
    },
    {
      id: 4,
      title: "Food Delivery Platform",
      category: "Web Development",
      description: "Complete food delivery solution with real-time tracking and payment integration.",
      technologies: ["Vue.js", "Express.js", "PostgreSQL", "Socket.io"],
      image: "https://readdy.ai/api/search-image?query=Food%20delivery%20platform%20interface%20showing%20restaurant%20listings%2C%20menu%20items%2C%20and%20order%20tracking%2C%20modern%20food%20app%20design%2C%20professional%20delivery%20service&width=600&height=400&seq=portfolio-food&orientation=landscape",
      link: "#"
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      category: "Mobile Apps",
      description: "Comprehensive fitness tracking application with workout plans and progress monitoring.",
      technologies: ["Flutter", "Firebase", "Health APIs"],
      image: "https://readdy.ai/api/search-image?query=Fitness%20tracking%20app%20interface%20showing%20workout%20plans%2C%20progress%20charts%2C%20and%20health%20metrics%2C%20modern%20fitness%20app%20design%2C%20professional%20health%20interface&width=600&height=400&seq=portfolio-fitness&orientation=landscape",
      link: "#"
    },
    {
      id: 6,
      title: "Online Learning Platform",
      category: "E-commerce",
      description: "Interactive online learning platform with course management and progress tracking.",
      technologies: ["React", "Django", "PostgreSQL", "Video APIs"],
      image: "https://readdy.ai/api/search-image?query=Online%20learning%20platform%20interface%20showing%20course%20catalog%2C%20video%20player%2C%20and%20student%20dashboard%2C%20modern%20educational%20design%2C%20professional%20e-learning%20interface&width=600&height=400&seq=portfolio-learning&orientation=landscape",
      link: "#"
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-2xl font-bold text-indigo-600" style={{fontFamily: 'Pacifico, serif'}}>
              logo
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Services
              </Link>
              <Link href="/portfolio" className="text-indigo-600 font-medium cursor-pointer">
                Portfolio
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Explore our latest projects and see how we've helped businesses transform their digital presence.
          </p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-indigo-600 bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.link}
                        className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-gray-50 rounded-lg p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Statistics</h2>
              <p className="text-xl text-gray-600">Our track record speaks for itself</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "30+", label: "Happy Clients" },
                { number: "15+", label: "Awards Won" },
                { number: "99%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Hear from businesses we've helped transform</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "The team delivered an exceptional e-commerce platform that exceeded our expectations. Our sales increased by 300% in the first quarter.",
                  author: "John Smith",
                  company: "TechCorp Solutions",
                  image: "https://readdy.ai/api/search-image?query=Professional%20business%20executive%20portrait%2C%20confident%20company%20CEO%2C%20modern%20office%20background%2C%20corporate%20headshot%20photography&width=100&height=100&seq=testimonial-john&orientation=squarish"
                },
                {
                  quote: "Outstanding work on our mobile banking app. The user experience is seamless and our customers love the new features.",
                  author: "Sarah Williams",
                  company: "Digital Bank",
                  image: "https://readdy.ai/api/search-image?query=Professional%20female%20executive%20portrait%2C%20banking%20industry%20leader%2C%20modern%20corporate%20background%2C%20business%20headshot%20photography&width=100&height=100&seq=testimonial-sarah&orientation=squarish"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center mb-4">
                    <i className="ri-double-quotes-l text-3xl text-indigo-600 mr-2"></i>
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 object-cover object-top"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Let's discuss how we can help bring your vision to life.
          </p>
          <Link href="/contact" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4" style={{fontFamily: 'Pacifico, serif'}}>
                logo
              </div>
              <p className="text-gray-400">
                Creating exceptional digital experiences that transform businesses worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Services</Link></li>
                <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Portfolio</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Web Development</span></li>
                <li><span className="text-gray-400">Mobile Apps</span></li>
                <li><span className="text-gray-400">UI/UX Design</span></li>
                <li><span className="text-gray-400">Consulting</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Email: hello@company.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
