import React from "react";
import Typed from "react-typed";

export const Home = () => {
    return (
        <div className='bg-blue-500 w-full h-screen py-[50px]'>
            <div className='max-w-[1240px] my-[100px] font-bold mx-auto text-center'>
                <div className='text-xl md:text-3xl mb-4 '>
                    Create with us
                </div>
                <h2 className='text-white text-[40px] md:text-[80px] '>
                    Build with us
                </h2>
                <div className='text-[20px] md:text-[40px]  text-white'>
                    Let's Revolutionaize
                    <Typed
                        className='pl-2'
                        strings={['Form Customaization', 'Form Building', 'Form Sharing']}
                        typeSpeed={100}
                        loop={true}
                        backSpeed={50}
                    />

                </div>
            </div>
        </div>
    )
};



