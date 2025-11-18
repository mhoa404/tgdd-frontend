import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
const ChatBotIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);
    /*-----------------------------------
            
    -----------------------------------*/
    const handleToggle = () => setIsOpen(!isOpen);
    /*-----------------------------------

    -----------------------------------*/
    const handleSendMessage = async () => {
        if (!message.trim())
            return;
        /*-----------------------------------
            
        -----------------------------------*/
        const newResponses = [...responses, { text: message, isUser: true }];
        setResponses(newResponses);
        /*-----------------------------------
 
        -----------------------------------*/
        try {
            const response = await axios.post('https://tgdd-be.mhoa.id.vn/api/chatbot/chat', { prompt: message });
            setResponses([...newResponses, { text: response.data.text, isUser: false }]);
            setMessage('');
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            handleSendMessage();
    };
    const MessageContent = ({ text }) => {
        if (text.includes('/assets/')) {
            return (_jsxs(_Fragment, { children: [_jsx("div", { children: text.split('/assets/')[0] }), _jsx("img", { src: `/assets/${text.split('/assets/')[1]}`, alt: "Product", className: "w-full h-auto rounded-lg mt-2" })] }));
        }
        return _jsx("div", { children: text });
    };
    return (_jsxs("div", { children: [_jsx("button", { onClick: handleToggle, className: "fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 ease-in-out", children: "\uD83D\uDDEF\uFE0F" }), isOpen && (_jsxs("div", { className: "fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-blue-600 text-white", children: [_jsx("h3", { className: "text-lg font-bold", children: "ChatBot" }), _jsx("button", { onClick: handleToggle, className: "text-2xl hover:text-gray-300", children: _jsx(IoMdClose, {}) })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 h-80 max-h-80", children: responses.map((res, index) => (_jsx("div", { className: `flex ${res.isUser ? 'justify-end' : 'justify-start'}`, children: _jsx("div", { className: `max-w-[70%] p-3 rounded-2xl text-sm shadow
                                    ${res.isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`, children: _jsx(MessageContent, { text: res.text }) }) }, index))) }), _jsxs("div", { className: "flex items-center border-t p-3 bg-white", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), onKeyDown: handleKeyPress, placeholder: "Nh\u1EADp tin nh\u1EAFn...", className: "flex-1 p-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none mr-2" }), _jsx("button", { onClick: handleSendMessage, className: "p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition", children: _jsx(FiSend, {}) })] })] }))] }));
};
export default ChatBotIcon;
