"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";

interface Notice {
    show: unknown;
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

const Notice: React.FC = () => {
    const [Notices, setNotices] = useState<Notice[]>([
        {
            id: "1",
            title: "Poster Guidelines Added",
            description: "Poster guidelines have been added to the Author Guidelines page.",
            createdAt: "2025-12-02T00:00:00Z",
            show: true,
        },
        {
            id: "2",
            title: "Abstract Submission Deadline",
            description: "The deadline for submitting abstracts is September 20, 2025.",
            createdAt: "2025-04-31T00:00:00Z",
            show: true,
        },
        {
            id: "3",
            title: "Abstract Submission CMT Link Added",
            description: "https://cmt3.research.microsoft.com/ICAP2025",
            createdAt: "2025-06-02T00:00:00Z",
            show: true,
        },
        {
            id: "4",
            title: "Abstract Submission Deadline Extended",
            description: "The deadline for submitting abstracts has been extended to October 9, 2025.",
            createdAt: "2025-09-19T00:00:00Z",
            show: true,
        },
        {
            id: "5",
            title: "Extended Early Bird Registration Deadline",
            description: "The deadline for Early Bird Registration is November 30, 2025.",
            createdAt: "2025-11-20T00:00:00Z",
            show: true,
        },
        {
            id: "6",
            title: "Abstract Submission Deadline",
            description: "The deadline for submitting abstracts is September 20, 2025.",
            createdAt: "2025-04-31T00:00:00Z",
            show: true,
        },
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the important Notices from the backend API
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/notices`
                );
                if (response.ok) {
                    const data = await response.json();
                    setNotices(data);
                } else {
                    console.error("Failed to fetch important Notices");
                    setError("Error fetching important Notices");
                }
            } finally {
                setIsLoading(false);
            }
        };

        // fetchNotices();
    }, []);

    return (
        <div className="my-6 h-auto w-full bg-white sm:my-8 md:my-10 md:h-[400px] md:w-1/2 md:p-4">
            <div className="mb-3 flex items-center sm:mb-4">
                <h2 className="mr-2 w-full text-lg font-semibold sm:text-xl md:text-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            Notices
                            <hr className="mx-auto border-t-2 border-primary shadow-xl" />
                        </div>
                        <span className="mx-1 rounded-full bg-primary px-3 text-[10px] text-white transition-all duration-300 hover:scale-110 hover:shadow-lg sm:mx-2 sm:px-3 sm:py-1 sm:text-[11px] md:mx-3 md:px-4 md:py-1 md:text-xs lg:mx-4 lg:px-5 lg:py-1 lg:text-sm">
                            New
                        </span>
                    </div>
                </h2>
            </div>
            <ul className="scrollbar-thin scrollbar-track-red-100 scrollbar-thumb-green-500 h-[280px] w-full overflow-y-scroll sm:h-[300px] md:h-[320px]">
                {Notices.length > 0 ? (
                    Notices.slice()
                        .reverse()
                        .filter((notice) => notice.show)
                        .map((notice) => (
                            <li key={notice.id} className="mb-3 flex items-start transition-all duration-300 sm:mb-4">
                                <div className="group ml-2 w-full rounded-md px-2 py-2 transition-all duration-300 hover:bg-slate-50 hover:shadow-md sm:ml-3 sm:px-3 sm:py-3 md:ml-5">
                                    <p className="text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary sm:text-base md:text-lg">
                                        {notice.title}
                                    </p>
                                    {notice.description.includes("http") ? (
                                        <a
                                            href={notice.description}
                                            className="mt-1 block cursor-pointer break-all text-xs text-blue-600 underline transition-all duration-300 hover:text-blue-800 hover:underline-offset-2 sm:text-sm md:text-base"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {notice.description}
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-xs text-gray-600 transition-colors duration-300 group-hover:text-gray-800 sm:text-sm md:text-base">
                                            {notice.description}
                                        </p>
                                    )}

                                    <p className="mt-2 flex w-full items-center gap-1.5 text-xs font-semibold text-primary transition-all duration-300 group-hover:gap-2 sm:gap-2 sm:text-sm">
                                        <AiOutlineFieldTime className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5" />
                                        <span className="text-[10px] sm:text-xs">
                                            {new Date(notice.createdAt).toLocaleString("en-US", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        ))
                ) : (
                    <li className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-500 sm:text-base">No notices available at the moment.</p>
                    </li>
                )}
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

export default Notice;