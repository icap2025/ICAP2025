import React from 'react'

function Schedule() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-[#F6FFFC] to-[#E9FDF7] px-4 md:px-24">
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                <main className="flex-grow">
                    {/* Header Section */}
                    <div className="mb-6 text-center sm:mb-8 lg:mb-12">
                        <div className="inline-block">
                            <h1 className="mb-2 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                               Conference Schedule
                            </h1>
                            
                            <div className="h-1 rounded-full bg-[#0B8175]"></div>
                        </div>

                        <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-gray-600 sm:text-base">
                            Conference program and schedule details
                        </p>


                          
                                    <a 
                                        href="/schedule.pdf" 
                                        download 
                                        className="inline-flex items-center gap-2 mt-4 rounded-lg bg-[#0B8175] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#096B61] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0B8175] focus:ring-offset-2 sm:text-base"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Download PDF
                                    </a>
                    </div>

                    {/* PDF Viewer Card */}
                    <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-16">
            

                            <div className=" sm:p-6">
                                <div className="w-full" style={{ height: '100vh' }}>
                                    <iframe
                                        src="/schedule.pdf"
                                        className="w-full h-full rounded-lg border border-gray-200"
                                        title="Conference Schedule"
                                    />
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