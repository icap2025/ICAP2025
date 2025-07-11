"use client";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  
  return (
    <div className='flex h-screen items-center justify-center flex-col'>
      <DotLottieReact
      src="https://lottie.host/2fc78cfd-ec32-48ad-ac33-ed79564ecfbf/vG1utjxroQ.lottie"
      loop
      autoplay
      // className='border-2 border-primary rounded-lg shadow-lg'
      style={{ width: 800, height: 400, padding: '0px',  }}
    />
    <h1 className='text-2xl absolute mt-20 pt-10 text-primary font-bold '> <span className='text-white bg-primary px-2 '>ICAP</span> 2025</h1>
    </div>
    
  );
};
