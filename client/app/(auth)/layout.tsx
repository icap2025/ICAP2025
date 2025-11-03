import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <main className="w-full bg-white">
        <section className="relative w-full">
        <div className="w-full flex flex-grow overflow-auto mt-14 min-h-[20vh] sm:mt-16 md:mt-20 md:h-[70vh] lg:mt-24 lg:h-[85vh]">
          {/* Left Side */}
          <div className="hidden lg:flex lg:w-1/2 bg-green-50 overflow-hidden relative">
            <img
              src="/ICAPicon.svg"
              alt="Conference Visual"
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Right Side */}
          <div className="w-full h-full lg:w-1/2 bg-white flex flex-col justify-start overflow-auto">
            {children}
          </div>
        </div>
        </section>
      </main>
    </div>
  );
}
