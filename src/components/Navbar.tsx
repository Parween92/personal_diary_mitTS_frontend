import { NavLink } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import logo from "../assets/Logo.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <NavLink to="" className="flex items-center space-x-2 min-w-0 flex-1">
            <img
              src={logo}
              alt="Website-Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">
              Your Personal Diary
            </h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavLink
              className="flex items-center text-accent font-bold transition-colors duration-200 px-4 py-2 rounded-lg "
              to="/posts"
            >
              <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/28982f4f-26cc-40aa-92fa-1b1d57a34c78/AmokKFs5qg.lottie"
                  loop
                  autoplay
                  style={{
                    width: "100%",
                    height: "100%",
                    filter: "hue-rotate(-140deg) saturate(6) contrast(2)",
                  }}
                />
              </div>
              <span className="ml-2 whitespace-nowrap text-sm lg:text-base text-accent">
                Create A New Post
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-4 border-t border-white/20 mt-4">
            <NavLink
              className="flex items-center justify-center text-accent font-bold hover:text-white
               transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-white/10 mx-2"
              to="/posts"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/28982f4f-26cc-40aa-92fa-1b1d57a34c78/AmokKFs5qg.lottie"
                  loop
                  autoplay
                  style={{
                    width: "100%",
                    height: "100%",
                    filter: "hue-rotate(-140deg) saturate(6) contrast(2)",
                  }}
                />
              </div>
              <span className="ml-2 text-sm text-accent">
                Create A New Post
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
