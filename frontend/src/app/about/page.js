export default function AboutMePage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            About Me
          </h1>
          <AboutMeSection />
        </div>
      </div>
    );
  }
  
  // Reusable section component
  function AboutMeSection() {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Text Block */}
        <div className="bg-red-100 rounded-lg shadow-lg p-8 max-w-md text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Tech and product enthusiast, I strive to solve big problems that have an impact.
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Today I am a <span className="font-bold text-gray-800">Product Manager</span> at{' '}
            <a href="https://yokoy.ai" className="text-red-500 underline">
              Yokoy
            </a>
            , a Swiss start-up that is leading the AI race in spend management.
          </p>
          {/* Contact Me Button */}
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <a
              href="#contact"
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-red-600 transition"
            >
              Contact me
            </a>
            <a
              href="https://www.linkedin.com/in/mauro-spadaro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
  
        {/* Image Block */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="/mauro_nature.jpeg" // Replace with the correct path to your image
            alt="Mauro in nature"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    );
  }
  