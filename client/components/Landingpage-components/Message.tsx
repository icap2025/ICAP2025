import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Message() {




    return(
        <div className="w-full flex items-center justify-center mt-20">
            {/* Avatar */}
            <div className="avatar w-[30%] relative aspect-square">
                <Image src="/avatar.png" alt="Avatar" fill className="w-full h-full object-cover rounded-full" sizes="30vw" priority />
            </div>
            {/* Message */}
            <div className="message w-[70%]">
                <p className="text-2xl font-inter text-gray-900">Welcome to the International Conference on Advances in Physics (ICAP 2025). We are excited to have you join us for this event, where we will explore the latest advancements in physics and foster collaboration among researchers from around the world.</p>
            </div>
        </div>
    )
}