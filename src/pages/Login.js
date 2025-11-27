import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footers from '../components/Footers';
import Carousel from '../components/Carousel';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post('https://tgdd-backend.onrender.com/api/auth/login', {
                email,
                password
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userEmail', user.email);
            if (user.role === 'admin') {
                navigate('/admin');
            }
            else {
                navigate('/home');
            }
        }
        catch (error) {
            console.log('Lỗi chi tiết:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Đăng nhập thất bại');
        }
    };
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx(Carousel, {}), _jsx("div", { className: " bg-gray-100 flex flex-col justify-center ", children: _jsxs("div", { className: "p-10 xs:p-0 mx-auto md:w-full md:max-w-md", children: [_jsx("h1", { className: "font-bold text-center text-2xl mb-5", children: "-Login Form-" }), _jsxs("div", { className: "bg-white shadow w-full rounded-lg divide-y divide-gray-200", children: [_jsxs("div", { className: "px-5 py-7", children: [_jsx("label", { className: "font-semibold text-sm text-gray-600 pb-1 block", children: "E-mail" }), _jsx("input", { type: "text", className: "border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("label", { className: "font-semibold text-sm text-gray-600 pb-1 block", children: "Password" }), _jsx("input", { type: "password", className: "border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full", value: password, onChange: (e) => setPassword(e.target.value) }), _jsxs("button", { type: "button", onClick: handleLogin, className: "transition duration-200 bg-[#ffd400] hover:bg-[#ffd400] focus:bg-bg-[#ffd400] focus:shadow-sm focus:ring-4 focus:ring-bg-[#ffd400] focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block", children: [_jsx("span", { className: "inline-block mr-2", children: "Login" }), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "w-4 h-4 inline-block", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })] })] }), _jsx("div", { class: "p-5", children: _jsxs("div", { class: "grid grid-cols-3 gap-1", children: [_jsx("button", { type: "button", class: "transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block", children: "MailUp" }), _jsx("button", { type: "button", class: "transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block", children: "Google" }), _jsx("button", { type: "button", class: "transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block", children: "Github" })] }) }), _jsxs("div", { class: "py-5", children: [_jsxs("div", { class: "grid grid-cols-2 gap-1", children: [_jsx("div", { class: "text-center sm:text-left whitespace-nowrap", children: _jsxs("button", { class: "transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", class: "w-4 h-4 inline-block align-text-top", children: _jsx("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" }) }), _jsx("span", { class: "inline-block ml-1", children: "Forgot Password" })] }) }), _jsx("div", { class: "text-center sm:text-right whitespace-nowrap", children: _jsxs("button", { class: "transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", class: "w-4 h-4 inline-block align-text-bottom\t", children: _jsx("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" }) }), _jsx("span", { class: "inline-block ml-1", children: "Help" })] }) })] }), _jsx("div", { className: "text-center mt-6", children: _jsxs("p", { className: "text-sm text-slate-600", children: ["Ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?", ' ', _jsx("button", { onClick: () => navigate('/signup'), className: "text-blue-600 hover:underline focus:outline-none", children: "\u0110\u0103ng K\u00ED Ngay" })] }) })] })] })] }) }), _jsx(Footers, {})] }));
}
