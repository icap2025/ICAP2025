"use client";
import Link from "next/link";
// import GoogleTranslate from "@/components/ui/GoogleTranslate";

const Footer = () => {
  return (
    <>
      <footer
        className="wow fadeInUp relative bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24"
        data-wow-delay=".1s"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <div className="flex justify-between">
                  <Link href="/" className="mb-8 inline-block">
                    <img
                      src="/images/logo/logo-2.svg"
                      alt="logo"
                      className="w-full dark:hidden"
                      width={140}
                      height={30}
                    />
                    <img
                      src="/images/logo/logo.svg"
                      alt="logo"
                      className="hidden w-full dark:block"
                      width={140}
                      height={30}
                    />
                  </Link>
                  {/* <GoogleTranslate /> */}
                </div>

                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer lobortis.
                </p>
                <div className="flex items-center">
                  <a
                    href="https://www.facebook.com/gaibandhastudentsassociationsust"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <svg
                      width="9"
                      height="18"
                      viewBox="0 0 9 18"
                      className="fill-current"
                    >
                      <path d="M8.13643 7H6.78036H6.29605V6.43548V4.68548V4.12097H6.78036H7.79741C8.06378 4.12097 8.28172 3.89516 8.28172 3.55645V0.564516C8.28172 0.254032 8.088 0 7.79741 0H6.02968C4.11665 0 2.78479 1.58064 2.78479 3.92339V6.37903V6.94355H2.30048H0.65382C0.314802 6.94355 0 7.25403 0 7.70564V9.7379C0 10.1331 0.266371 10.5 0.65382 10.5H2.25205H2.73636V11.0645V16.7379C2.73636 17.1331 3.00273 17.5 3.39018 17.5H5.66644C5.81174 17.5 5.93281 17.4153 6.02968 17.3024C6.12654 17.1895 6.19919 16.9919 6.19919 16.8226V11.0927V10.5282H6.70771H7.79741C8.11222 10.5282 8.35437 10.3024 8.4028 9.96371V9.93548V9.90726L8.74182 7.95968C8.76604 7.7621 8.74182 7.53629 8.59653 7.31048C8.54809 7.16935 8.33016 7.02823 8.13643 7Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCcL5liz6k9DpkC9FPVqJuHQ"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      className="fill-current"
                    >
                      <path d="M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.68585 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.68585 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    aria-label="social-link"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      className="fill-current"
                    >
                      <path d="M16.7 3.3C14.9 1.5 12.5 0.5 10 0.5C4.8 0.5 0.5 4.8 0.5 10C0.5 11.8 1 13.6 1.9 15.1L0.4 19.5L5 18C6.4 18.8 8.2 19.2 10 19.2C15.2 19.2 19.5 14.9 19.5 9.7C19.5 7.2 18.5 4.8 16.7 3.3ZM10 17.7C8.4 17.7 6.8 17.3 5.5 16.5L5.2 16.3L2.6 17.2L3.5 14.7L3.3 14.4C2.4 13 1.9 11.5 1.9 9.9C1.9 5.6 5.6 2 9.9 2C12 2 14 2.8 15.4 4.3C16.9 5.7 17.7 7.7 17.7 9.8C17.8 14.2 14.2 17.7 10 17.7ZM14.4 11.9C14.1 11.8 13 11.2 12.8 11.1C12.6 11 12.4 11 12.3 11.2C12.1 11.4 11.7 12 11.5 12.1C11.4 12.3 11.2 12.3 11 12.2C10.3 11.8 9.6 11.4 9 10.8C8.5 10.3 8.1 9.7 7.8 9.2C7.7 9 7.8 8.8 7.9 8.7C8 8.6 8.2 8.4 8.3 8.2C8.4 8.1 8.4 7.9 8.5 7.8C8.5 7.7 8.5 7.5 8.4 7.4C8.3 7.3 7.9 6.2 7.7 5.7C7.5 5.2 7.3 5.3 7.1 5.3C7 5.3 6.8 5.3 6.6 5.3C6.4 5.3 6.1 5.4 5.9 5.6C5.7 5.8 5 6.4 5 7.5C5 8.6 5.8 9.7 5.9 9.8C6 10 7.9 13 10.8 14.1C11.5 14.4 12.1 14.6 12.5 14.7C13.2 14.9 13.9 14.9 14.4 14.8C15 14.6 15.9 14.1 16.1 13.5C16.3 12.9 16.3 12.4 16.2 12.3C16.1 12.2 16 12.1 14.4 11.9Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Useful Links
                </h2>
                <ul>
                  <li>
                    <a
                      href="/members"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Members
                    </a>
                  </li>
                  <li>
                    <a
                      href="/gallery"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="/events"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Events
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  About
                </h2>
                <ul>
                  <li>
                    <a
                      href="/about-gsa"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      About GSA
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about-gaibandha"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      About Gaibandha
                    </a>
                  </li>
                  <li>
                    <a
                      href="/previous-committees"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Previous Committees
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Support & Help
                </h2>
                <ul>
                  <li>
                    <a
                      href="/contact"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/signin"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Terms & Condition
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="py-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="mb-6 w-full md:mb-0 md:w-1/2">
                <p className="text-base text-body-color dark:text-body-color-dark">
                  &copy; {new Date().getFullYear()} Gaibandha Student
                  Association. All rights reserved.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex justify-center md:justify-end">
                  <Link
                    href="/members/67b5064ccc00fe46fe878716"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center overflow-hidden rounded-lg border border-white px-6 py-3 text-base text-body-color shadow-md transition-all duration-300 hover:shadow-lg dark:text-body-color-dark"
                  >
                    <span className="relative flex items-center gap-2 font-medium transition-all duration-300 group-hover:translate-x-1">
                      Developed by Farzine SWE-20
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
        <div className="absolute bottom-24 left-0 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
