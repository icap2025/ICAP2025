"use client";
import React, { useState } from "react";

function CommitteePage() {
  const advisoryCommittee = [
    { name: "*Dr. M. Shamsher Ali ", affiliation: "Fellow, Bangladesh Academy of Sciences " },
    { name: "Dr. Arun Kumar Basak", affiliation: "Professor Emeritus, Department of Physics, University of Rajshahi, Bangladesh" },
    { name: "Dr. A.K.M. Azharul Islam", affiliation: "Professor Emeritus, Department of Physics, University of Rajshahi, Bangladesh" },
    { name: "Dr. Golam Mortuza", affiliation: "Department of Physics, University of Rajshahi, Bangladesh" },
    { name: "Dr. Gias Uddin Ahmad", affiliation: "Department of Physics, BUET, Bangladesh" },
    { name: "Dr. A F M Yusuf Haider", affiliation: "Department of Mathematics and Natural Sciences, BRAC University, Bangladesh" },
    { name: "Dr. Khondkar Siddique-e-Rabbani", affiliation: "Department of Biomedical Physics & Technology, University of Dhaka, Bangladesh" },
    { name: "Shamima K. Choudhury", affiliation: "Department of Physics, University of Dhaka, Bangladesh" },
    { name: "Dr. M Habibul Ahsan", affiliation: "Department of Physics, St. John's University, USA" },
    { name: "Dr. Golam Mohammed Bhuiyan", affiliation: "Department of Theoretical Physics, University of Dhaka, Bangladesh" },
    { name: "Dr. Syed Badiuzzaman Faruque", affiliation: "Department of Physics, SUST, Bangladesh" },
    { name: "Dr. A A Mamun", affiliation: "Department of Physics, Jahangirnagar University, Bangladesh" },
    { name: "Dr. A K M Akther Hossain", affiliation: "Department of Physics, BUET, Bangladesh" },
    { name: "Dr. Saleh Hasan Naqib", affiliation: "Department of Physics, University of Rajshahi, Bangladesh" },
    { name: "Dr. Sultana N Nahar", affiliation: "Department of Astronomy, Ohio State University, USA" },
    { name: "Dr. Mahmood ul Hassan", affiliation: "Department of Physics, University of the Punjab, Pakistan" },
    { name: "Dr. Mohammad Akbar", affiliation: "Department of Mathematical Sciences, University of Texas at Dallas, USA" },
    { name: "Dr. Masashi Ohashi", affiliation: "Department of Physics, Kanazawa University, Japan" },
  ];

  const organizingCommittee = {
    convener: { name: "Professor Dr. Md Shah Alam", role: "Convener" },
    treasurer: { name: "Professor Dr. Abdul Hannan", role: "Treasurer" },
    secretary: { name: "Dr. Jaseer Ahmed", role: "Conference Secretary" },
    members: [
      "Professor Dr. Shumsun Naher Begum",
      "Professor Dr. Nazia Chawdhury",
      "Professor Dr. Sharif Md. Sharafuddin",
      "Professor Dr. Md. Sujaul Haque Chowdhury",
      "Professor Dr. Sakhawat Hossain",
      "Professor Dr. Khurshida Begum",
      "Professor Dr. Mohammad Delawar Hossain",
      "Professor Dr. Muhammad Omar Faruk",
      "Ms. Subarna Soheli",
      "Mr. Elhamul Hai",
      "Dr. Sarwat Binte Rafiq",
      "Mr. Anock Somadder",
      "Dr. Md. Enamul Hoque",
      "Mr. Ponkog Kumar Das",
      "Ms. Nujhat Nuri Sultana",
      "Mr. Shahadat Hossain",
      "Mr. Sajib Kumar Mohonta",
      "Ms. Sadia Khanam"
    ]
  };

  const subCommittees = [
    {
      title: "Scientific Committee",
      convener: "Professor Dr. Md. Shah Alam",
      members: [
        "Professor Dr. Syed Badiuzzaman Faruque",
        "Professor Dr. Shumsun Naher Begum",
        "Professor Dr. Nazia Chawdhury",
        "Professor Dr. Abdul Hannan",
        "Professor Dr. Sharif Md. Sharafuddin",
        "Professor Dr. Md. Sujaul Haque Chowdhury",
        "Professor Dr. Sakhawat Hossain",
        "Professor Dr. Khurshida Begum",
        "Professor Dr. Mohammad Delawar Hossain",
        "Professor Dr. Muhammad Omar Faruk",
        "Ms. Subarna Soheli",
        "Mr. Elhamul Hai",
        "Dr. Sarwat Binte Rafiq",
        "Mr. Anock Somadder",
        "Dr. Md. Enamul Hoque",
        "Dr. Tanvir Ahmed",
        "Mr. Ponkog Kumar Das",
        "Ms. Nujhat Nuri Sultana",
        "Dr. Jaseer Ahmed",
        "Mr. Shahadat Hossain",
        "Mr. Sajib Kumar Mohonta",
        "Ms. Sadia Khanam"
      ]
    },
    {
      title: "Finance Committee",
      convener: "Professor Dr. Nazia Chawdhury",
      members: [
        "Professor Dr. Abdul Hannan",
        "Professor Dr. Sharif Md. Sharafuddin",
        "Dr. Sarwat Binte Rafiq",
        "Dr. Md Muhammad Omar Faruk",
        "Mr. Anock Somadder",
        "Dr. Jaseer Ahmed"
      ]
    },
    {
      title: "Registration Committee",
      convener: "Dr. Jaseer Ahmed",
      members: [
        "Dr. Sarwat Binte Rafiq",
        "Ms. Nujhat Nuri Sultana",
        "Mr. Shahadat Hossain",
        "Ms. Sadia Khanam"
      ]
    },
    {
      title: "Technical, Publicity and Publication Committee",
      convener: "Professor Dr. Sharif Md. Sharafuddin",
      advisors: [
        "Professor Dr. Md Forhad Rabbi, Dept. of CSE, SUST",
        "Architect Iftekhar Rahman, Dept. of Architecture, SUST"
      ],
      members: [
        "Professor Dr. Mst. Khurshida Begum",
        "Ms. Subarna Soheli",
        "Dr. Muhammad Omar Faruk",
        "Dr. Md Enamul Hoque",
        "Mr. Anock Somadder",
        "Dr. Jaseer Ahmed"
      ]
    },
    {
      title: "Transport, Accommodation and Conference Kit Committee",
      convener: "Professor Dr. Nazia Chawdhury",
      members: [
        "Professor Dr. Md. Sujaul Haque Chowdhury",
        "Professor Dr. Sakhawat Hossain",
        "Professor Dr. Mst. Khurshida Begum",
        "Mr. Elhamul Hai",
        "Dr. Sarwat Binte Rafiq",
        "Dr. Muhammad Omar Faruk"
      ]
    },
    {
      title: "Food Committee",
      convener: "Professor Dr. Abdul Hannan",
      members: [
        "Professor Dr. Mohammad Delawar Hossain",
        "Mr. Muhammad Omar Faruk",
        "Ms. Nujhat Nuri Sultana"
      ]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white px-4 md:px-24">
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <main className="flex-grow">
          {/* Header Section */}
          <div className="mb-6 text-center sm:mb-8 lg:mb-12">
            <div className="inline-block">
              <h1 className="mb-2 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Committee
              </h1>
              <div className="h-1 rounded-full bg-[#0B8175]"></div>
            </div>
            <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-gray-600 sm:text-base">
              Meet the distinguished members organizing ICAP 2025
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Chief Patron & Patrons */}
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    Leadership
                  </h2>
                </div>

                <div className="space-y-4 p-4 sm:p-6 md:p-8">
                  {/* Chief Patron */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
                    <h3 className="mb-3 text-base font-semibold text-green-800 sm:text-lg">
                      Chief Patron
                    </h3>
                    <div className="rounded-md bg-white p-3 shadow-sm">
                      <p className="text-sm font-bold text-[#0B8175] sm:text-base">
                        Professor Dr. A. M. Sarwaruddin Chowdhury
                      </p>
                      <p className="text-xs text-gray-600 sm:text-sm">
                        Vice Chancellor, Shahjalal University of Science and Technology
                      </p>
                    </div>
                  </div>

                  {/* Patrons */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
                    <h3 className="mb-3 text-base font-semibold text-green-800 sm:text-lg">
                      Patrons
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
                      <div className="rounded-md bg-white p-3 shadow-sm">
                        <p className="text-sm font-bold text-[#0B8175] sm:text-base">
                          Professor Dr Md Shajedul Karim
                        </p>
                        <p className="text-xs text-gray-600 sm:text-sm">
                          Pro Vice Chancellor, Shahjalal University of Science and Technology
                        </p>
                      </div>
                      <div className="rounded-md bg-white p-3 shadow-sm">
                        <p className="text-sm font-bold text-[#0B8175] sm:text-base">
                          Professor Dr. Md. Ismail Hossain
                        </p>
                        <p className="text-xs text-gray-600 sm:text-sm">
                          Treasurer, Shahjalal University of Science and Technology
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizing Committee */}
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    Organizing Committee
                  </h2>
                </div>

                <div className="space-y-4 p-4 sm:p-6 md:p-8">
                  {/* Key Positions */}
                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center sm:p-4">
                      <h3 className="mb-2 text-sm font-semibold text-green-800 sm:text-base">
                        Convener
                      </h3>
                      <p className="text-sm font-bold text-[#0B8175] sm:text-base">
                        {organizingCommittee.convener.name}
                      </p>
                    </div>
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center sm:p-4">
                      <h3 className="mb-2 text-sm font-semibold text-green-800 sm:text-base">
                        Treasurer
                      </h3>
                      <p className="text-sm font-bold text-[#0B8175] sm:text-base">
                        {organizingCommittee.treasurer.name}
                      </p>
                    </div>
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center sm:p-4">
                      <h3 className="mb-2 text-sm font-semibold text-green-800 sm:text-base">
                        Conference Secretary
                      </h3>
                      <p className="text-sm font-bold text-[#0B8175] sm:text-base">
                        {organizingCommittee.secretary.name}
                      </p>
                    </div>
                  </div>

                  {/* Members */}
                  <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
                    <h3 className="mb-3 text-base font-semibold text-green-800 sm:text-lg">
                      Members
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {organizingCommittee.members.map((member, index) => (
                        <div key={index} className="rounded-md bg-white p-2 shadow-sm">
                          <p className="text-xs font-medium text-gray-700 sm:text-sm">
                            {member}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advisory Committee */}
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    Advisory Committee
                  </h2>
                </div>

                <div className="space-y-4 p-4 sm:p-6 md:p-8">
                  <p className="text-sm text-gray-600 sm:text-base">
                    We are honored to present the Advisory Committee for the{" "}
                    <span className="font-semibold text-[#0B8175]">
                      International Conference on Advances in Physics (ICAP 2025)
                    </span>
                  </p>

                  {/* Desktop Table */}
                  <div className="hidden overflow-hidden rounded-lg border border-gray-200 lg:block">
                    <table className="w-full">
                      <thead className="bg-green-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-base font-bold text-[#0B8175] sm:px-6 sm:py-4 md:text-lg">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-base font-bold text-[#0B8175] sm:px-6 sm:py-4 md:text-lg">
                            Present/Past Affiliation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {advisoryCommittee.map((member, index) => (
                          <tr
                            key={index}
                            className={`border-t border-gray-200 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } transition-colors duration-200 hover:bg-green-50`}
                          >
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                              {member.name}
                             { index==0 && <span className="text-xs line-clamp-5 font-light">In fond memory of Dr. M Shamsher Ali, whose guidance and contributions to the ICAP-2025 will be remembered with deep gratitude. He passed away on 03 August 2025</span>
}
                           </td>
                            <td className="px-4 py-3 text-sm text-gray-700 sm:px-6 sm:py-4 sm:text-base">
                              {member.affiliation}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="space-y-3 lg:hidden">
                    {advisoryCommittee.map((member, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4"
                      >
                        <h3 className="mb-2 text-base font-semibold text-green-800 sm:text-lg">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-700">
                          {member.affiliation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Committees */}
            <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-[#0B8175] p-3 sm:p-4">
                  <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                    Sub-Committees
                  </h2>
                </div>

                <div className="space-y-6 p-4 sm:p-6 md:p-8">
                  {subCommittees.map((committee, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4"
                    >
                      <h3 className="mb-3 text-base font-semibold text-green-800 sm:text-lg">
                        {committee.title}
                      </h3>
                      
                      <div className="mb-3 rounded-md bg-white p-3 shadow-sm">
                        <p className="text-sm font-bold text-[#0B8175] sm:text-base">
                          Convener: {committee.convener}
                        </p>
                      </div>

                      {committee.advisors && (
                        <div className="mb-3">
                          <h4 className="mb-2 text-sm font-semibold text-green-700">
                            Advisors:
                          </h4>
                          <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
                            {committee.advisors.map((advisor, advisorIndex) => (
                              <div key={advisorIndex} className="rounded-md bg-white p-2 shadow-sm">
                                <p className="text-xs font-medium text-gray-700 sm:text-sm">
                                  {advisor}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-green-700">
                          Members:
                        </h4>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                          {committee.members.map((member, memberIndex) => (
                            <div key={memberIndex} className="rounded-md bg-white p-2 shadow-sm">
                              <p className="text-xs font-medium text-gray-700 sm:text-sm">
                                {member}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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

export default CommitteePage;
