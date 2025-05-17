import Image from "next/image";
import Header from "@/components/LandingPageComponent/Header/index";

export default function Home() {
  return (
    <>
    <Header/>
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 text-center">
        <Image
          src="/programming.png"
          alt="Conference Logo"
          width={250}
          height={250}
          className="mb-8"
          priority
        />
        
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-gray-800 dark:text-white">
          ICAP <span className="text-blue-600 dark:text-blue-400">2025</span>
        </h1>
        
        <h2 className="text-xl sm:text-3xl font-medium mb-8 text-gray-600 dark:text-gray-300">
          International Conference on Advances in Physics
        </h2>
        
        <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-500 dark:text-gray-400">
          Join us for the premier global gathering of researchers and scholars in Physical Science.
          <br className="hidden sm:block" />
          <span className="font-medium">June 15-18, 2025 • Virtual & In-Person</span>
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
            Register Interest
          </button>
          <button className="px-8 py-3 bg-transparent border border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white">About The Conference</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto text-center">
            The International Conference on Advances in Physics brings together leading researchers, 
            scientists, and scholars to exchange ideas, present discoveries, and discuss the future of physics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Keynote Speakers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                World-renowned physicists and researchers will share cutting-edge discoveries and insights.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Research Presentations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Showcase your work through oral presentations, poster sessions, and interactive workshops.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Networking Events</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with peers, potential collaborators, and industry leaders in specialized networking sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Updated Section */}
      <section className="py-16 px-6 bg-blue-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Stay Updated</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to receive the latest news about ICAP 2025, including speaker announcements and important deadlines.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:min-w-[300px]"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">ICAP 2025</h2>
              <p>International Conference on Advances in Physics</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
            &copy; {new Date().getFullYear()} ICAP 2025. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
