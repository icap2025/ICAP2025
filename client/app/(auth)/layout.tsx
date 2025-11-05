import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <main className="w-full bg-slate-100">
        <section className="relative w-full flex justify-center items-center py-24">

          <div className="w-full h-full lg:w-1/2 flex flex-col justify-start overflow-auto">
            {children}
          </div>

        </section>
      </main>
    </div>
  );
}
