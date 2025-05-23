import { default as ScrollUp } from "@/components/Landingpage-components/Common/ScrollUp";
import { Metadata } from "next";
import Carousel from "@/components/Landingpage-components/Carousel/Carousel";

export const metadata: Metadata = {
  title: "ICAP2025 | International Conference on Advances in Physics, SUST",
  description:
    "Join us for the premier global gathering of researchers and scholars in Physical Science.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="min-h-[50vh] md:h-[70vh] lg:h-[85vh] w-full overflow-hidden mt-16 md:mt-20 lg:mt-24">
            <img
              src="/hero_image.svg"
              alt="Conference Cover Photo"
              className="h-full w-full object-cover object-center"
              loading="eager"
              sizes="100vw"
            />
          </div>
        </section>

        
        <Carousel />
      </main>
      <ScrollUp />
    </div>
  );
}
