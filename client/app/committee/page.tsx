import React from "react";

function CommitteePage() {
  const advisoryCommittee = [
    { name: "Dr. M. Shamsher Ali", affiliation: "Dhaka University" },
    { name: "Prof. Dr. Arun Kumar Basak", affiliation: "Rajshahi University" },
    {
      name: "Prof. Dr. A.K.M. Azharul Islam",
      affiliation: "Rajshahi University",
    },
    { name: "Dr. GOLAM MORTUZA", affiliation: "Rajshahi University" },
    { name: "Dr. Gias uddin Ahmad", affiliation: "BUET" },
    { name: "A F M Yusuf Haider, PhD", affiliation: "Dhaka University" },
    {
      name: "Dr. Khondkar Siddique-e-Rabbani",
      affiliation: "Dhaka University",
    },
    { name: "Shamima K. Choudhury", affiliation: "Dhaka University" },
    { name: "Dr. M Habibul Ahsan", affiliation: "St. John's University" },
    { name: "Dr. Golam Mohammed Bhuiyan", affiliation: "Dhaka University" },
    { name: "Dr. A A Mamun", affiliation: "Jahangirnagar University" },
    { name: "Dr. Saleh Hasan Naqib", affiliation: "Rajshahi University" },
    { name: "Dr. Sultana N Nahar", affiliation: "Ohio State University, USA" },
    { name: "Dr Syed Badiuzzaman Faruque", affiliation: "SUST" },
    { name: "Dr. A K M Akther Hossain", affiliation: "BUET" },
    {
      name: "Dr. Mahmood ul Hassan",
      affiliation: "Punjab University, Pakistan",
    },
    {
      name: "Dr. Mohammad Akbar",
      affiliation: "University of Texas at Dallas, USA",
    },
    { name: "Dr. Masashi Ohashi", affiliation: "Kanazawa University, Japan" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        <main className="flex-grow">
          {/* Header Section */}
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <div className="inline-block">
              <h1 className="mb-2 mt-14 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                Advisory Committee
              </h1>
              <div className="h-1 rounded-full bg-[#0B8175]"></div>
            </div>
            <p className="mx-auto mt-4 max-w-2xl px-4 text-base text-gray-600 sm:text-lg">
              We are honored to present the Advisory Committee for the
              International Conference on Advances in Physics (ICAP 2025)
            </p>
          </div>

          {/* Advisory Committee Members */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Registration Fees */}
            <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-4 sm:p-6">
                  <h2 className="flex items-center text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    <div className="mr-3 h-8 w-2 rounded-full bg-white"></div>
                    Distinguished Advisory Members
                  </h2>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Desktop Table */}
                  <div className="hidden overflow-hidden border border-green-300 lg:block">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="border-b border-green-300 px-6 py-4 text-left text-base font-bold text-black sm:text-lg">
                            Name
                          </th>
                          <th className="border-b border-green-300 px-6 py-4 text-left text-base font-bold text-black sm:text-lg">
                            Present/Past Affiliation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {advisoryCommittee.map((member, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-white" : "bg-green-50"
                            } border-b border-green-200 transition-colors duration-150 hover:bg-green-100`}
                          >
                            <td className="px-6 py-4 text-base font-medium text-black sm:text-lg">
                              {member.name}
                            </td>
                            <td className="px-6 py-4 text-base text-black sm:text-lg">
                              {member.affiliation}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile/Tablet List */}
                  <div className="space-y-4 lg:hidden">
                    {advisoryCommittee.map((member, index) => (
                      <div
                        key={index}
                        className="border border-green-200 bg-white p-4 transition-shadow duration-150 hover:shadow-md"
                      >
                        <h3 className="mb-2 text-base font-semibold text-black sm:text-lg">
                          {member.name}
                        </h3>
                        <p className="text-sm text-black sm:text-base">
                          {member.affiliation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Spacing */}
            <div className="sm:pb-22 md:pb-30 pb-10"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CommitteePage;
