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
import InvitedTalkSlider from "@/components/InvitedTalk";

export const metadata: Metadata = {
  title: "ICAP2025 | International Conference on Advances in Physics, SUST",
  description:
    "Join us for the premier global gathering of researchers and scholars in Physical Science.",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="w-full bg-white">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="mt-14 min-h-[20vh] w-full overflow-hidden sm:mt-16 md:mt-20 md:h-[70vh] lg:mt-24 lg:h-[85vh]">
            <img
              src="/hero_image.svg"
              alt="Conference Cover Photo"
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
              loading="eager"
              sizes="100vw"
            />
          </div>

          {/* ===================body================== */}
          <div className="w-full px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-20 xl:px-24">
            {/* Title and Desc */}
            <div className="flex w-full flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:gap-10 xl:gap-12">
              {/* title */}
              <div className="title my-4 w-full sm:my-6 md:my-8 lg:my-10 lg:w-[65%]">
                <h3 className="font-inter text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                  <BlurFade delay={0.25} inView>
                    INTERNATIONAL CONFERENCE ON
                  </BlurFade>

                  <BlurFade delay={0.5}>
                    <span className="bg-primary inline-block px-2 py-1 text-white transition-all duration-300 hover:shadow-lg sm:px-3 sm:py-2">
                      {" "}
                      ADVANCES IN PHYSICS
                    </span>
                  </BlurFade>
                </h3>
              </div>

              {/* date/venue/mode box */}
              <div className="desc w-full lg:w-[35%]">
                <div className="relative flex flex-col items-center gap-3 overflow-hidden rounded-xl bg-white p-5 text-center shadow-lg transition-all duration-300 hover:shadow-2xl sm:gap-4 sm:p-6 md:gap-5 md:p-8 lg:p-10">
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
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary transition-all duration-300 hover:scale-105 sm:gap-3 sm:text-sm md:text-base lg:text-lg">
                    <SlCalender
                      className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                      aria-hidden="true"
                    />
                    <time dateTime="2025-12-17">17–18 December 2025</time>
                  </div>
                  <div className="flex items-start gap-2 text-gray-800 transition-all duration-300 hover:text-primary sm:gap-3">
                    <CiLocationOn
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8"
                      aria-hidden="true"
                    />
                    <address className="text-left text-[10px] font-medium not-italic sm:text-xs md:text-sm lg:text-base">
                      Shahjalal University of Science and Technology,
                      <br />
                      Sylhet-3114, Bangladesh
                    </address>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800 transition-all duration-300 hover:text-primary sm:gap-3">
                    <BsFillPersonLinesFill
                      className="h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-medium sm:text-xs md:text-sm lg:text-base">
                      <span className="font-semibold text-primary">Hybrid</span>{" "}
                      (online and in-person)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* desc */}

            <p className="my-6 text-sm font-light leading-relaxed text-gray-900 sm:my-8 sm:text-base md:my-10 md:text-lg lg:text-xl">
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

            <div className="my-8 text-center sm:my-10 md:my-12">
              <a
                href="/Brochure.pdf"
                download="Brochure.pdf"
                className="group inline-flex max-w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-[#0B8175] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-[#0A6B61] hover:to-primary hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 sm:gap-3 sm:px-6 sm:py-3.5 sm:text-base md:px-8 md:py-4 md:text-lg"
              >
                <span>Download Brochure</span>
                <TfiDownload className="text-sm transition-transform duration-300 group-hover:translate-y-1 sm:text-base md:text-lg" />
              </a>
            </div>

            {/* Registration Timer */}
            <RegistrationTimer />

            <div className="mt-12 flex w-full flex-col items-start justify-between gap-8 sm:mt-16 md:mt-20 lg:flex-row lg:items-center">
              <ImportantDates />
              <Notice />
            </div>
            {/* Invited Talks Slider */}
            <div className="my-2 sm:my-4 md:my-6 lg:my-8">
              <InvitedTalkSlider />
            </div>
          </div>
        </section>

        {/* <Carousel /> */}
      </main>
      <ScrollUp />
    </div>
  );
}