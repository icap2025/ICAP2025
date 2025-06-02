"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Button } from "@/components/ui/button"

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
            title: "Abstract Submission CMT Link Added",
            description: "https://cmt3.research.microsoft.com/ICAP2025",
            createdAt: "2025-06-02T00:00:00Z",
            show: true,
        },
        {
            id: "2",
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
        <div className="md:w-1/2 w-full md:px-auto my-10 h-auto md:h-[400px] md:p-4 bg-white ">
            <div className="flex items-center  mb-4">
                <h2 className=" w-full md:text-xl text-xl font-semibold mr-2">
                   <div className="flex justify-between items-center"><p>Notices
                    <hr className=" shadow-xl border-primary border-t-2 mx-auto" /> </p><span className="bg-primary rounded-full text-xs px-2 py-1 text-white animate-bounce mx-4">New</span></div> 
                
                </h2>

            </div>
            <ul className="overflow-y-scroll w-full h-[320px]  scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-red-100">

                {
                    Notices.length > 0 ? (
                        Notices
                            .filter((notice) => notice.show)
                            .map((notice) => (
                                <li key={notice.id} className="flex items-start mb-4">


                                    <div className="group  ml-5">
                                        <p className="md:text-md font-semibold    ">
                                            {notice.title}
                                        </p>
                                        {notice.description.includes("http") ? (
                                            <a href={notice.description} className="md:text-md  underline cursor-pointer  text-blue-600">
                                            {notice.description}
                                        </a> ): (
                                        <p className="md:text-md    text-gray-600">
                                            {notice.description}
                                        </p>
                                        )}

                                        <p className="md:text-xs w-full flex gap-2 items-center  text-md font-semibold  text-primary">
                                            <AiOutlineFieldTime className="w-5 h-5 " />
                                            {new Date(notice.createdAt).toLocaleString("en-US", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                </li>
                            ))) : (
                        <li className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No notices available at the moment.</p>
                        </li>
                    )


                }
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

export default Notice;