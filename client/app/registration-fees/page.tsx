import { TfiDownload } from "react-icons/tfi";

function RegistrationPage() {
  const registrationFees = [
    {
      category: "International Professionals",
      earlyBird: "USD 300",
      regular: "USD 400",
      type: "international",
    },
    {
      category: "International Student",
      earlyBird: "USD 150",
      regular: "USD 200",
      type: "international",
    },
    {
      category: "Local Professionals",
      earlyBird: "BDT 4,000",
      regular: "BDT 5,000",
      type: "local",
    },
    {
      category: "Local Student",
      earlyBird: "BDT 2,000",
      regular: "BDT 2,500",
      type: "local",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white px-4 md:px-24">
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <main className="flex-grow">
          {/* Header Section */}
          <div className="mb-6 text-center sm:mb-8 lg:mb-12">
            <div className="inline-block">
              <h1 className="mb-2 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Registration
              </h1>
              <div className="h-1 rounded-full bg-[#0B8175]"></div>
            </div>
            <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-gray-600 sm:text-base">
              Secure your spot at the conference by registering today
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Registration Fees */}
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    Registration Fees
                  </h2>
                </div>

                <div className="space-y-4 p-4 sm:p-6 md:p-8">
                  {/* Desktop Table */}
                  <div className="hidden overflow-hidden rounded-lg border border-gray-200 lg:block">
                    <table className="w-full">
                      <thead className="bg-green-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-base font-bold text-[#0B8175] sm:px-6 sm:py-4 md:text-lg">
                            Category
                          </th>
                          <th className="px-4 py-3 text-center text-base font-semibold text-[#0B8175] sm:px-6 sm:py-4 md:text-lg">
                            Early Bird Fee
                          </th>
                          <th className="px-4 py-3 text-center text-base font-semibold text-[#0B8175] sm:px-6 sm:py-4 md:text-lg">
                            Regular Fee
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrationFees.map((fee, index) => (
                          <tr
                            key={index}
                            className={`border-t border-gray-200 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } transition-colors duration-200 hover:bg-green-50`}
                          >
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                              {fee.category}
                            </td>
                            <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700 sm:px-6 sm:py-4 sm:text-base">
                              {fee.earlyBird}
                            </td>
                            <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700 sm:px-6 sm:py-4 sm:text-base">
                              {fee.regular}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="space-y-3 lg:hidden">
                    {registrationFees.map((fee, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4"
                      >
                        <h3 className="mb-3 text-base font-semibold text-green-800 sm:text-lg">
                          {fee.category}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-md bg-white p-3 text-center shadow-sm">
                            <p className="text-xs font-medium text-green-800 sm:text-sm">
                              Early Bird
                            </p>
                            <p className="text-sm font-bold text-[#0B8175] sm:text-base">
                              {fee.earlyBird}
                            </p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-3 text-center shadow-sm">
                            <p className="text-xs font-medium text-gray-800 sm:text-sm">
                              Regular
                            </p>
                            <p className="text-sm font-bold text-gray-700 sm:text-base">
                              {fee.regular}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Registration Deadlines */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
                    <h3 className="mb-3 text-base font-semibold text-green-800 sm:text-lg">
                      Registration Deadlines
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 h-4 w-1 bg-[#0B8175]"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 sm:text-base">
                            Early Bird Registration
                          </p>
                          <p className="text-xs text-gray-600 sm:text-sm">
                            Deadline: November 5, 2025
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 h-4 w-1 bg-[#0B8175]"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 sm:text-base">
                            Regular Registration
                          </p>
                          <p className="text-xs text-gray-600 sm:text-sm">
                            Deadline: December 10, 2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Process */}
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    How to Register
                  </h2>
                </div>

                <div className="space-y-4 p-4 sm:p-6 md:p-8">
                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center sm:p-4">
                      <div className="mb-3 flex justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B8175] text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-xl">
                          1
                        </div>
                      </div>
                      <h3 className="mb-2 text-sm font-semibold text-green-800 sm:text-base md:text-lg">
                        Fill Registration Form
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-700 sm:text-sm md:text-base">
                        Complete the online registration form with all required
                        information.
                      </p>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center sm:p-4">
                      <div className="mb-3 flex justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B8175] text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-xl">
                          2
                        </div>
                      </div>
                      <h3 className="mb-2 text-sm font-semibold text-green-800 sm:text-base md:text-lg">
                        Make Payment
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-700 sm:text-sm md:text-base">
                        Pay the registration fee through our secure payment
                        system.
                      </p>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center sm:p-4">
                      <div className="mb-3 flex justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B8175] text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-xl">
                          3
                        </div>
                      </div>
                      <h3 className="mb-2 text-sm font-semibold text-green-800 sm:text-base md:text-lg">
                        Receive Confirmation
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-700 sm:text-sm md:text-base">
                        Get your registration confirmation and payment receipt.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-r-lg border-l-4 border-green-700 bg-green-50 p-3 sm:p-4">
                    <p className="mb-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                      <span className="font-semibold text-gray-900">
                        Ready to Register?
                      </span>{" "}
                      Click the button below to start your registration process
                    </p>
                    <a
                      href="#register"
                      className="group inline-flex items-center justify-center rounded-lg bg-[#0B8175] px-6 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0B8175]/90 sm:px-8 sm:py-3 sm:text-base"
                    >
                      Register Now
                      <svg
                        className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 sm:h-5 sm:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    Important Information
                  </h2>
                </div>

                <div className="space-y-4 p-4 sm:p-6 md:p-8">
                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
                      <h3 className="mb-3 text-base font-semibold text-green-800 sm:text-lg">
                        Registration Includes:
                      </h3>
                      <ul className="space-y-2 text-xs leading-relaxed text-gray-700 sm:text-sm md:text-base">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Access to all conference sessions
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Welcome kit and conference materials
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Refreshments
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Certificate of participation
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Networking opportunities
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
                      <h3 className="mb-3 text-base font-semibold text-green-800 sm:text-lg">
                        Payment Methods:
                      </h3>
                      <ul className="space-y-2 text-xs leading-relaxed text-gray-700 sm:text-sm md:text-base">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Online bank transfer
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Credit/Debit card payment
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Mobile banking (for local participants)
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0B8175] sm:mt-2 sm:h-2 sm:w-2"></span>
                          Cash payment (on-site)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg p-3 text-center sm:p-4">
                    <p className="text-xs leading-relaxed text-gray-700 sm:text-sm md:text-base">
                      <span className="font-semibold text-gray-900">
                        Need Assistance?
                      </span>{" "}
                      For registration support or payment issues, please contact
                      us at{" "}
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

          {/* Bottom Spacing */}
          <div className="pb-12 sm:pb-20 md:pb-28"></div>
        </main>
      </div>
    </div>
  );
}

export default RegistrationPage;