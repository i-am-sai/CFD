import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export const PreviewForm = () => {
    const { formId } = useParams();
    const [data, setData] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState([]);
    const [response, setResponse] = useState([]);
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [dropCategory, setDropCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://custom-form-editor-backend.onrender.com/forms/${formId}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
    }, [formId]);

    useEffect(() => {
        const initialItems = data?.questions?.map((question) => {
            if (question.type === 'Categorize') {
                return {
                    question,
                    items: question.data.items.map((item, index) => ({
                        id: `item-${index}`,
                        content: item.name,
                        category: null,
                    })),
                };
            } else {
                return null;
            }
        });
        setItems(initialItems?.filter(Boolean) || []);
    }, [data]);

    useEffect(() => {
        const initialCategories = data?.questions?.map((question) => {
            if (question.type === 'Categorize') {
                return question.data.categories;
            } else {
                return null;
            }
        });
        setCategories(initialCategories?.filter(Boolean) || []);
    }, [data]);

    const handleSubmit = () => {
        if (!name || !email) {
            alert('Enter your name and email id.');
            return;
        }
        let obj = { name, email, formId, response };
        fetch(`https://custom-form-editor-backend.onrender.com/response/add`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(obj),
        })
            .then((res) => res.json())
            .then((res) => {
                alert('Response submitted successfully');
                navigate('/thankyou');
            })
            .catch((err) => console.log(err));
    };

    const replaceWordsWithUnderscores = (paragraph, options) => {
        return paragraph.split(' ').map((word, index) => {
            const isUnderlined = options?.includes(word);
            return isUnderlined ? (
                <span key={index}>
                    {Array.from({ length: word.length }, (_, i) => (
                        <span key={i}>&#95;</span>
                    ))}
                </span>
            ) : (
                <span key={index}>{word} </span>
            );
        });
    };

    const handleAnswerSave = (index, data) => {
        const updatedResponse = [...response];
        updatedResponse[index] = { ...updatedResponse[index], ...data };
        setResponse(updatedResponse);
        alert('Answer Saved Successfully');
    };

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const sourceQuestionIndex = parseInt(
            result.source.droppableId.split('-')[1]
        );
        const destinationCategory = result.destination.droppableId.split('-')[1];

        if (
            Number.isNaN(sourceQuestionIndex) ||
            !items[sourceQuestionIndex]?.items ||
            !destinationCategory
        ) {
            return;
        }

        const updatedItems = [...items];
        const draggedItem = updatedItems[sourceQuestionIndex].items[sourceIndex];

        const questionCategories = categories[sourceQuestionIndex];
        if (!questionCategories) {
            return;
        }

        const categoryIndex = questionCategories.indexOf(destinationCategory);

        if (categoryIndex === undefined || categoryIndex === -1) {
            return;
        }

        draggedItem.category = questionCategories[categoryIndex];

        setDropCategory((prevDropCategory) => [...prevDropCategory, draggedItem]);

        updatedItems[sourceQuestionIndex].items.splice(sourceIndex, 1);
        setItems(updatedItems);
    };

    return (
        <div className='border-2 p-10 w-[800px] m-auto mb-20 text-left mt-10 bg-gray-100'>
            {Object.keys(data).length !== 0 && data.header ? (
                <div>
                    <div className='border-2 p-5 mb-10'>
                        <h1 className='text-2xl font-semibold mb-4'>
                            {data.header.heading}
                        </h1>
                        <p className='text-gray-600'>{data.header.description}</p>
                        <h1 className='text-sm italic mt-2'>
                            Note: (Click the save button after filling the answer of each
                            Question)
                        </h1>
                    </div>
                    <div className='border-2 p-4 rounded mb-4'>
                        <h1 className='text-xl font-bold mb-4 underline'>
                            Enter your Name and Email:
                        </h1>
                        <div className='pb-5 flex justify-between w-[400px]'>
                            <div>
                                <h1 className='text-xl font-bold mb-1'>Name:</h1>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className='flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                            <div>
                                <h1 className='text-xl font-bold mb-1'>Email:</h1>
                                <input
                                    type='email'
                                    placeholder='Enter your Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className='flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                        </div>
                    </div>
                    {/* Rest of the form code... */}
                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className='bg-[#673ab7]  hover:bg-[#673ab7] text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#673ab7]'>
                        Submit Form
                    </button>
                </div>
            ) : (
                <h1 className='text-2xl font-semibold mb-4'>
                    Form is Loading. Please wait.......
                </h1>
            )}
        </div>
    );
};
