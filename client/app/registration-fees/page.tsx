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
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        <main className="flex-grow">
          {/* Header Section */}
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <div className="inline-block">
              <h1 className="mb-2 mt-14 text-4xl font-bold text-gray-900">
                Registration
              </h1>
              <div className="h-1 rounded-full bg-[#0B8175]"></div>
            </div>
            <p className="mx-auto mt-4 max-w-2xl px-4 text-lg text-gray-600">
              Secure your spot at the conference by registering today
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-12 px-4 md:px-12 lg:px-24">
            {/* Registration Fees */}
            <div className="mx-0 md:mx-8 lg:mx-12 xl:mx-20">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-4 sm:p-6">
                  <h2 className="flex items-center text-xl font-bold text-white">
                    <div className="mr-3 h-8 w-2 rounded-full bg-white"></div>
                    Registration Fees
                  </h2>
                </div>

                <div className="p-4 sm:p-8 md:p-10">
                  {/* Desktop Table */}
                  <div className="hidden overflow-hidden rounded-lg border border-gray-200 md:block">
                    <table className="w-full">
                      <thead className="bg-green-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-lg font-bold text-primary">
                            Category
                          </th>
                          <th className="px-6 py-4 text-center text-lg font-semibold text-primary">
                            Early Bird Fee
                          </th>
                          <th className="px-6 py-4 text-center text-lg font-semibold text-primary">
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
                            <td className="px-6 py-4 text-base font-semibold text-gray-900">
                              {fee.category}
                            </td>
                            <td className="px-6 py-4 text-center text-base font-semibold text-gray-700">
                              {fee.earlyBird}
                            </td>
                            <td className="px-6 py-4 text-center text-base font-semibold text-gray-700">
                              {fee.regular}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="space-y-4 md:hidden">
                    {registrationFees.map((fee, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">
                          {fee.category}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-md bg-green-50 p-3 text-center">
                            <p className="text-sm font-medium text-green-800">
                              Early Bird
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {fee.earlyBird}
                            </p>
                          </div>
                          <div className="rounded-md bg-gray-50 p-3 text-center">
                            <p className="text-sm font-medium text-gray-800">
                              Regular
                            </p>
                            <p className="text-lg font-bold text-gray-700">
                              {fee.regular}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Registration Deadlines */}
                  <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 md:p-5 shadow-sm">
                    <h3 className="mb-4 text-lg font-medium text-gray-900">
                      Registration Deadlines
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="mr-3 h-4 w-1 bg-[#0B8175]"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            Early Bird Registration
                          </p>
                          <p className="text-sm text-gray-600">
                            Deadline: November 5, 2025
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 h-4 w-1 bg-[#0B8175]"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            Regular Registration
                          </p>
                          <p className="text-sm text-gray-600">
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
            <div className="mx-0 md:mx-8 lg:mx-12 xl:mx-20">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-4 sm:p-6">
                  <h2 className="flex items-center text-xl font-bold text-white">
                    <div className="mr-3 h-8 w-2 rounded-full bg-white"></div>
                    How to Register
                  </h2>
                </div>

                <div className="space-y-6 p-4 sm:p-8 md:p-10">
                  <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center sm:p-6">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                          1
                        </div>
                      </div>
                      <h3 className="mb-3 text-base md:text-lg font-semibold text-green-800">
                        Fill Registration Form
                      </h3>
                      <p className="text-sm md:text-base text-gray-700">
                        Complete the online registration form with all required
                        information.
                      </p>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center sm:p-6">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                          2
                        </div>
                      </div>
                      <h3 className="mb-3 text-base md:text-lg font-semibold text-green-800">
                        Make Payment
                      </h3>
                      <p className="text-sm md:text-base text-gray-700">
                        Pay the registration fee through our secure payment
                        system.
                      </p>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center sm:p-6">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                          3
                        </div>
                      </div>
                      <h3 className="mb-3 text-base md:text-lg font-semibold text-green-800">
                        Receive Confirmation
                      </h3>
                      <p className="text-sm md:text-base text-gray-700">
                        Get your registration confirmation and Payment receipt.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 text-center sm:p-6">
                    <p className="mb-4 text-sm md:text-base leading-relaxed text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Ready to Register?
                      </span>{" "}
                      Click the button below to start your registration process
                    </p>
                    <a
                      href="#register"
                      className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base md:text-lg font-semibold text-white transition-colors duration-300 hover:bg-primary/90"
                    >
                      Register Now
                      <svg
                        className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
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
            <div className="mx-0 md:mx-8 lg:mx-12 xl:mx-20">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-4 sm:p-6">
                  <h2 className="flex items-center text-lg md:text-2xl font-bold text-white">
                    <div className="mr-3 h-8 w-2 rounded-full bg-white"></div>
                    Important Information
                  </h2>
                </div>

                <div className="space-y-6 p-4 sm:p-8 md:p-10">
                  <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="text-base md:text-lg font-semibold text-green-800">
                        Registration Includes:
                      </h3>
                      <ul className="space-y-2 text-sm md:text-base text-gray-700">
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Access to all conference sessions
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Welcome kit and conference materials
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Lunch and refreshments
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Certificate of participation
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Networking opportunities
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-base md:text-lg font-semibold text-green-800">
                        Payment Methods:
                      </h3>
                      <ul className="space-y-2 text-sm md:text-base text-gray-700">
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Online bank transfer
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Credit/Debit card payment
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Mobile banking (for local participants)
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-2 h-2 w-2 rounded-full bg-primary"></span>
                          Cash payment (on-site)
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* <div className="rounded-lg border-l-4 border-green-700 bg-green-50 p-4 sm:p-6">
                    <h4 className="mb-2 text-lg font-semibold text-green-800">
                      Cancellation Policy
                    </h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Registration fees are refundable up to 30 days before the conference date. 
                      Cancellations made within 30 days will incur a 25% processing fee. 
                      No refunds will be provided for no-shows.
                    </p>
                  </div> */}

                  <div className="rounded-lg p-4 sm:p-6">
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Need Assistance?
                      </span>{" "}
                      For registration support or payment issues, please contact
                      us at{" "}
                      <a
                        href="mailto:registration@icap2025.edu"
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
          <div className="pb-20 sm:pb-32 md:pb-40"></div>
        </main>
      </div>
    </div>
  );
}

export default RegistrationPage;
