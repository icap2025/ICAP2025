"use client";
import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";

// Define the types for the date data
interface ImportantDates {
    id: string;
    title: string;
    description: string;
    date: string;
    show: unknown;
}

const ImportantDates: React.FC = () => {
    const [dates, setDates] = useState<ImportantDates[]>([
        {
            id: "1",
            title: "Extended abstract submission deadline (final)",
            description: "The deadline for submitting abstracts has been extended to October 16, 2025.",
            date: "2025-10-16",
            show: true,
        },
        {
            id: "2",
            title: "Updated Notification of Acceptance",
            description: "Notifications of acceptance will be sent by October 30, 2025.",
            date: "2025-10-30",
            show: true,
        },
        {
            id: "3",
            title: "Updated Early Bird Registration",
            description: "Early bird registration ends on November 15, 2025.",
            date: "2025-11-20",
            show: true,
        },
        {
            id: "4",
            title: "Regular Registration Deadline",
            description: "Regular registration ends on December 10, 2025.",
            date: "2025-12-10",
            show: true,
        }
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the important dates from the backend API
    useEffect(() => {
        const fetchImportantDates = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/important-dates`
                );
                if (response.ok) {
                    const data = await response.json();
                    setDates(data);
                } else {
                    console.error("Failed to fetch important dates");
                    setError("Error fetching important dates");
                }
            } finally {
                // setIsLoading(false);
            }
        };

        // fetchImportantDates();
    }, []);

    return (
        <div className="my-6 h-auto w-full bg-white sm:my-8 md:my-10 md:h-[400px] md:w-1/2">
            <div className="mb-3 flex items-center sm:mb-4">
                <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
                    Important Dates
                    <hr className="mx-auto border-t-2 border-primary shadow-xl" />
                </h2>
            </div>
            <ul className="scrollbar-thin scrollbar-track-red-100 scrollbar-thumb-green-500 h-[280px] w-full overflow-y-scroll sm:h-[300px] md:h-[320px]">
                {dates
                    .filter((dates) => dates.show)
                    .map((date) => (
                        <li key={date.id} className="mb-3 flex items-start transition-all duration-300 sm:mb-4">
                            {/* Date Circle */}
                            <div className="mr-2 flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-full border-2 border-primary transition-all duration-300 hover:scale-110 hover:border-[3px] hover:shadow-lg sm:mr-3 sm:h-14 sm:w-14 md:h-16 md:w-16">
                                <span className="text-center text-sm font-semibold sm:text-base md:text-lg">
                                    {(() => {
                                        const d = new Date(date.date);
                                        const day = d.toLocaleDateString("en-US", { day: "2-digit" });
                                        return `${day}`;
                                    })()}
                                </span>

                                <span className="text-center text-[10px] font-semibold sm:text-xs">
                                    {(() => {
                                        const d = new Date(date.date);
                                        const month = d.toLocaleDateString("en-US", { month: "short" });
                                        return `${month}`;
                                    })()}
                                </span>
                            </div>

                            <div className="group ml-2 cursor-pointer rounded-md px-2 py-1 transition-all duration-300 hover:bg-slate-100 hover:shadow-md sm:ml-3 sm:px-3 sm:py-2 md:ml-5">
                                <p className="text-sm text-gray-700 transition-colors duration-300 group-hover:text-gray-900 sm:text-base md:text-lg">
                                    {date.title}
                                </p>
                                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-primary transition-all duration-300 group-hover:gap-2 sm:gap-2 sm:text-sm md:text-base">
                                    <SlCalender className="h-3 w-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-4 sm:w-4" />
                                    {new Date(date.date).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </li>
                    ))}
                {!isLoading && (
                    <div
                        role="status"
                        className="h-full w-full max-w-sm animate-pulse px-3 sm:px-5"
                    >
                        <div className="my-4 h-1 w-36 rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:w-48 md:my-8"></div>
                        <div className="my-4 h-1 max-w-[280px] rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:max-w-[320px] md:my-8 md:max-w-[360px]"></div>
                        <div className="my-4 h-1 rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 md:my-8"></div>
                        <div className="my-4 h-1 max-w-[250px] rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:max-w-[290px] md:my-8 md:max-w-[330px]"></div>
                        <div className="my-4 h-1 max-w-[140px] rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:max-w-[160px] md:my-8 md:max-w-[180px]"></div>
                        <div className="my-4 h-1 max-w-[280px] rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:max-w-[320px] md:my-8 md:max-w-[360px]"></div>
                        <div className="my-4 h-1 max-w-[110px] rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:max-w-[125px] md:my-8 md:max-w-[140px]"></div>
                        <div className="my-4 h-1 max-w-[160px] rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:max-w-[180px] md:my-8 md:max-w-[200px]"></div>
                        <div className="my-4 h-1 max-w-[280px] rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:max-w-[320px] md:my-8 md:max-w-[360px]"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default ImportantDates;