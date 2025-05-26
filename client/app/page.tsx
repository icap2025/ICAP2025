import { default as ScrollUp } from "@/components/Landingpage-components/Common/ScrollUp";
import { Metadata } from "next";
import Carousel from "@/components/Landingpage-components/Carousel/Carousel";
import Message from "@/components/Landingpage-components/Message";
import RegistrationTimer from "@/components/Landingpage-components/RegistrationTImer";
import ImportantDates from "@/components/ImportantDates";
import Notice from "@/components/Notice";

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
        <section className="relative w-full  md:px-24">
          <div className="min-h-[50vh] md:h-[70vh] lg:h-[85vh] w-full overflow-hidden mt-16 md:mt-20 lg:mt-24">
            <img
              src="/hero_image.svg"
              alt="Conference Cover Photo"
              className="h-full w-full object-cover object-center"
              loading="eager"
              sizes="100vw"
            />
          </div>


          {/* body */}
          <div className="w-full min-h-screen md:px-24 px-10 py-5">
            {/* Title and Desc */}
            <div className="w-full flex md:flex-row flex-col items-center justify-center">
              {/* title */}
              <div className="title md:w-[65%] my-10">
                <h3 className="font-bold font-inter text-6xl">INTERNATIONAL CONFERENCE ON <br /> <span className="bg-primary text-white"> ADVANCES IN PHYSICS</span></h3>

              </div>
              {/* desc */}
              <div className="desc md:w-[35%]">
                <p className="text-xl font-roboto text-gray-900">ICAP 2025 is an international physics conference hosted by the Department of Physics, SUST, Bangladesh, on 17–18 December 2025. Held in hybrid mode, it brings together global researchers to share advances and foster collaboration in physics.</p>

              </div>
            </div>
            {/* Registration Timer */}
            <RegistrationTimer />




            {/* Avater and Message */}

            {/* <Message /> */}








          </div>



     <div className="w-full flex  flex-col md:flex-row items-center justify-between mt-20">
        <ImportantDates/>
        <Notice/>

     </div>

        </section>


        {/* <Carousel /> */}
      </main>
      <ScrollUp />
    </div>
  );
}
