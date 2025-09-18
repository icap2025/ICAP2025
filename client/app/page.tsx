import { default as ScrollUp } from "@/components/Landingpage-components/Common/ScrollUp";
import { Metadata } from "next";
import Carousel from "@/components/Landingpage-components/Carousel/Carousel";
import Message from "@/components/Landingpage-components/Message";
import RegistrationTimer from "@/components/Landingpage-components/RegistrationTImer";
import ImportantDates from "@/components/ImportantDates";
import Notice from "@/components/Notice";
import { SlCalender } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { CiLocationOn } from "react-icons/ci";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TfiDownload } from "react-icons/tfi";

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
        <section className="relative w-full ">
          <div className="mt-16 min-h-[20vh] w-full overflow-hidden md:mt-20 md:h-[70vh] lg:mt-24 lg:h-[85vh]">
            <img
              src="/hero_image.svg"
              alt="Conference Cover Photo"
              className="h-full w-full object-cover object-center"
              loading="eager"
              sizes="100vw"
            />

          </div>

          {/* ===================body================== */}
          <div className="w-full px-10  md:px-24  md:py-5">
            {/* Title and Desc */}
            <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
              {/* title */}
              <div className="title my-4 w-full px-4 sm:px-0 md:my-6 lg:my-10 lg:w-[65%]">
                <h3 className="font-inter text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <BlurFade delay={0.25} inView>
                    INTERNATIONAL CONFERENCE ON
                  </BlurFade>

                  <BlurFade delay={0.5}>
                    <span className="bg-primary text-white">
                      {" "}
                      ADVANCES IN PHYSICS
                    </span>
                  </BlurFade>
                </h3>
              </div>

              {/* date/venue/mode box */}
              <div className="desc relative w-full px-4 sm:px-0 lg:w-[35%]">
                <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-xl p-6 text-center shadow-lg sm:gap-6 sm:p-8 md:p-10">
                  <div className="-translate-x absolute -top-2 left-0 z-10"></div>
                  <BorderBeam
                    duration={6}
                    size={200}
                    className="absolute inset-0 from-transparent via-primary to-transparent"
                  />
                  <BorderBeam
                    duration={6}
                    delay={3}
                    size={200}
                    className="absolute inset-0 from-transparent via-primary to-transparent"
                  />
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary sm:gap-3 sm:text-base md:text-lg">
                    <SlCalender
                      className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6 md:h-7 md:w-7"
                      aria-hidden="true"
                    />
                    <time dateTime="2025-12-17">17–18 December 2025</time>
                  </div>
                  <div className="flex items-start gap-2 text-gray-800 sm:gap-3">
                    <CiLocationOn
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary sm:h-6 sm:w-6 md:h-8 md:w-8"
                      aria-hidden="true"
                    />
                    <address className="text-left text-xs font-medium not-italic sm:text-sm md:text-base">
                      Shahjalal University of Science and Technology,
                      <br />
                      Sylhet-3114, Bangladesh
                    </address>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800 sm:gap-3">
                    <BsFillPersonLinesFill
                      className="h-5 w-5 flex-shrink-0 text-primary sm:h-6 sm:w-6 md:h-7 md:w-7"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium sm:text-sm md:text-base">
                      <span className="font-semibold text-primary">Hybrid</span>{" "}
                      (online and in-person)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* desc */}

            <p className="my-10 text-xl font-light text-gray-900">
              The Department of Physics, Shahjalal University of Science and
              Technology (SUST), Sylhet-3114, Bangladesh, is pleased to announce
              the{" "}
              <span className="font-bold">
                International Conference on Advances in Physics (ICAP 2025)
              </span>{" "}
              to be held on{" "}
              <span className="font-bold">17–18 December 2025</span>. <br></br>
              <br></br>This conference will serve as a vibrant platform for
              physicists, researchers, technologists, educators, and students to
              exchange knowledge, present breakthrough research, and foster
              interdisciplinary collaborations.{" "}
              <span className="text-primary">
                The event will be conducted in a
                <span className="font-bold"> hybrid mode</span>, offering both{" "}
                <span className="font-bold">online</span> and{" "}
                <span className="font-bold">in-person</span> participation for
                greater accessibility and global reach
              </span>
              . <br></br>
              <br></br>We invite researchers, educators, and professionals to
              submit extended abstracts for oral and poster presentations that
              reflect original research, emerging innovations, or significant
              developments in the field of physics
            </p>

            <div className="text-center">
                <a
                href="/Brochure.pdf"
                download="Brochure.pdf"
                className="group inline-flex max-w-full items-center justify-center rounded-sm bg-gradient-to-r from-primary to-[#0B8175] px-4 py-3 font-semibold text-white shadow-md transition-all animate-bounce duration-600 hover:from-[#0A6B61] hover:to-primary hover:shadow-lg hover:animate-none hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                <span className="mr-2 text-sm sm:text-base">
                  Download Brochure
                </span>
                <TfiDownload className="text-sm transition-transform duration-700 group-hover:animate-bounce sm:text-base" />
                </a>

            </div>
            {/* Registration Timer */}
            <RegistrationTimer />

            {/* Avater and Message */}

            {/* <Message /> */}

            <div className="mt-20 flex  w-full flex-col items-center justify-between md:flex-row">
              <ImportantDates />
              <Notice />
            </div>
          </div>
        </section>

        {/* <Carousel /> */}
      </main>
      <ScrollUp />
    </div>
  );
}
