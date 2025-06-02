"use client";
import { useState, useEffect } from "react";
import { FaRegSadTear } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Button } from "@/components/ui/button"
import { CiLocationOn } from "react-icons/ci";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export default function RegistrationTimer(): JSX.Element {

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isRegistrationEnded, setIsRegistrationEnded] = useState(false);

    useEffect(() => {
        const targetDate = new Date("2025-12-17T00:00:00");
        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsRegistrationEnded(true);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, []);


    return (
        <div className="w-full my-20 md:my-36">
            <div className="text-center px-4">
                <h1 className="text-lg sm:text-xl text-center">Join The Conference - Registration Ends In</h1>
                <div>
                    <hr className="w-full max-w-xs sm:max-w-md md:max-w-lg shadow-xl border-primary border-t-2 mx-auto" />
                </div>
            </div>
            <div>
                {!isRegistrationEnded ? (
                    <div className="flex items-center justify-center mt-14">
                        <div className="timer-box">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 mx-2 sm:mx-5 text-2xl sm:text-3xl font-bold flex justify-center items-center text-center">
                                {timeLeft.days}
                            </div>
                            <p className="mx-2 sm:mx-5 text-center w-16 sm:w-20">Days</p>
                        </div>
                        <div className="timer-box">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 mx-2 sm:mx-5 text-2xl sm:text-3xl font-bold flex justify-center items-center text-center">
                                {timeLeft.hours}
                            </div>
                            <p className="mx-2 sm:mx-5 text-center w-16 sm:w-20">Hours</p>
                        </div>
                        <div className="timer-box">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 mx-2 sm:mx-5 text-2xl sm:text-3xl font-bold flex justify-center items-center text-center">
                                {timeLeft.minutes}
                            </div>
                            <p className="mx-2 sm:mx-5 text-center w-16 sm:w-20">Minutes</p>
                        </div>
                        <div className="timer-box">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 text-primary mx-2 sm:mx-5 text-2xl sm:text-3xl font-bold flex justify-center items-center text-center">
                                {timeLeft.seconds}
                            </div>
                            <p className="mx-2 sm:mx-5 text-center w-16 sm:w-20">Seconds</p>
                        </div>
                    </div>


                ) : (
                    <h2 className="text-red-500 font-bold text-2xl flex flex-col justify-center items-center gap-5 mt-4"><FaRegSadTear className="h-20 w-20" />Registration has ended.</h2>
                )}

                <div className="flex mx-auto items-center md:gap-10 justify-center my-10">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center text-center">
                        <p className="flex items-center gap-2">
                            <SlCalender className="w-7 h-7" />
                            <span>17-18 December, 2025</span>
                        </p>
                        <p className="flex items-center md:gap-2">
                            <CiLocationOn className=" w-12 h-12 md:w-7 md:h-7 " />
                            <span className="text-sm md:text-base">
                                Shahjalal University of Science and Technology,
                                <br className="hidden md:block" />
                                Sylhet-3114, Bangladesh
                            </span>
                        </p>
                    </div>
                </div>


                <h1 className="text-primary font-semibold mt-20 text-center"> <sup>**</sup>Registration Starts Soon!</h1>

                <div className="flex  flex-col md:flex-row  items-center gap-2 md:gap-10 justify-center mt-10">
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white"
                        asChild
                    >
                        <a
                            href="https://cmt3.research.microsoft.com/docs/help/author/author-submission-form.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Submit Abstract Online
                        </a>
                    </Button>
                    <Button variant="outline"><a href="/submission">Submission Details</a></Button>
                </div>





            </div>


        </div>
    )
}