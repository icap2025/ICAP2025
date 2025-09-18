import { TfiDownload } from "react-icons/tfi";

function ScopePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white px-4 md:px-24">
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <main className="flex-grow">
          {/* Header Section */}
          <div className="mb-6 text-center sm:mb-8 lg:mb-12">
            <div className="inline-block">
              <h1 className="mb-2 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Submission Guidelines
              </h1>
              <div className="h-1 rounded-full bg-[#0B8175]"></div>
            </div>
            <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-gray-600 sm:text-base">
              Please follow these guidelines carefully for successful submission
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Extended Abstract and Submission */}
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    Extended Abstract Submission
                  </h2>
                </div>

                <div className="space-y-4 p-4 sm:p-6 md:p-8">
                  <div className="rounded-r-lg border-l-4 border-green-700 bg-green-50 p-3 sm:p-4">
                    <p className="text-sm leading-relaxed text-gray-800 sm:text-base md:text-lg">
                      <a
                        href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FICAP2025"
                        target="_blank"
                        className="inline-flex items-center font-semibold text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-green-800 hover:decoration-green-800"
                      >
                        Submit your extended abstract here
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

                  {/* Abstract Guidelines Section */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                    <h3 className="mb-4 text-lg font-bold text-[#0B8175] sm:text-xl">
                      Extended Abstract Guidelines
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                      <div className="space-y-3">
                        <div className="rounded-lg bg-white p-3">
                          <h4 className="mb-2 font-semibold text-gray-900">Language & Length</h4>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Language:</span> English (US or UK, consistent throughout)<br />
                            <span className="font-medium">Length:</span>
                            Maximum 300 words (excluding title, authors, affiliations, and diagram)
                            <br />
                            <span className="font-medium text-primary pr-1">Note:</span>
                            The abstract must be limited to a maximum of one A4-sized page, including figure and/or table and references.
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <h4 className="mb-2 font-semibold text-gray-900">Title & Authors</h4>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Title:</span> Clear and concise, maximum 20 words<br />
                            <span className="font-medium">Authors:</span> Include full names, affiliations, and email addresses
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-lg bg-white p-3">
                          <h4 className="mb-2 font-semibold text-gray-900">Formatting</h4>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Font:</span> Times New Roman, 11-12 point<br />
                            <span className="font-medium">Spacing:</span> Single spacing<br />
                            <span className="font-medium">Format:</span> Word (.doc/.docx)
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <h4 className="mb-2 font-semibold text-gray-900">Visuals & References</h4>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Figures/Tables:</span> Maximum one table and/or one figure<br />
                            <span className="font-medium">References:</span> Important references can be added
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Procedure */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                    <h3 className="mb-4 text-lg font-bold text-[#0B8175] sm:text-xl">Submission Procedure</h3>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                          <p className="text-sm text-gray-700 sm:text-base">
                            Submit abstracts via the official submission portal:
                            <a
                              href="https://icap2025.sust.edu"
                              className="ml-1 font-semibold text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-green-800 hover:decoration-green-800"
                            >
                              https://icap2025.sust.edu
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                          <p className="text-sm text-gray-700 sm:text-base">
                            Mention/Select preferred presentation type: <span className="font-semibold">Oral, Poster, or Either</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Process */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                    <h3 className="mb-4 text-lg font-bold text-[#0B8175] sm:text-xl">Review and Acceptance</h3>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                          <p className="text-sm text-gray-700 sm:text-base">
                            All submissions will be peer-reviewed by the Scientific Committee
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                          <p className="text-sm text-gray-700 sm:text-base">
                            Selection criteria include <span className="font-semibold">originality, relevance, clarity, and scientific merit</span>
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                          <p className="text-sm text-gray-700 sm:text-base">
                            Accepted abstracts will be published in the official <span className="font-semibold">Book of Abstracts</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ethical Policy */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                    <h3 className="mb-4 text-lg font-bold text-[#0B8175] sm:text-xl">Ethical and Publishing Policy</h3>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                          <p className="text-sm text-gray-700 sm:text-base">
                            Abstracts must represent <span className="font-semibold">original work</span> not published or presented elsewhere
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                          <p className="text-sm text-gray-700 sm:text-base">
                            Authors are responsible for content accuracy
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                          <p className="text-sm text-gray-700 sm:text-base">
                            <span className="font-semibold text-red-700">Plagiarism or duplicate submissions will lead to immediate rejection</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Publication Opportunity */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                    <h3 className="mb-3 text-lg font-bold text-[#0B8175]">Publication Opportunity</h3>
                    <p className="text-sm text-gray-700 sm:text-base">
                      The Organizing Committee is currently working to publish selected peer-reviewed papers from the conference in a
                      <span className="font-semibold"> reputed international journal</span>. Details will be announced as soon as the publication partner is confirmed.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
                      You must have a{" "}
                      <a
                        href="https://cmt3.research.microsoft.com"
                        className="font-semibold text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-green-800 hover:decoration-green-800"
                      >
                        Microsoft CMT
                      </a>{" "}
                      account to submit both abstract online. If
                      you don&apos;t have an account, please{" "}
                      <a
                        href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2F"
                        className="font-semibold text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-green-800 hover:decoration-green-800"
                      >
                        create one here
                      </a>{" "}
                      before submitting.
                    </p>
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
                      <h3 className="mb-2 text-base font-semibold text-green-800">
                        &quot;The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.&quot;
                      </h3>
                    </div>

                    <div className="rounded-lg p-3 sm:p-4">
                      <p className="text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
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
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">

                <div className="space-y-6 p-4 sm:p-6 md:p-8">
                  {/* Downloads Grid */}
                  <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    {/* Conference Brochure */}
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                      <div className="mb-4 text-center">
                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#0B8175] shadow-lg">
                          <TfiDownload className="text-2xl text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B8175] sm:text-xl">
                          Conference Brochure
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 sm:text-base">
                          Complete information guide with all conference details, schedule, and important information
                        </p>
                      </div>
                      <div className="text-center">
                        <a
                          href="/Brochure.pdf"
                          download="Brochure.pdf"
                          className="group inline-flex max-w-full items-center justify-center rounded-lg bg-[#0B8175] px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0A6B61] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0B8175] focus:ring-offset-2"
                        >
                          <span className="mr-2 text-sm sm:text-base">
                            Download Brochure
                          </span>
                          <TfiDownload className="text-sm transition-transform duration-300 group-hover:animate-bounce sm:text-base" />
                        </a>
                        <p className="mt-2 text-xs text-gray-500">PDF Format</p>
                      </div>
                    </div>

                    {/* Abstract Template */}
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                      <div className="mb-4 text-center">
                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#0B8175] shadow-lg">
                          <TfiDownload className="text-2xl text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B8175] sm:text-xl">
                          Abstract Template
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 sm:text-base">
                          Official template for extended abstract submission with proper formatting guidelines
                        </p>
                      </div>
                      <div className="text-center">
                        <a
                          href="/Abstract Template.docx"
                          download="Abstract Template.docx"
                          className="group inline-flex max-w-full items-center justify-center rounded-lg bg-[#0B8175] px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0A6B61] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0B8175] focus:ring-offset-2"
                        >
                          <span className="mr-2 text-sm sm:text-base">
                            Download Template
                          </span>
                          <TfiDownload className="text-sm transition-transform duration-300 group-hover:animate-bounce sm:text-base" />
                        </a>
                        <p className="mt-2 text-xs text-gray-500">DOCX Format</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Poster Submission */}
            {/* <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    Poster Submission Guidelines
                  </h2>
                </div>

                <div className="space-y-4 p-4 sm:p-6 md:p-8">
                  <p>
                    &ldquo;<span className="font-semibold text-[#0B8175]">Poster specifications</span>&rdquo; will be announced later.
                  </p>
                </div>
              </div>
            </div> */}


          </div>

          {/* Bottom Spacing */}
          <div className="pb-12 sm:pb-20 md:pb-28"></div>
        </main>
      </div>
    </div>
  );
}

export default ScopePage;
