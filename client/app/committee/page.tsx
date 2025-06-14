"use client";
import React, { useState } from "react";
import { Particles } from "@/components/magicui/particles";

function CommitteePage() {
 const advisoryCommittee = [
  { name: "Dr. M. Shamsher Ali", presentPastAffiliation: "Dhaka University" },
  { name: "Prof. Dr. Arun Kumar Basak", presentPastAffiliation: "Rajshahi University" },
  { name: "Prof. Dr. A.K.M. Azharul Islam", presentPastAffiliation: "Rajshahi University" },
  { name: "Dr. GOLAM MORTUZA", presentPastAffiliation: "Rajshahi University" },
  { name: "Dr. Gias uddin Ahmad", presentPastAffiliation: "BUET" },
  { name: "A F M Yusuf Haider, PhD", presentPastAffiliation: "Dhaka University" },
  { name: "Dr. Khondkar Siddique-e-Rabbani", presentPastAffiliation: "Dhaka University" },
  { name: "Shamima K. Choudhury", presentPastAffiliation: "Dhaka University" },
  { name: "Dr. M Habibul Ahsan", presentPastAffiliation: "St. John’s University" },
  { name: "Dr. Golam Mohammed Bhuiyan", presentPastAffiliation: "Dhaka University" },
  { name: "Dr. A A Mamun", presentPastAffiliation: "Jahangirnagar University" },
  { name: "Dr. Saleh Hasan Naqib", presentPastAffiliation: "Rajshahi University" },
  { name: "Dr. Sultana N Nahar", presentPastAffiliation: "Ohio State University, USA" },
  { name: "Dr Syed Badiuzzaman Faruque", presentPastAffiliation: "SUST" },
  { name: "Dr. A K M Akther Hossain", presentPastAffiliation: "BUET" },
  { name: "Dr. Mahmood ul Hassan", presentPastAffiliation: "Punjab University, Pakistan" },
  { name: "Dr. Mohammad Akbar", presentPastAffiliation: "University of Texas at Dallas, USA" },
  { name: "Dr. Masashi Ohashi", presentPastAffiliation: "Kanazawa University, Japan" }
];

  const [color, setColor] = useState("#ffffff");
  return (
    <div className=" flex min-h-screen flex-col bg-gradient-to-br from-white via-[#e6f9f6] to-[#c6f0e7]">


      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <main className="flex-grow">
      {/* Header Section */}
      <div className="mb-10 text-center sm:mb-14 lg:mb-20">
      <div className="inline-block">
        <h1 className="mb-3 mt-14 text-3xl font-extrabold tracking-tight text-[#0B8175] drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
        Advisory Committee
        </h1>
        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#0B8175] via-[#2dd4bf] to-[#0B8175]"></div>
      </div>
      <p className="mx-auto mt-6 max-w-2xl px-4 text-base text-gray-700 sm:text-lg">
        We are honored to present the Advisory Committee for the <span className="font-semibold text-[#0B8175]">International Conference on Advances in Physics (ICAP 2025)</span>
      </p>
      </div>

      {/* Advisory Committee Members */}
      <div className="space-y-8 sm:space-y-12 lg:space-y-16 px-2 md:px-24">
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20">
        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white/80 shadow-2xl backdrop-blur-md transition-all duration-300 hover:shadow-emerald-200">
        <div className="bg-gradient-to-r from-[#0B8175] via-[#2dd4bf] to-[#0B8175] p-6 sm:p-8">
        <h2 className="flex items-center text-xl font-extrabold text-white sm:text-2xl md:text-3xl tracking-tight">
        
        Distinguished Advisory Members
        </h2>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
        {/* Desktop Table */}
        <div className="hidden overflow-hidden border border-green-200 rounded-xl shadow-sm lg:block">
        <table className="w-full">
          <thead>
          <tr className="bg-gradient-to-r from-green-100 via-[#e6f9f6] to-green-100">
          <th className="border-b border-green-200 px-6 py-4 text-left text-base font-bold text-[#0B8175] uppercase tracking-wider">
          Name
          </th>
          <th className="border-b border-green-200 px-6 py-4 text-left text-base font-bold text-[#0B8175] uppercase tracking-wider">
          Present/Past Affiliation
          </th>
          </tr>
          </thead>
          <tbody>
          {advisoryCommittee.map((member, index) => (
          <tr
          key={index}
          className={`${
            index % 2 === 0 ? "bg-white/90" : "bg-[#f3faf8]"
          } border-b border-green-100 transition-colors duration-150 hover:bg-[#e6f9f6]`}
          >
          <td className="px-6 py-4 text-sm font-semibold text-gray-900 sm:text-base">
            {member.name}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 sm:text-base">
            {member.presentPastAffiliation}
          </td>
          </tr>
          ))}
          </tbody>
        </table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="space-y-4 lg:hidden">
        {advisoryCommittee.map((member, index) => (
          <div
          key={index}
          className="relative border border-green-200 bg-white/90 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
          <div className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#0B8175] to-[#2dd4bf] shadow-md">
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="10" />
          </svg>
          </div>
          <h3 className="mb-1 text-base font-bold text-[#0B8175]">{member.name}</h3>
          <p className="text-sm text-gray-700">{member.presentPastAffiliation}</p>
          </div>
        ))}
        </div>
        </div>
        </div>
      </div>
      {/* Bottom Spacing */}
      <div className="sm:pb-24 md:pb-32 pb-14"></div>
      </div>
      </main>
      </div>
    </div>
  );
}

export default CommitteePage;
