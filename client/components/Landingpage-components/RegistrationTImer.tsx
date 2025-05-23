"use client";
import { useState, useEffect } from "react";
import { FaRegSadTear } from "react-icons/fa";

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
        <div className="w-full my-36">
            <div className="text-center">
                <h1 className="text-xl text-center">Join The Conference - Registration Ends In</h1>
                <div>
                    <hr className="w-96 shadow-xl border-primary border-t-2 mx-auto" />
                </div>
            </div>
            <div>
                {!isRegistrationEnded ? (
                    <div className="flex items-center justify-center mt-14">
                        <div className="timer-box ">
                            <div className="w-20 h-20 bg-gray-200 mx-5 text-3xl font-bold flex justify-center items-center text-center">{timeLeft.days}</div>
                            <p className=" mx-5  text-center w-20">Days</p>
                        </div>
                        <div className="timer-box">
                            <div className="w-20 h-20 bg-gray-200 mx-5 text-3xl font-bold flex justify-center items-center text-center">{timeLeft.hours}</div>
                            <p className=" mx-5  text-center w-20">Hours</p>
                        </div>
                        <div className="timer-box">
                            <div className="w-20 h-20 bg-gray-200 mx-5 text-3xl font-bold flex justify-center items-center text-center">{timeLeft.minutes}</div>
                            <p className="mx-5  text-center w-20">Minutes</p>
                        </div>
                        <div className="timer-box">
                            <div className="w-20 h-20 bg-gray-200 text-primary mx-5 text-3xl font-bold flex justify-center items-center text-center">{timeLeft.seconds}</div>
                            <p className="mx-5  text-center w-20">Seconds</p>
                        </div>
                    </div>


                ) : (
                    <h2 className="text-red-500 font-bold text-2xl flex flex-col justify-center items-center gap-5 mt-4"><FaRegSadTear className="h-20 w-20" />Registration has ended.</h2>
                )}

            </div>


        </div>
    )
}