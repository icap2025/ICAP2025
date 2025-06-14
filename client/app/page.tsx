import { default as ScrollUp } from "@/components/Landingpage-components/Common/ScrollUp";
import { Metadata } from "next";
import Carousel from "@/components/Landingpage-components/Carousel/Carousel";
import Message from "@/components/Landingpage-components/Message";
import RegistrationTimer from "@/components/Landingpage-components/RegistrationTImer";
import ImportantDates from "@/components/ImportantDates";
import Notice from "@/components/Notice";
import { SlCalender } from "react-icons/sl";
import { Button } from "@/components/ui/button"
import { CiLocationOn } from "react-icons/ci";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GoPin } from "react-icons/go";

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
          <div className="min-h-[20vh] md:h-[70vh] lg:h-[85vh] w-full overflow-hidden mt-16 md:mt-20 lg:mt-24">
            <img
              src="/hero_image.svg"
              alt="Conference Cover Photo"
              className="h-full w-full object-cover object-center"
              loading="eager"
              sizes="100vw"
            />

          </div>


          {/* ===================body================== */}
          <div className="w-full md:px-24  px-10  md:py-5">
            {/* Title and Desc */}
            <div className="w-full flex md:flex-row flex-col items-center justify-center">
              {/* title */}

              <div className="title md:w-[65%] my-2 md:my-10">
                <h3 className="font-bold font-inter text-3xl md:text-6xl">
                  <BlurFade delay={0.25} inView>
                    INTERNATIONAL CONFERENCE ON
                  </BlurFade>

                  <BlurFade delay={0.5}>
                    <span className="bg-primary text-white"> ADVANCES IN PHYSICS</span>
                  </BlurFade>
                </h3>
              </div>


              {/* date/venue/mode box */}


              <div className="desc md:w-[35%] relative">

                <div className=" flex flex-col gap-6 items-center text-center rounded-xl shadow-lg p-8 md:p-10">
                  <div className="absolute -top-2 z-10  -translate-x left-0">
                  
                  </div>
                  <BorderBeam
                  duration={6}
                  size={400}
                  className="from-transparent via-primary to-transparent"
                  />
                  <BorderBeam
                  duration={6}
                  delay={3}
                  size={400}
                  className="from-transparent via-black to-transparent"
                  />
                  <div className="flex items-center gap-3 text-primary font-semibold text-base md:text-lg">
                    <SlCalender className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                    <time dateTime="2025-12-17">17–18 December 2025</time>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <CiLocationOn className="w-6 h-6 md:w-8 md:h-8 text-primary" aria-hidden="true" />
                    <address className="not-italic text-sm md:text-xs font-medium">
                      Shahjalal University of Science and Technology,
                      <br className="hidden md:text-base md:block" />
                      Sylhet-3114, Bangladesh
                    </address>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <BsFillPersonLinesFill className="w-6 h-6 md:w-7 md:h-7 text-primary" aria-hidden="true" />
                    <span className="text-sm md:text-base font-medium">
                      <span className="text-primary font-semibold">Hybrid</span> (online and in-person)
                    </span>
                  </div>
                </div>

              </div>
            </div>
            {/* desc */}

            <p className="text-xl font-light text-gray-900 mt-10">The Department of Physics, Shahjalal University of Science and Technology (SUST), Sylhet-3114, Bangladesh, is pleased to announce the International Conference on Advances in Physics (ICAP 2025) to be held on 17–18 December 2025.
              This conference will serve as a vibrant platform for physicists, researchers, technologists, educators, and students to exchange knowledge, present breakthrough research, and foster interdisciplinary collaborations. The event will be conducted in a hybrid mode—offering both online and in-person participation for greater accessibility and global reach.
              We invite researchers, educators, and professionals to submit extended abstracts for oral and poster presentations that reflect original research, emerging innovations, or significant developments in the field of physics

            </p>


            {/* Registration Timer */}
            <RegistrationTimer />




            {/* Avater and Message */}

            {/* <Message /> */}



            <div className="w-full flex  flex-col md:flex-row items-center justify-between mt-20">
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
