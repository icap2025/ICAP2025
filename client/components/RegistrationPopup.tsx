'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// REGISTRATION CLOSED - Popup disabled
export default function RegistrationPopup() {
  // const [isVisible, setIsVisible] = useState(false);
  return null; // Registration closed
  
  /* COMMENTED OUT - REGISTRATION CLOSED
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Don't show if user is logged in or auth is still loading
    if (isLoggedIn || loading) {
      return;
    }

    // Check if current date is before December 20, 2025
    const currentDate = new Date();
    const endDate = new Date('2025-12-20T23:59:59');
    
    if (currentDate < endDate) {
      // Show popup after a short delay
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => {
        clearTimeout(showTimer);
      };
    }
  }, [isLoggedIn, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown timer
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
     
    }, 300); // Animation duration
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />
      
      {/* Popup - Centered */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div 
          className={`relative w-full max-w-md transform transition-all duration-300 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Card */}
          <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 opacity-20 animate-pulse" />
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Content */}
            <div className="relative p-5 sm:p-6">
              {/* Icon */}
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                  <svg 
                    className="w-7 h-7 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-3">
                Registration is Now Live! 🎉
              </h2>

              {/* Highlighted Message */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-3 rounded-r-lg mb-4 animate-pulse">
                <p className="text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
                  The registration process is now live. To register and pay for securing the spot you need to{' '}
                  <span className="text-green-700 font-bold underline decoration-2">
                    Sign In first
                  </span>
                </p>
              </div>

              {/* Additional info */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-0.5">✓</span>
                    <span>Create an account or sign in</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-0.5">✓</span>
                    <span>Complete your registration form</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-0.5">✓</span>
                    <span>Secure your spot with payment</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="/login"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 text-center text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign In Now
                </a>
                <a
                  href="/signup"
                  className="flex-1 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 text-center text-sm transform hover:scale-105"
                >
                  Create Account
                </a>
              </div>

              {/* Countdown timer */}
              <div className="mt-3 text-center">
                <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-xs font-medium text-gray-700">
                    Auto-closing in <span className="font-bold text-green-600">{countdown}</span>s
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
