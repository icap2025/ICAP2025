function Schedule() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-[#F6FFFC] to-[#E9FDF7] px-4 md:px-24">
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <main className="flex-grow">
          {/* Header Section */}
          <div className="mb-6 text-center sm:mb-8 lg:mb-12">
            <div className="inline-block">
              <h1 className="mb-2 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Conference Schedule
              </h1>

              <div className="h-1 rounded-full bg-[#0B8175]"></div>
            </div>

            <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-gray-600 sm:text-base">
              Conference program and schedule details
            </p>

            <a
              href="/schedule.pdf"
              download
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0B8175] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#096B61] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0B8175] focus:ring-offset-2 sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download PDF
            </a>
          </div>

          {/* PDF Viewer Card */}
          <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
            <div className=" sm:p-6">
              <div className="w-full" style={{ height: "100vh" }}>
                <iframe
                  src="/schedule.pdf"
                  className="h-full w-full rounded-lg border border-gray-200"
                  title="Conference Schedule"
                />
              </div>
            </div>
          </div>

          {/* Zoom Meeting Information Section */}
          <div className="mx-2 mb-8 mt-12 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
            <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8 md:p-10">
              {/* Section Header */}
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Online Presentation Access
                </h2>
                <div className="mx-auto h-1 w-24 rounded-full bg-[#0B8175]"></div>
                <p className="mt-3 text-sm text-gray-600 sm:text-base">
                  Join the conference sessions virtually via Zoom
                </p>
              </div>

              {/* Zoom Links Grid */}
              <div className="mb-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6">
                {/* Central Auditorium and Mini Auditorium */}
                <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-[#F6FFFC] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0B8175] hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#0B8175] opacity-5 transition-all duration-300 group-hover:opacity-10"></div>
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="rounded-lg bg-[#0B8175] p-2">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Central & Mini Auditorium
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          Meeting ID:
                        </span>
                        <span className="font-mono text-sm text-[#0B8175]">
                          626 1057 5997
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          Password:
                        </span>
                        <span className="font-mono text-sm text-[#0B8175]">
                          10839
                        </span>
                      </div>
                      <a 
                        href="https://bdren.zoom.us/j/6629126508?pwd=QU5BODcvV2tjMGU2N24rZzhHa2d0QT09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B8175] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#096B61] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0B8175] focus:ring-offset-2"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Join Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Room 129A */}
                <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-[#F6FFFC] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0B8175] hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#0B8175] opacity-5 transition-all duration-300 group-hover:opacity-10"></div>
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="rounded-lg bg-[#0B8175] p-2">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Room 129A
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          Meeting ID:
                        </span>
                        <span className="font-mono text-sm text-[#0B8175]">
                          593 878 4695
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          Password:
                        </span>
                        <span className="text-sm italic text-gray-500">
                          Not required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room 409A */}
                <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-[#F6FFFC] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0B8175] hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#0B8175] opacity-5 transition-all duration-300 group-hover:opacity-10"></div>
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="rounded-lg bg-[#0B8175] p-2">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Room 409A
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          Meeting ID:
                        </span>
                        <span className="font-mono text-sm text-[#0B8175]">
                          626 1057 5997
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          Password:
                        </span>
                        <span className="font-mono text-sm text-[#0B8175]">
                          108398
                        </span>
                      </div>
                        <a 
                        href="https://bdren.zoom.us/j/6629126508?pwd=QU5BODcvV2tjMGU2N24rZzhHa2d0QT09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B8175] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#096B61] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0B8175] focus:ring-offset-2"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Join Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Room 307A */}
                <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-[#F6FFFC] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0B8175] hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#0B8175] opacity-5 transition-all duration-300 group-hover:opacity-10"></div>
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="rounded-lg bg-[#0B8175] p-2">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Room 307A (IICT Virtual Room)
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          Meeting ID:
                        </span>
                        <span className="font-mono text-sm text-[#0B8175]">
                          525 910 2407
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          Password:
                        </span>
                        <span className="text-sm italic text-gray-500">
                          Not required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div className="rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-red-600 p-2.5">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Emergency Technical Support
                  </h3>
                </div>
                <p className="mb-4 text-sm text-gray-700">
                  Having technical difficulties? Contact our support team:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <a
                    href="tel:+8801799808723"
                    className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-gray-900">
                        Sakil Hussain
                      </p>
                      <p className="text-xs text-gray-600">+880 1799 808723</p>
                    </div>
                  </a>
                  <a
                    href="tel:+8801644618717"
                    className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-gray-900">
                        Imran Bin Kashem
                      </p>
                      <p className="text-xs text-gray-600">+880 1644 618717</p>
                    </div>
                  </a>
                  <a
                    href="tel:+8801581825393"
                    className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-gray-900">
                        Alif Azom
                      </p>
                      <p className="text-xs text-gray-600">+880 1581 825393</p>
                    </div>
                  </a>
                  <a
                    href="tel:+8801982056368"
                    className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-gray-900">Joy</p>
                      <p className="text-xs text-gray-600">+880 1982 056368</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Spacing */}
          <div className="pb-12 sm:pb-20 md:pb-28"></div>
        </main>
      </div>
    </div>
  );
}

export default Schedule;
