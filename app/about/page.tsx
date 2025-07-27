
'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <Link href="/about" className="text-indigo-600 font-medium cursor-pointer">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Services
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About Our Company
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are passionate innovators dedicated to creating exceptional digital experiences that transform businesses and delight users around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2020, we started as a small team of passionate developers and designers who believed that technology should be accessible, beautiful, and powerful. What began as a simple idea has grown into a thriving company serving clients worldwide.
              </p>
              <p className="text-gray-600 mb-6">
                Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep understanding of our clients' needs. We've helped hundreds of businesses transform their digital presence and achieve their goals.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-600">500+</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-indigo-600">50+</h3>
                  <p className="text-gray-600">Happy Clients</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://readdy.ai/api/search-image?query=Modern%20office%20environment%20with%20creative%20professionals%20working%20together%20on%20innovative%20projects%2C%20bright%20and%20inspiring%20workspace%20with%20natural%20lighting%2C%20collaborative%20atmosphere%2C%20contemporary%20design%20elements%2C%20professional%20team%20collaboration%2C%20clean%20modern%20aesthetic&width=600&height=400&seq=about-story&orientation=landscape"
                alt="Our Story"
                className="rounded-lg shadow-lg object-cover object-top w-full h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The brilliant minds behind our success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://readdy.ai/api/search-image?query=Professional%20female%20executive%20portrait%2C%20confident%20business%20leader%2C%20modern%20office%20background%2C%20professional%20headshot%2C%20corporate%20photography%20style%2C%20warm%20and%20approachable%20expression&width=300&height=300&seq=team-sarah&orientation=squarish"
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "https://readdy.ai/api/search-image?query=Professional%20male%20technology%20executive%20portrait%2C%20innovative%20tech%20leader%2C%20modern%20office%20background%2C%20professional%20headshot%2C%20corporate%20photography%20style%2C%20confident%20and%20intelligent%20expression&width=300&height=300&seq=team-michael&orientation=squarish"
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Design",
                image: "https://readdy.ai/api/search-image?query=Professional%20female%20creative%20director%20portrait%2C%20artistic%20design%20leader%2C%20modern%20studio%20background%2C%20professional%20headshot%2C%20corporate%20photography%20style%2C%20creative%20and%20inspiring%20expression&width=300&height=300&seq=team-emily&orientation=squarish"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-lightbulb-line",
                title: "Innovation",
                description: "We constantly push boundaries and explore new possibilities to deliver cutting-edge solutions."
              },
              {
                icon: "ri-heart-line",
                title: "Passion",
                description: "We love what we do and it shows in every project we undertake and every client we serve."
              },
              {
                icon: "ri-shield-check-line",
                title: "Quality",
                description: "We never compromise on quality and always strive for excellence in everything we deliver."
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${value.icon} text-2xl text-indigo-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
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
