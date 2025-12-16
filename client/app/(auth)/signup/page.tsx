import React from "react";
// import { SignupForm } from "./SignUpForm";

const SignUpPage = () => {
  return (
    <div className="bg-gradient-to-b from-white via-[#F6FFFC] to-[#E9FDF7] flex-grow flex flex-col justify-center items-center min-h-screen p-4">
      {/* <SignupForm /> */}
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration Closed</h1>
            <div className="h-1 w-24 bg-red-600 mx-auto rounded-full mb-4"></div>
          </div>
          <p className="text-lg text-gray-700 mb-6">
            We&apos;re sorry, but registration for ICAP 2025 has been closed.
          </p>
          <p className="text-base text-gray-600 mb-8">
            Thank you for your interest in the International Conference on Advances in Physics. 
            Registration is no longer available for this event.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              For any inquiries, please contact us at: <strong>icap2025sust@gmail.com</strong>
            </p>
          </div>
          <a
            href="/"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
