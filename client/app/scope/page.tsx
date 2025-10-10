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
            className="absolute left-0 right-0 -bottom-4 sm:-bottom-6 md:-bottom-8 h-4 sm:h-6 md:h-8 w-full overflow-hidden"
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
            <div className="mx-auto max-w-7xl relative z-10 text-center">
            <h1 className="mb-4 text-2xl font-extrabold uppercase leading-tight text-white">
              SCOPE OF THE CONFERENCE
            </h1>
            <p className="mx-auto max-w-7xl text-base font-semibold leading-relaxed text-white">
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
                    <h2 className="md:text-2xl text-xl font-extrabold tracking-tight text-[#0B8175] drop-shadow-sm">
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
