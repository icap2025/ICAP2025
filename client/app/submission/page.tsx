import { TfiDownload } from "react-icons/tfi";
function ScopePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        <main className="flex-grow">
          {/* Header Section */}
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <div className="inline-block">
              <h1 className="mb-2 mt-14 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                Submission Guidelines
              </h1>
              <div className="h-1 rounded-full bg-[#0B8175]"></div>
            </div>
            <p className="mx-auto mt-4 max-w-2xl px-4 text-base text-gray-600 sm:text-lg">
              Please follow these guidelines carefully for successful submission
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Extended Abstract and Full Paper Submission */}
            <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-4 sm:p-6">
                  <h2 className="flex items-center text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    <div className="mr-3 h-8 w-2 rounded-full bg-white"></div>
                    Extended Abstract and Full Paper Submission
                  </h2>
                </div>

                <div className="space-y-6 p-6 sm:p-8 md:p-10">
                  <div className="rounded-r-lg border-l-4 border-green-700 bg-green-50 p-4 sm:p-6">
                    <p className="text-base leading-relaxed text-gray-800 sm:text-lg md:text-xl">
                      <a
                        href="https://cmt3.research.microsoft.com/docs/help/author/author-submission-form.html"
                        className="inline-flex items-center font-semibold text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-green-800 hover:decoration-green-800"
                      >
                        Submit your extended abstract and full paper here
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
                      You must have a{" "}
                      <a
                        href="https://cmt3.research.microsoft.com"
                        className="font-semibold text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-green-800 hover:decoration-green-800"
                      >
                        Microsoft CMT
                      </a>{" "}
                      account to submit both abstract and full paper online. If
                      you don&apos;t have an account, please{" "}
                      <a
                        href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2F"
                        className="font-semibold text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-green-800 hover:decoration-green-800"
                      >
                        create one here
                      </a>{" "}
                      before submitting.
                    </p>

                    <div className="rounded-lg p-4 sm:p-6">
                      <p className="text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
                        <span className="font-semibold text-gray-900">
                          Need Help?
                        </span>{" "}
                        If you face any problems with online submission, please
                        contact the conference secretary at{" "}
                        <a
                          href="mailto:icap2025@sust.edu"
                          className="font-semibold text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-green-800 hover:decoration-green-800"
                        >
                          icap2025@sust.edu
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Style Guideline */}
            <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-4 sm:p-6">
                  <h2 className="flex items-center text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    <div className="mr-3 h-8 w-2 rounded-full bg-white"></div>
                    Style Guidelines
                  </h2>
                </div>

                <div className="space-y-6 p-6 sm:p-8 md:p-10">
                  <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                      <h3 className="mb-3 text-lg font-semibold text-green-800">
                        Paper Requirements
                      </h3>
                      <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                        Full papers should be{" "}
                        <span className="font-semibold text-gray-900">
                          4-6 pages
                        </span>{" "}
                        in length.
                      </p>
                      <a
                      href="/doc/Flyer_ICERIE 2025_SUST.pdf"
                      className="group inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 hover:border-primary hover:bg-green-50 hover:text-primary"
                      download
                    >
                      <span className="mr-2 text-base font-semibold md:text-lg">
                      Full Paper Template (.docx)
                      </span>
                      <TfiDownload className="text-sm group-hover:animate-bounce md:text-base" />
                    </a>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                      <h3 className="mb-3 text-lg font-semibold text-green-800">
                        Abstract Template
                      </h3>
                      <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                        Use the provided template for abstract submissions.
                      </p>
                      <a
                      href="/doc/Flyer_ICERIE 2025_SUST.pdf"
                      className="group inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 hover:border-primary hover:bg-green-50 hover:text-primary"
                      download
                    >
                      <span className="mr-2 text-base font-semibold md:text-lg">
                      Abstract Template (.docx)
                      </span>
                      <TfiDownload className="text-sm group-hover:animate-bounce md:text-base" />
                    </a>
                    </div>
                  </div>

                  <div className="rounded-lg p-4 text-center sm:p-6">
                    <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                      <span className="font-semibold text-gray-900">
                        Conference Brochure:
                      </span>{" "}
                      Download the complete information guide
                    </p>
                    <a
                      href="/doc/Flyer_ICERIE 2025_SUST.pdf"
                      className="inline-flex group items-center justify-center rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 hover:border-primary hover:bg-green-50 hover:text-primary"
                    >
                      <span className="mr-2 text-base font-semibold md:text-lg">
                      ICAP2025 Brochure (.pdf)
                        </span>
                      <TfiDownload className="text-sm group-hover:animate-bounce md:text-base" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster Submission */}
            <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-4 sm:p-6">
                  <h2 className="flex items-center text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    <div className="mr-3 h-8 w-2 rounded-full bg-white"></div>
                    Poster Submission Guidelines
                  </h2>
                </div>

                <div className="space-y-6 p-6 sm:p-8 md:p-10">
                  <div className="rounded-r-lg border-l-4 border-green-700 bg-green-50 p-4 sm:p-6">
                    <h3 className="mb-3 text-lg font-semibold text-green-800">
                      Poster Specifications
                    </h3>
                    <div className="grid gap-4 text-base text-gray-700 sm:grid-cols-1 sm:text-lg md:grid-cols-2">
                      <div>
                        <span className="font-semibold text-gray-900">
                          Size:
                        </span>{" "}
                        A0 (36 × 48 inches)
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">
                          Orientation:
                        </span>{" "}
                        Portrait
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">
                          Setup Time:
                        </span>{" "}
                        30 minutes before session
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">
                          Presentation:
                        </span>{" "}
                        3-5 minute overview + Q&A
                      </div>
                    </div>
                  </div>

                  <div className=" rounded-xl p-4 sm:p-6">
                    <h4 className="mb-3 text-lg font-semibold text-green-800">
                      Content Guidelines
                    </h4>
                    <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                      Content should be{" "}
                      <span className="font-semibold">
                        clear, concise, and visually engaging
                      </span>
                      . Ensure readability with appropriate font sizes and
                      high-quality visuals following the provided template.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    <a
                      href="/doc/Flyer_ICERIE 2025_SUST.pdf"
                      className="group flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 hover:border-primary hover:bg-green-50 hover:text-primary"
                      download
                    >
                      <span className="mr-2 text-base font-semibold md:text-lg">
                       Poster Template (.pptx)
                      </span>
                      <TfiDownload className="text-sm group-hover:animate-bounce md:text-base" />
                    </a>

                    <a
                      href="/doc/Flyer_ICERIE 2025_SUST.pdf"
                      className="group flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 hover:border-primary hover:bg-green-50 hover:text-primary"
                      download
                    >
                      <span className="mr-2 text-base font-semibold md:text-lg">
                      Preparation Guide (.docx)
                      </span>
                      <TfiDownload className="text-sm group-hover:animate-bounce md:text-base" />
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Spacing */}
          <div className="pb-20 sm:pb-32 md:pb-40"></div>
        </main>
      </div>
    </div>
  );
}

export default ScopePage;
