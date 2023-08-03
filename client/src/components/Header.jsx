import React, { useState } from 'react';

const Header = ({ setHeader }) => {
    const [input, setInput] = useState({
        imageURL: '',
        heading: '',
        description: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setInput((prevInput) => ({
                ...prevInput,
                imageURL: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const saveHeader = () => {
        setHeader({ heading: input.heading, description: input.description });
        alert('Header saved Successfully');
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="mb-4">
                {/* Circular Image Input */}
                <label htmlFor="imageInput" className="cursor-pointer flex flex-col items-center">
                    <div className="w-16 h-16  overflow-hidden rounded-full border border-gray-300 flex flex-col items-center">
                        <img
                            src={input.imageURL || '/logo.png'}
                            alt="Brand Logo"
                            className="w-4 h-4 mr-6 object-cover"
                        />
                        <h2 className='text-3xl ml-6  font-bold  text-center'>Form Menu</h2>
                    </div>
                    <input
                        type="file"
                        id="imageInput"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
            </div>


            {/* Heading and Description Input */}
            <div>
                <label className="block mb-2 text-gray-800 font-bold text-lg">Title and Description :</label>

                <input
                    type="text"
                    placeholder="Enter Heading (Title)"
                    name="heading"
                    value={input.heading}
                    onChange={handleChange}
                    className="block w-full rounded-md border-slate-600 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                />

                <textarea
                    placeholder="Enter Description (Summary)"
                    name="description"
                    value={input.description}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                />
            </div>

            {/* Visualization */}
            {input.imageURL && (
                <div className="bg-white border p-4 rounded-lg mt-4">
                    <div className="w-10 h-10 mr-4 overflow-hidden rounded-full border border-gray-300">
                        <img
                            src={input.imageURL}
                            alt="Brand Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        {input.heading && (
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{input.heading}</h1>
                        )}
                        {input.description && <p className="text-gray-600">{input.description}</p>}
                    </div>
                </div>
            )}

            {/* Preview Box */}
            <div className="bg-white border p-4 rounded-lg mt-4">
                {input.imageURL && (
                    <div className="w-10 h-10 mr-4 overflow-hidden rounded-full border border-gray-300">
                        <img
                            src={input.imageURL}
                            alt="Brand Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div>
                    {input.heading && (
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{input.heading}</h1>
                    )}
                    {input.description && <p className="text-gray-600">{input.description}</p>}
                </div>
            </div>

            <button
                onClick={saveHeader}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block mx-auto"
            >
                Save Header
            </button>
        </div>
    );
};

export default Header;
