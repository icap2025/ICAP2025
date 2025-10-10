"use client";

const contacts = [
  {
    title: "Convener",
    phone: "+8801718-440 675",
    name: "Professor Dr. Md Shah Alam",
  },
  {
    title: "Treasurer",
    phone: "+8801712-979 269",
    name: "Professor Dr. Abdul Hannan",
  },
  {
    title: "Conference Secretary",
    phone: "+8801717266867",
    name: "Dr. Jaseer Ahmed",
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="min-h-screen bg-white font-sans">
        {/* Hero Section */}
        <section className="relative mt-16 w-full bg-[#0B8175] px-4 py-8 md:mt-20 lg:mt-24">
          {/* Triangle at the bottom */}
          <div
            className="absolute -bottom-4 left-0 right-0 h-4 w-full overflow-hidden sm:-bottom-6 sm:h-6 md:-bottom-8 md:h-8"
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
          <div className="relative z-10 mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-2xl font-extrabold uppercase leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-3xl text-sm font-semibold leading-relaxed text-white sm:text-base md:text-lg">
              Have questions about ICAP 2025? We&apos;re here to help. Reach out
              to our organizing committee for any inquiries.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="bg-gradient-to-b from-white via-[#F6FFFC] to-[#E9FDF7] px-4 py-16 sm:px-8 md:px-12 lg:py-28">
          <div className="mx-auto max-w-6xl">
            {/* Contact Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/80 p-6 shadow-xl ring-1 ring-[#0B8175]/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0B8175] to-[#0B812E] px-4 py-2">
                      <span className="text-sm font-bold text-white">
                        {contact.title}
                      </span>
                    </div>
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {contact.name}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-[#0B8175]"
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
                    <a
                      href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                      className="text-sm font-medium transition-colors hover:text-[#0B8175]"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* General Enquiries Section */}
            <div className="mt-12 rounded-xl bg-white/80 p-6 shadow-xl ring-1 ring-[#0B8175]/10 sm:p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-[#0B8175] to-[#0B812E]" />
              <h3 className="text-xl font-extrabold tracking-tight text-[#0B8175] md:text-2xl">
                General Enquiries
              </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
              {/* Email */}
              <div className="flex items-start gap-3 rounded-lg bg-gradient-to-br from-[#F6FFFC] to-white p-4 ring-1 ring-[#0B8175]/10 transition-all hover:ring-[#0B8175]/30">
                <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0B8175]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
                </svg>
                <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </p>
                <a
                  href="mailto:icap2025sust@gmail.com"
                  className="break-all text-sm font-medium text-gray-900 transition-colors hover:text-[#0B8175]"
                >
                  icap2025sust@gmail.com
                </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 rounded-lg bg-gradient-to-br from-[#F6FFFC] to-white p-4 ring-1 ring-[#0B8175]/10 transition-all hover:ring-[#0B8175]/30">
                <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0B8175]"
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
                <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone
                </p>
                <a
                  href="tel:+8801521781591"
                  className="text-sm font-medium text-gray-900 transition-colors hover:text-[#0B8175]"
                >
                  +880 1521-781591
                </a>
                </div>
              </div>
              </div>

              {/* Location Section */}
              <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#0B8175] to-[#0B812E]" />
                <h2 className="text-xl font-extrabold tracking-tight text-[#0B8175] md:text-2xl">
                Location
                </h2>
              </div>

              <div className="grid items-start gap-6 md:grid-cols-2">
                <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                  className="mt-1 h-6 w-6 flex-shrink-0 text-[#0B8175]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  </svg>
                  <div>
                  <h3 className="mb-1 font-bold text-gray-900">Address</h3>
                  <address className="not-italic leading-relaxed text-gray-700">
                    Department of Physics
                    <br />
                    Shahjalal University of Science and Technology
                    <br />
                    Sylhet-3114, Bangladesh
                  </address>
                  </div>
                </div>
                </div>

                <div className="h-64 overflow-hidden rounded-lg shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.435552561316!2d91.82933827436678!3d24.91722804298561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750556002144eab%3A0xe277e14dbca9f2ab!2sShahjalal%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sbd!4v1721041724355!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SUST Location Map"
                ></iframe>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
