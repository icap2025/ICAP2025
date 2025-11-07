"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import GoogleTranslate from "@/components/ui/GoogleTranslate";

const Footer = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  return (
    <>
      <footer
        className="wow fadeInUp relative bg-white border border-gray-200 shadow-sm pt-16 md:pt-20 lg:pt-24"
        data-wow-delay=".1s"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

            {/* Logo and Description Section */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="max-w-md">
                {/* Logo and Translate */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Link href="/" className="inline-block">
                    <Image
                      src="/ICAPicon.svg"
                      alt="logo"
                      width={128}
                      height={128}
                      className="h-auto w-20 sm:w-24 md:w-28 lg:w-32"
                    />
                  </Link>
                  <div className="flex-shrink-0">
                    <GoogleTranslate />
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-body-color sm:text-base lg:mb-8">
                  ICAP2025 is a global gathering of researchers and scholars in
                  Physical Science. Join us for an exciting event filled with
                  knowledge sharing, networking, and collaboration.
                </p>

                {/* Social Media Icons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href=""
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white sm:h-10 sm:w-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-facebook sm:h-4 sm:w-4" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    aria-label="WhatsApp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white sm:h-10 sm:w-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-whatsapp sm:h-4 sm:w-4" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:info@icap2025.org"
                    aria-label="Email"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white sm:h-10 sm:w-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-envelope sm:h-4 sm:w-4" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3 xl:col-span-6">

              {/* Useful Links */}
              <div>
                <h2 className="mb-4 text-base font-bold text-black sm:mb-6 sm:text-lg lg:text-xl">
                  Useful Links
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a
                      href="/signup"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a
                      href="/login"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/registration-fees"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Registration Fees
                    </a>
                  </li>
                </ul>
              </div>

              {/* About Section */}
              <div>
                <h2 className="mb-4 text-base font-bold text-black sm:mb-6 sm:text-lg lg:text-xl">
                  ABOUT
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                   <li>
                    <a
                      href="/scope"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Conference Scope
                    </a>
                  </li>
                  <li>
                    <a
                      href="/submission"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Submission Guidelines
                    </a>
                  </li>
                  <li>
                    <a
                      href="/committee"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Committee
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support Section */}
              <div className="sm:col-span-2 lg:col-span-1">
                <h2 className="mb-4 text-base font-bold text-black sm:mb-6 sm:text-lg lg:text-xl">
                  SUPPORT
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a
                      href="/contact"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/schedule"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Schedule
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="/venue"
                      className="inline-block text-sm text-body-color transition-colors duration-300 hover:text-primary sm:text-base"
                    >
                      Venue
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>

            {/* Map Section */}
            <div className="flex justify-center lg:col-span-2 lg:justify-end xl:col-span-2">
              <div className="w-full max-w-[250px] sm:max-w-[220px] lg:max-w-[180px] xl:max-w-[200px]">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-primary shadow-lg">

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.435552561316!2d91.82933827436678!3d24.91722804298561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750556002144eab%3A0xe277e14dbca9f2ab!2sShahjalal%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sbd!4v1721041724355!5m2!1sen!2sbd"
                    className={`h-full w-full transition-opacity duration-300 ${isMapLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ border: 0 }}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIsMapLoaded(true)}
                    title="University Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent"></div>
            <div className="py-6 sm:py-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Copyright */}
                <div className="order-2 text-center sm:order-1 sm:text-left">
                  <p className="text-sm text-body-color sm:text-base">
                    &copy; {new Date().getFullYear()} ICAP2025. All rights reserved.
                  </p>
                </div>

                {/* Developer Credit */}
                <div className="order-1 flex justify-center sm:order-2 sm:justify-end">
                  <Link
                    href="https://www.facebook.com/swesocietysust"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center overflow-hidden rounded-lg border border-gray-200 px-4 py-2 text-sm shadow-sm transition-all duration-300 hover:shadow-md sm:px-6 sm:py-3 sm:text-base"
                  >
                    <span className="relative flex items-center gap-2 font-medium text-body-color transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                      <span className="hidden sm:inline">Developed by</span>
                      <span className="sm:hidden">Developed by</span>
                      SWE-20
                      <svg
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5-5 5"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;