import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
    const navigate = useNavigate()
    return (
        <div className="mt-10 border-2 flex items-center justify-center w-[450px] p-4 rounded-md m-auto bg-green-100">
            <div className="text-center">
                <div className="text-4xl flex justify-center text-green-500">
                    <FaCheckCircle />
                </div>
                <h1 className="text-lg font-semibold mb-4">Thank you for submitting your response!!</h1>
                <button
                    onClick={() => navigate("/")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ThankYouPage;
