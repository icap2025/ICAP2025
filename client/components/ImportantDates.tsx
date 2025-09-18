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
            title: "Abstract Submission Deadline (Extended)",
            description: "The deadline for submitting abstracts has been extended to October 9, 2025.",
            date: "2025-10-09",
            show: true,
        },
        {
            id: "2",
            title: "Notification of Acceptance",
            description: "Notifications of acceptance will be sent by October 20, 2025.",
            date: "2025-10-20",
            show: true,
        },
        {
            id: "3",
            title: "Early Bird Registration Deadline",
            description: "Early bird registration ends on November 5, 2025.",
            date: "2025-11-05",
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
        <div className=" md:w-1/2 w-full  my-10 h-auto md:h-[400px]  bg-white ">
            <div className="flex items-center  mb-4">
                <h2 className="md:text-xl  text-xl font-semibold mr-2">
                    Important Dates
                    <hr className=" shadow-xl border-primary border-t-2 mx-auto" />
                </h2>

            </div>
            <ul className="overflow-y-scroll w-full   h-[320px] scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-red-100">
                {dates
                    .filter((dates) => dates.show)
                    .map((date) => (
                        <li key={date.id} className="flex items-start mb-4">


                            {/* Date Circle */}
                            <div className="flex items-center flex-col justify-center w-14 h-14 border-2 border-primary rounded-full mr-3">
                                <span className="text-md text-center font-semibold">
                                    {(() => {
                                        const d = new Date(date.date);
                                        const day = d.toLocaleDateString("en-US", { day: "2-digit" });

                                        return `${day}`;
                                    })()}
                                </span>

                                <span className="text-xs text-center font-semibold">
                                    {(() => {
                                        const d = new Date(date.date);

                                        const month = d.toLocaleDateString("en-US", { month: "short" });
                                        return `${month}`;
                                    })()}
                                </span>

                            </div>

                            <div className="group cursor-pointer  hover:bg-slate-200 ml-5">
                                <p className="md:text-md   group-hover:bg-slate-200 text-gray-600">
                                    {date.title}
                                </p>
                                <p className="md:text-sm w-full  flex items-center gap-2 text-md font-semibold group-hover:bg-slate-200 text-primary">
                                    <SlCalender  /> {new Date(date.date).toLocaleDateString("en-US", {
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
                        className="max-w-sm px-5 w-full h-full animate-pulse"
                    >
                        <div className="h-1  my-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-1 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-1 my-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-1 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                        <div className="h-1 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[180px] mb-2.5"></div>
                        <div className="h-1 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <div className="h-1 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[140px] mb-2.5"></div>
                        <div className="h-1 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[200px] mb-2.5"></div>
                        <div className="h-1 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default ImportantDates;