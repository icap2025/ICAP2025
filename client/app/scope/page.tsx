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
      title: "Theoretical, Mathematical, and High-Energy Physics",
      items: [
        "Quantum field theory, gauge symmetries, and unified models",
        "Precision tests of the Standard Model",
        "Beyond the Standard Model physics and collider phenomenology",
        "String theory, supersymmetry, and quantum gravity",
        "Mathematical foundations and computational modeling in theoretical physics",
      ],
    },
    {
      title: "Nuclear, Particle, and Reactor Physics",
      items: [
        "Nuclear structure, reactions, and nuclear astrophysics",
        "Neutrino physics, detectors, and rare event searches",
        "Particle detectors, instrumentation, and accelerator technology",
        "Reactor physics, nuclear energy technologies, and safety modeling"
      ],
    },
    {
      title: "Photonics, Optics, and Laser Science",
      items: [
        "Nonlinear optics, quantum optics, and optoelectronics",
        "Photonic materials, devices, and integrated optics",
        "High-intensity laser-matter interaction and ultrafast optics",
        "Laser diagnostics, spectroscopy, and applications in science and medicine",
      ],
    },
    {
      title: "Nanoscience, Microelectronics, and Quantum Technologies",
      items: [
        "Nanostructures, nanofabrication, and quantum confinement",
        "Nanoscale measurement techniques",
        "Semiconductor physics, micro/nanoelectronic devices, and organic electronics",
        "Quantum computing, simulation, and quantum information science",
      ],
    },
    {
      title: "Atomic, Molecular, and Plasma Physics",
      items: [
        "Cold atoms, Bose-Einstein condensates, and quantum gases",
        "Atomic collisions, molecular dynamics, and precision spectroscopy",
        "Plasma physics, fusion technology, and astrophysical plasmas"
      ],
    },
    {
      title: "Astrophysics, Cosmology, and Space Physics",
      items: [
        "Black holes, compact objects, and gravitational waves",
        "Dark matter, dark energy, cosmic inflation, and large-scale structure",
        "Stellar evolution, cosmological observations, and space plasmas",
        "Multi-messenger astronomy and observational instrumentation",
      ],
    },
    {
      title: "Earth, Atmospheric, and Environmental Physics",
      items: [
        "Atmospheric dynamics, meteorology, and geophysics",
        "Climate modeling, radiation transport, and environmental monitoring",
        "Remote sensing, earth observation, and sustainable technologies"
      ],
    },
    {
      title: "Computational Physics",
      items: [
        "Modeling and simulation of complex physical systems",
        "High-performance computing and numerical methods",
        "Machine learning and AI applications in physics research",
      ],
    },
    {
      title: "Medical, Health and Biophysics",
      items: [
        "Medical physics, health physics, and biomedical imaging",
        "Biophysics of cells, tissues, and molecular systems",
        "Nonlinear bio-optics",
        "Bio-heat and hemodynamics",
      ],
    },
    {
      title: "Physics Education, Outreach, and Policy",
      items: [
        "Innovative pedagogy and curriculum development in physics",
        "Digital tools, simulations, and e-learning platforms",
        "Public engagement, science outreach, and research policy frameworks",
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="min-h-screen bg-white font-sans">
        <section
          className="w-full mt-16 md:mt-20 lg:mt-24 py-8 px-4 bg-[#0B8175] relative"
        >
          {/* Triangle at the bottom */}
          <div
            className="absolute left-0 right-0 -bottom-8 h-8 w-full overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="mx-auto w-full"
              style={{
          width: "100%",
          height: "100%",
          clipPath: "polygon(0 0, 50% 100%, 100% 0)",
          background: "#0B8175",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl relative z-10">
            <h1 className="mb-4 text-2xl font-extrabold uppercase leading-tight text-white">
              SCOPE OF THE CONFERENCE
            </h1>
            <p className="max-w-7xl text-base font-semibold leading-relaxed text-white">
              ICAP 2025 covers a wide range of contemporary and emerging topics
              in physics, including but not limited to
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white via-[#F6FFFC] to-[#E9FDF7] px-4 py-16 sm:px-8 md:px-12 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-16">
              {scope.map((section, index) => (
                <div
                  key={`${section.title}-${index}`}
                  className="rounded-xl bg-white/80 shadow-xl ring-1 ring-[#0B8175]/10 transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl"
                >
                  <div className="mb-6 flex items-center gap-3 px-6 pt-8">
                    <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#0B8175] to-[#0B812E]" />
                    <h2 className="text-2xl font-extrabold tracking-tight text-[#0B8175] drop-shadow-sm">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mb-8 space-y-4 px-10 pb-8">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={`${item}-${itemIndex}`}
                        className="group flex items-start space-x-4"
                      >
                        <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#0B8175] to-[#0B812E] group-hover:scale-125 transition-transform" />
                        <span className="text-base font-medium leading-relaxed text-gray-800 group-hover:text-[#0B8175] transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  {index < scope.length - 1 && (
                    <div className="mx-auto w-11/12 pb-2">
                      <div
                        className="h-1 w-full rounded-full bg-gradient-to-r from-transparent via-[#0B8175]/40 to-transparent"
                        style={{
                          boxShadow: "0px 2px 8px 0px #0B817540",
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
