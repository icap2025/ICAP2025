'use client'

import { motion } from "framer-motion"
import { TfiHeadphoneAlt } from "react-icons/tfi";

const contacts = [
  { title: "Phone (Convener)", value: "+8801718-440 675" },
  { title: "Phone (Treasurer)", value: "+8801712-979 269" },
  { title: "Phone (Conference Secretary)", value: "+8801717266867" },
  { title: "Email", value: "icap@sust.edu" },
]

export default function ContactPage() {
  return (
    <div className="relative pt-24  w-full">

      {/* Top Orange Gradient Wave Section */}
      <div className=" relative bg-gradient-to-r from-primary to-green-400 text-white pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-20 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold">Contact</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Stay connected with us. We&apos;re here to help you with any questions or participation details.
          </p>
        </div>

        

        {/* Wave Shape */}
    <motion.svg
      className="absolute bottom-0 left-0 w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 120"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.path
        fill="#fff"
        fillOpacity="1"
        d="M0,96L80,80C160,64,320,32,480,26.7C640,21,800,43,960,58.7C1120,75,1280,85,1360,90.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </motion.svg>
      </div>

      {/* Contact Info (No Cards) */}
      <div className=" z-20 flex items-center justify-between -mt-12 px-6 md:px-0 max-w-5xl mx-auto">
        <div className="py-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Get in touch</h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            {contacts.map((item, index) => (
              <li key={index}>
                <span className="font-medium">{item.title}:</span> {item.value}
              </li>
            ))}
          </ul>
        </div>

        <TfiHeadphoneAlt className="w-20 h-20 animate-bounce hidden md:block"/>
      </div>
    </div>
  )
}
