"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";

interface Sponsor {
    name: string;
    logo: string;
    website?: string;
    size?: "xl" | "lg" | "md" | "sm" | "xs";
}

// All sponsors in priority order
const allSponsors: Sponsor[] = [
    {
        name: "SUST",
        logo: "/sponsors/SUST.png",
        website: "https://www.sust.edu",
        size: "xl",
    },
    {
        name: "UGC",
        logo: "/sponsors/UGC.png",
        website: "https://www.ugc.gov.bd",
        size: "xl",
    },
    {
        name: "Invent Technologies",
        logo: "/sponsors/invent.jpg",
        website: "https://www.invent.com.bd/",
        size: "lg",
    },
    {
        name: "BSCL",
        logo: "/sponsors/BSCL.png",
        website: "https://bscl.gov.bd/",
        size: "lg",
    },
    {
        name: "WZPDCL",
        logo: "/sponsors/wzpdcl.png",
        website: "https://wzpdcl.org.bd/",
        size: "lg",
    },
    {
        name: "Jalalabad Gas",
        logo: "/sponsors/Jalalabad Gas.png",
        website: "https://jalalabadgas.portal.gov.bd/",
        size: "lg",
    },
    {
        name: "US-Bangla Airlines",
        logo: "/sponsors/USBangla airlines.png",
        website: "https://usbair.com/",
        size: "lg",
    },
    {
        name: "Karnaphuli Group",
        logo: "/sponsors/Karnaphuli group.png",
        website: "https://www.karnaphuli.com/",
        size: "lg",
    },
    {
        name: "Metropolitan University",
        logo: "/sponsors/mu.png",
        website: "https://www.metrouni.edu.bd/",
        size: "md",
    },
    {
        name: "Sylhet City Corporation",
        logo: "/sponsors/sylhet city corporation.png",
        website: "https://www.scc.gov.bd/",
        size: "md",
    },
    {
        name: "SIU",
        logo: "/sponsors/siu.png",
        website: "https://www.siu.edu.bd/",
        size: "md",
    },
    {
        name: "Speed Tech",
        logo: "/sponsors/speed tech.jpg",
        website: "https://speedtechsylhet.com/",
        size: "md",
    },
    {
        name: "Leading University",
        logo: "/sponsors/Leading University.png",
        website: "https://lus.ac.bd/",
        size: "md",
    },
    {
        name: "SIMCO ELectronics",
        logo: "/sponsors/SIMCO ELectronics.png",
        website: "https://simco.com.bd/",
        size: "md",
    },
    {
        name: "CDIP",
        logo: "/sponsors/cdip.png",
        website: "https://www.democdip.cdipits.com/en",
        size: "md",
    },
    {
        name: "SUST Physics Alumni Association",
        logo: "/sponsors/spaa.jpg",
        website: "https://www.facebook.com/groups/sust.physics.alumni/",
        size: "md",
    },
    {
        name: "NEUB",
        logo: "/sponsors/neub.jpeg",
        website: "https://www.neub.edu.bd/",
        size: "sm",
    },
    {
        name: "PRAN FOOD",
        logo: "/sponsors/PRAN FOOD.gif",
        website: "https://www.pranfoods.net/",
        size: "sm",
    },
    {
        name: "Cinnamon Restaurant",
        logo: "/sponsors/Cinnamon Restaurant.jpg",
        website: "https://www.facebook.com/TheCinnamonRestaurant/",
        size: "sm",
    }
];

// Split sponsors into rows based on their order in allSponsors
const sponsorRows = [
    allSponsors.slice(0, 2),   // Row 1: SUST, UGC (xl)
    allSponsors.slice(2, 5),   // Row 2: Invent, BSCL, WZPDCL (lg)
    allSponsors.slice(5, 8),   // Row 3: Jalalabad Gas, US-Bangla, Karnaphuli (md)
    allSponsors.slice(8, 12),  // Row 4: Metropolitan, Sylhet City, SIU, Speed Tech
    allSponsors.slice(12, 16), // Row 5: Leading, SIMCO, CDIP, SPAA
    allSponsors.slice(16),     // Row 6: NEUB, PRAN FOOD, Cinnamon
];

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => {
    const size = sponsor.size || "md";

    const sizeClasses = {
        xl: "h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52",
        lg: "h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-44 lg:w-44",
        md: "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-36 lg:w-36",
        sm: "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28",
        xs: "h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24",
    };

    const textSizeClasses = {
        xl: "text-sm sm:text-base md:text-lg font-semibold",
        lg: "text-xs sm:text-sm md:text-base font-semibold",
        md: "text-xs sm:text-sm font-medium",
        sm: "text-[10px] sm:text-xs font-medium",
        xs: "text-[10px] sm:text-xs font-normal",
    };

    const content = (
        <div className="group flex flex-col items-center gap-2 transition-all duration-300 sm:gap-3">
            <div
                className={`${sizeClasses[size]} relative overflow-hidden rounded-xl bg-white p-3 shadow-md transition-all duration-300 sm:p-4`}
            >
                <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain p-2 sm:p-3"
                />
            </div>
            <p
                className={`${textSizeClasses[size]} max-w-[120px] text-center leading-tight text-gray-700 sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px]`}
            >
                {sponsor.name}
            </p>
        </div>
    );

    if (sponsor.website) {
        return (
            <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
            >
                {content}
            </a>
        );
    }

    return content;
};

export default function Sponsors() {
    return (
        <section className="w-full py-10 sm:py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <BlurFade delay={0.1} inView>
                    <div className="mb-10 text-center sm:mb-12 md:mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                            Our <span className="text-primary">Sponsors</span> &{" "}
                            <span className="text-primary">Partners</span>
                        </h2>
                        <p className="mt-3 text-sm text-gray-600 sm:mt-4 sm:text-base md:text-lg">
                            We are grateful to our sponsors and partners for their generous
                            support
                        </p>
                    </div>
                </BlurFade>

                {/* Sponsors in Multiple Rows */}
                <div className="space-y-8 sm:space-y-10 md:space-y-12">
                    {sponsorRows.map((row, rowIndex) => (
                        <BlurFade key={rowIndex} delay={0.2 + rowIndex * 0.1} inView>
                            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                                {row.map((sponsor, index) => (
                                    <SponsorCard key={index} sponsor={sponsor} />
                                ))}
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
