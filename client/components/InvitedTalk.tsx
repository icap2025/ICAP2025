"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const InvitedTalk = [
    {
        name: "Professor Emeritus Dr. A.K.M. Azharul Islam",
        university: "Rajshahi University, Bangladesh",
        image: "/guest/AKM-Azharul.png",
        bio: `Professor Emeritus Dr. A.K.M. Azharul Islam, Fellow of the Bangladesh Academy of Sciences and the Institute of Physics (London), is a distinguished physicist renowned for his pioneering research in superconductivity and condensed matter physics, with scholarly contributions that have profoundly influenced modern physical science in Bangladesh and beyond.`,
        status: 'Plenary Speaker'
    },
    {
        name: "Prof. Dr. Abul Kalam Azad",
        university: "Universiti Brunei Darussalam, Brunei",
        image: "/guest/AbulKalamAzad.png",
        bio: `Prof. Dr. Abul Kalam Azad, a globally recognized researcher in advanced energy materials and fuel cell technologies from Universiti Brunei Darussalam, whose pioneering research on sustainable energy systems continues to make significant international impact.`,
        status: 'Distinguished Speaker'
    },
    {
        name: "Professor Dr. Ismail Rahman",
        university: "Fukushima University, Japan",
        image: "/guest/IsmailRahman.png",
        bio: `Professor Dr. Ismail Rahman, an eminent scholar in environmental radioactivity and analytical chemistry from Fukushima University, Japan, whose research on radionuclide separation and environmental remediation has made significant contributions to the advancement of environmental and radiochemical sciences.`,
        status: 'Distinguished Speaker'
    },
    {
        name: "Prof. Dr. Masashi Ohashi",
        university: "Kanazawa University, Japan",
        image: "/guest/MasashiOhashi.png",
        bio: `Professor Dr. Masashi Ohashi, a distinguished physicist from Kanazawa University, Japan, whose pioneering research in low-temperature physics and functional materials has made significant contributions to the advancement of thermophysical and magnetic materials science.`,
        status: 'Distinguished Speaker'
    },
    {
        name: "Professor Md. Wahadoszamen",
        university: "University of Dhaka, Bangladesh",
        image: "/guest/Wahadoszamen.png",
        bio: `Professor Md. Wahadoszamen is a distinguished physicist renowned for his pioneering contributions to laser and optical spectroscopy, nanomaterials research, and biophysical energy studies, whose work has significantly advanced the understanding of molecular interactions, light–matter dynamics, and spectroscopic innovations in contemporary experimental physics.`,
        status: 'Invited Speaker'
    },
    {
        name: "Professor Dr. Saleh Hasan Naqib",
        university: "Department of Physics, University of Rajshahi,Bangladesh",
        image: "/guest/SalehHasanNaqib.png",
        bio: `Professor Dr. Saleh Hasan Naqib, Department of Physics, University of Rajshahi, is a leading condensed matter physicist whose extensive research on high-temperature superconductivity, strongly correlated electron systems, and transport phenomena has significantly advanced the understanding of complex quantum materials in both theoretical and experimental domains.`,
        status: 'Invited Speaker'
    }
];

interface Speaker {
    name: string;
    university: string;
    image: string;
    bio: string;
    status: string;
}

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="relative mb-4 sm:mb-6 md:mb-8">
                <div className="sm:border-6 relative h-28 w-28 overflow-hidden rounded-full border-4 border-primary shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl xs:h-32 xs:w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 lg:border-6">
                    <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                    />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-white shadow-lg xs:-bottom-3 xs:px-4 xs:py-1.5 xs:text-xs sm:-bottom-4 sm:px-6 sm:py-1.5 sm:text-sm">
                    {speaker.status}
                </div>
            </div>

            <h3 className="mt-2 px-2 text-center text-sm font-bold text-gray-900 xs:text-base sm:mt-4 sm:text-lg md:text-xl lg:text-2xl">
                {speaker.name}
            </h3>
            <p className="mt-1 px-2 text-center text-[11px] leading-relaxed text-gray-700 xs:text-xs sm:mt-2 sm:text-sm md:text-base">
                {speaker.university}
            </p>

            <div className="mt-4 w-full px-2 text-center sm:mt-6 sm:px-4 md:mt-8">
                <div className="relative rounded-xl bg-gradient-to-br from-cyan-50/80 via-blue-50/80 to-teal-50/80 p-2 shadow-sm sm:p-4">
                    <span className="absolute -left-1 -top-2 font-serif text-2xl text-primary opacity-30 xs:-left-2 xs:-top-3 xs:text-3xl sm:-left-3 sm:-top-4 sm:text-4xl md:text-5xl">
                        &quot;
                    </span>
                    <p className="px-2 py-1 text-[11px] italic leading-relaxed text-gray-800 xs:px-3 xs:py-2 xs:text-xs sm:px-6 sm:text-sm md:text-base">
                        {speaker.bio}
                    </p>
                    <span className="absolute -bottom-2 -right-1 font-serif text-2xl text-primary opacity-30 xs:-bottom-3 xs:-right-2 xs:text-3xl sm:-bottom-4 sm:-right-3 sm:text-4xl md:text-5xl">
                        &quot;
                    </span>
                </div>
            </div>
        </div>
    );
};

const InvitedTalkSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % InvitedTalk.length);
        }, 10000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % InvitedTalk.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? InvitedTalk.length - 1 : prev - 1));
    };

    return (
        <div className="w-full bg-white py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
            <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="mb-3 text-center text-xl font-bold uppercase tracking-tight text-gray-900 xs:text-2xl sm:mb-4 sm:text-3xl md:mb-6 md:text-4xl lg:mb-8 lg:text-5xl">
                    Distinguished Invited Speakers
                    <hr className="mx-auto mt-1 w-4/5 lg:w-3/5 border-2 border-primary shadow-xl sm:mt-2 md:mt-3" />
                </div>

                {/* Description */}
                <p className="mx-auto mb-6 max-w-4xl text-center text-xs font-light leading-relaxed text-gray-700 xs:text-sm sm:mb-8 sm:text-base md:mb-10 md:text-lg lg:mb-12 lg:text-xl">
                    We are honored to introduce our distinguished invited speakers,
                    renowned scholars whose pioneering contributions continue to advance
                    the frontiers of modern physics and interdisciplinary science.
                </p>

                {/* Desktop View - Show all speakers in a grid */}
                <div className="mt-6 hidden gap-6 sm:mt-8 md:mt-12 md:grid md:grid-cols-2 lg:gap-10 xl:gap-16">
                    {InvitedTalk.map((speaker, index) => (
                        <div key={index} className="flex justify-center">
                            <div className="w-full max-w-md">
                                <SpeakerCard speaker={speaker} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View - Slider */}
                <div className="mt-6 md:hidden">
                    <div className="relative">
                        {/* Fixed height container to prevent layout shift */}
                        <div className="min-h-[360px] xs:min-h-[520px] sm:min-h-[500px]">
                            <SpeakerCard speaker={InvitedTalk[currentIndex]} />
                        </div>

                        {/* Navigation Buttons - Fixed position */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-20 -translate-y-1/2 rounded-full bg-primary p-1.5 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary/90 active:scale-95 xs:p-2 sm:p-3"
                            aria-label="Previous speaker"
                        >
                            <ChevronLeft className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-20 -translate-y-1/2 rounded-full bg-primary p-1.5 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary/90 active:scale-95 xs:p-2 sm:p-3"
                            aria-label="Next speaker"
                        >
                            <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2">
                        {InvitedTalk.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 xs:h-2.5 ${
                                    index === currentIndex
                                        ? "w-6 bg-primary xs:w-8 sm:w-10"
                                        : "w-2 bg-gray-300 hover:bg-gray-400 xs:w-2.5"
                                }`}
                                aria-label={`Go to speaker ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvitedTalkSlider;
