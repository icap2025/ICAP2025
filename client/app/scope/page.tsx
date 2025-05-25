// import { title } from "process";
// import React from "react";

// function ScopePage() {
//   const scope = [
//     {
//       title: "Theoretical, Mathematical, and High-Energy Physics",
//       items: [
//         "Quantum field theory, gauge symmetries, and unified models",
//         "Precision tests of the Standard Model",
//         "Beyond the Standard Model physics and collider phenomenology",
//         "String theory, supersymmetry, and quantum gravity",
//         "Mathematical foundations and computational modeling in theoretical physics",
//       ],
//     },
//     {
//       title: "Theoretical, Mathematical, and High-Energy Physics",
//       items: [
//         "Quantum field theory, gauge symmetries, and unified models",
//         "Precision tests of the Standard Model",
//         "Beyond the Standard Model physics and collider phenomenology",
//         "String theory, supersymmetry, and quantum gravity",
//         "Mathematical foundations and computational modeling in theoretical physics",
//       ],
//     },
//     {
//       title: "Theoretical, Mathematical, and High-Energy Physics",
//       items: [
//         "Quantum field theory, gauge symmetries, and unified models",
//         "Precision tests of the Standard Model",
//         "Beyond the Standard Model physics and collider phenomenology",
//         "String theory, supersymmetry, and quantum gravity",
//         "Mathematical foundations and computational modeling in theoretical physics",
//       ],
//     },
//   ];
//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="min-h-screen bg-white">
//         <div className="flex-col justify-between">
//         <section className="relative w-full">
//           <div className="relative mt-24">
//             <div className="absolute inset-0 z-10 bg-transparent"></div>
//             <img
//               src="/scope_rectangle.svg"
//               alt="Conference Scope Background"
//               className="absolute inset-0 h-[18vh] max-h-[52vh] w-full object-cover object-center md:h-[36vh] lg:h-[52vh]"
//               loading="eager"
//             />
//             <div className="container relative z-20 mx-auto flex h-full flex-col justify-center px-4 py-4 sm:px-6 md:px-8 lg:py-16">
//               <h1 className="mb-2 text-xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl">
//                 Scope of the Conference
//               </h1>
//               <p className="max-w-6xl text-xs text-gray-100 md:text-base lg:text-lg">
//                 ICAP 2025 covers a wide range of contemporary and emerging
//                 topics in physics, including but not limited to
//               </p>
//             </div>
//           </div>
//         </section>
//         <section className="bg-white py-12 sm:py-16 md:py-32 lg:py-36">
//           <div className="container mx-auto max-w-4xl px-4 sm:px-4 md:px-6">
//             <div className="space-y-8 md:space-y-12">
//               {scope.map((section, index) => (
//                 <div
//                   key={section.title}
//                   className="group transition-all duration-300 hover:transform hover:scale-[1.01]"
//                 >
//                   <div className="mb-6">
//                     <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-3xl">
//                       {section.title}
//                     </h2>
//                     <div
//                       className="h-1 max-w-3xl bg-green-700 " //w-[length:var(40px)] sm:w-[length:var(--sm-width)] md:w-[length:var(--md-width)] xl:w-[length:var(--xl-width)]
//                       style={{
//                         '--sm-width': `${section.title.length * 10}px`,
//                         '--md-width': `${section.title.length * 14}px`,
//                         '--xl-width': `${section.title.length * 16}px`,
//                       } as React.CSSProperties}
//                     ></div>
//                   </div>

//                   <div className="ml-0 sm:ml-4">
//                     <ul className="space-y-3 md:space-y-4">
//                       {section.items.map((item, itemIndex) => (
//                         <li
//                           key={item}
//                           className="flex items-start space-x-3 text-gray-700 transition-all duration-200 hover:text-gray-900"
//                         >
//                           <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
//                           <span className="text-sm leading-relaxed sm:text-base md:text-lg">
//                             {item}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {index < scope.length - 1 && (
//                     <div className="mt-8 md:mt-12">
//                       <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//             </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default ScopePage;

function ScopePage() {
  const scope = [
    {
      title: "THEORETICAL, MATHEMATICAL, AND HIGH-ENERGY PHYSICS",
      items: [
        "QUANTUM FIELD THEORY, GAUGE SYMMETRIES, AND UNIFIED MODELS",
        "PRECISION TESTS OF THE STANDARD MODEL",
        "BEYOND THE STANDARD MODEL PHYSICS AND COLLIDER PHENOMENOLOGY",
        "STRING THEORY, SUPERSYMMETRY, AND QUANTUM GRAVITY",
        "MATHEMATICAL FOUNDATIONS AND COMPUTATIONAL MODELING IN THEORETICAL PHYSICS",
      ],
    },
    {
      title: "CONDENSED MATTER PHYSICS",
      items: [
        "QUANTUM MATERIALS AND TOPOLOGICAL PHASES OF MATTER",
        "STRONGLY CORRELATED ELECTRON SYSTEMS",
        "NANOSTRUCTURES AND QUANTUM DOTS",
        "SUPERCONDUCTIVITY AND SUPERFLUIDITY",
        "SPINTRONICS AND QUANTUM INFORMATION PROCESSING",
      ],
    },
    {
      title: "ASTROPHYSICS AND COSMOLOGY",
      items: [
        "DARK MATTER AND DARK ENERGY",
        "COSMIC MICROWAVE BACKGROUND RADIATION AND LARGE-SCALE STRUCTURE",
        "GRAVITATIONAL WAVES AND BLACK HOLE PHYSICS",
        "EXOPLANETS AND ASTROBIOLOGY",
        "HIGH-ENERGY ASTROPHYSICS AND COSMIC RAYS",
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="min-h-screen bg-white font-sans">
        <section
          className="w-full mt-16 md:mt-20 lg:mt-24 py-8 px-4 bg-[#0B8175]"
        >
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-xl font-extrabold uppercase leading-tight text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              SCOPE OF THE CONFERENCE
            </h1>
            <p className="max-w-7xl text-xs font-extrabold uppercase leading-relaxed text-white sm:text-sm md:text-base lg:text-lg xl:text-xl">
              ICAP 2025 COVERS A WIDE RANGE OF CONTEMPORARY AND EMERGING TOPICS
              IN PHYSICS, INCLUDING BUT NOT LIMITED TO
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
              {scope.map((section, index) => (
                <div key={`${section.title}-${index}`}>

                  <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14">
                    <h2 className="text-lg font-bold uppercase leading-tight text-black sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="mb-12 space-y-4 sm:mb-16 sm:space-y-5 md:mb-20 md:space-y-6 lg:mb-24 lg:space-y-7">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={`${item}-${itemIndex}`}
                        className="flex items-start space-x-3 sm:space-x-4"
                      >
                        <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-black sm:mt-1.5 sm:h-2.5 sm:w-2.5 md:mt-2 md:h-3 md:w-3"></div>
                        <span className="text-xs font-semibold uppercase leading-tight text-black sm:text-sm md:text-base lg:text-lg xl:text-xl">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {index < scope.length - 1 && (
                    <div className="mx-auto w-full max-w-6xl">
                      <div
                        className="h-1 w-full shadow-lg sm:h-1.5 md:h-2"
                        style={{
                          backgroundColor: "#0B812E",
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ScopePage;
