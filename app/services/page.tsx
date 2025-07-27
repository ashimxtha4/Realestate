
'use client';

import Link from 'next/link';

export default function Services() {
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
              <Link href="/services" className="text-indigo-600 font-medium cursor-pointer">
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs. From web development to mobile apps, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-code-line",
                title: "Web Development",
                description: "Custom websites and web applications built with modern technologies and best practices.",
                features: ["Responsive Design", "Performance Optimization", "SEO Friendly", "Security Implementation"],
                image: "https://readdy.ai/api/search-image?query=Modern%20web%20development%20workspace%20with%20multiple%20screens%20showing%20code%20and%20website%20designs%2C%20professional%20developer%20environment%2C%20clean%20minimalist%20setup%2C%20coding%20atmosphere%2C%20technology%20and%20innovation%20focus&width=400&height=300&seq=web-dev&orientation=landscape"
              },
              {
                icon: "ri-smartphone-line",
                title: "Mobile App Development",
                description: "Native and cross-platform mobile applications for iOS and Android platforms.",
                features: ["Native iOS/Android", "Cross-platform", "App Store Optimization", "Push Notifications"],
                image: "https://readdy.ai/api/search-image?query=Mobile%20app%20development%20workspace%20with%20smartphones%20and%20tablets%20displaying%20various%20app%20interfaces%2C%20modern%20development%20environment%2C%20mobile%20technology%20focus%2C%20clean%20professional%20setup&width=400&height=300&seq=mobile-dev&orientation=landscape"
              },
              {
                icon: "ri-palette-line",
                title: "UI/UX Design",
                description: "Beautiful and intuitive user interfaces that provide exceptional user experiences.",
                features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
                image: "https://readdy.ai/api/search-image?query=UI%20UX%20design%20workspace%20with%20design%20tools%2C%20color%20palettes%2C%20wireframes%20and%20prototypes%2C%20creative%20design%20environment%2C%20modern%20design%20studio%2C%20professional%20creative%20workspace&width=400&height=300&seq=ui-ux&orientation=landscape"
              },
              {
                icon: "ri-cloud-line",
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and deployment solutions for your applications.",
                features: ["AWS/Azure/GCP", "Auto Scaling", "Database Management", "Security & Backup"],
                image: "https://readdy.ai/api/search-image?query=Cloud%20computing%20infrastructure%20visualization%20with%20servers%2C%20data%20centers%2C%20and%20network%20connections%2C%20modern%20technology%20environment%2C%20professional%20cloud%20services%20setup&width=400&height=300&seq=cloud&orientation=landscape"
              },
              {
                icon: "ri-search-line",
                title: "SEO & Marketing",
                description: "Digital marketing strategies to boost your online presence and drive traffic.",
                features: ["Search Engine Optimization", "Content Marketing", "Social Media", "Analytics"],
                image: "https://readdy.ai/api/search-image?query=Digital%20marketing%20workspace%20with%20analytics%20dashboards%2C%20SEO%20tools%2C%20and%20marketing%20campaigns%2C%20professional%20marketing%20environment%2C%20data-driven%20approach%2C%20modern%20office%20setup&width=400&height=300&seq=seo-marketing&orientation=landscape"
              },
              {
                icon: "ri-settings-line",
                title: "Consulting",
                description: "Strategic technology consulting to help you make informed decisions for your business.",
                features: ["Technology Strategy", "Digital Transformation", "Process Optimization", "Team Training"],
                image: "https://readdy.ai/api/search-image?query=Business%20consulting%20meeting%20with%20professionals%20discussing%20strategy%2C%20modern%20conference%20room%2C%20collaborative%20environment%2C%20professional%20consultation%20atmosphere&width=400&height=300&seq=consulting&orientation=landscape"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${service.icon} text-2xl text-indigo-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <i className="ri-check-line text-green-500 mr-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">How we bring your ideas to life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We understand your requirements, goals, and vision for the project."
              },
              {
                step: "02",
                title: "Planning",
                description: "We create a detailed project plan with timelines and milestones."
              },
              {
                step: "03",
                title: "Development",
                description: "Our team builds your solution using best practices and modern technologies."
              },
              {
                step: "04",
                title: "Launch",
                description: "We deploy your project and provide ongoing support and maintenance."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Let's discuss your project and bring your ideas to life.
          </p>
          <Link href="/contact" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
            Contact Us Today
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
