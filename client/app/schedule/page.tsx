import React from 'react'

function Schedule() {
    return (
        <div className="flex min-h-screen flex-col bg-white px-4 md:px-24">
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                <main className="flex-grow">
                    {/* Header Section */}
                    <div className="mb-6 text-center sm:mb-8 lg:mb-12">
                        <div className="inline-block">
                            <h1 className="mb-2 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                                Schedule
                            </h1>
                            <div className="h-1 rounded-full bg-[#0B8175]"></div>
                        </div>
                        <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-gray-600 sm:text-base">
                            Conference program and schedule details
                        </p>
                    </div>

                    {/* Coming Soon Card */}
                    <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
                        <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="bg-[#0B8175] p-3 sm:p-4">
                                <h2 className="flex items-center text-lg font-bold text-white sm:text-xl md:text-2xl">
                                    <div className="mr-3 h-7 w-2 rounded-full bg-white"></div>
                                    Schedule Coming Soon
                                </h2>
                            </div>

                            <div className="p-8 sm:p-12 md:p-16 text-center">
                                <div className="mx-auto mb-6 w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#0B8175]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                                    We&apos;re working hard to finalize the conference schedule. 
                                    The detailed program with session times, speakers, and venues 
                                    will be published very soon.
                                </p>
                                
                                <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:p-6">
                                    <p className="text-sm sm:text-base font-medium text-green-800">
                                        Stay tuned for updates!
                                    </p>
                                    <p className="text-xs sm:text-sm text-green-600 mt-2">
                                        Check back regularly for the latest schedule information
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Spacing */}
                    <div className="pb-12 sm:pb-20 md:pb-28"></div>
                </main>
            </div>
        </div>
    )
}

export default Schedule