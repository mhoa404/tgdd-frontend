import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footers from '../components/Footers';
import Carousel from '../components/Carousel';
export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
        try {
            const response = await fetch('https://tgdd-backend.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    lname: formData.lname,
                    email: formData.email,
                    password: formData.password,
                    cpassword: formData.cpassword
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Đăng ký thất bại');
            }
            setSuccess(data.message || 'Đăng ký thành công! Đang chuyển hướng...');
            /*-----------------------------------------
            Resert form
     
            -------------------------------------------*/
            setFormData({
                name: '',
                lname: '',
                email: '',
                password: '',
                cpassword: ''
            });
            /*----------------------------------
            -----------------------------------*/
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx(Carousel, {}), _jsxs("div", { className: "max-w-4xl max-sm:max-w-lg mx-auto    mt-6", children: [_jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [_jsx("a", { href: "/" }), _jsx("h4", { className: "text-slate-600 text-base mt-6", children: "\u0110\u0103ng k\u00FD t\u00E0i kho\u1EA3n m\u1EDBi" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "grid sm:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsx("label", { className: "text-slate-800 text-sm font-medium mb-2 block", children: "H\u1ECD" }), _jsx("input", { name: "name", type: "text", value: formData.name, onChange: handleChange, className: "bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all", placeholder: "Nh\u1EADp h\u1ECD", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "text-slate-800 text-sm font-medium mb-2 block", children: "T\u00EAn" }), _jsx("input", { name: "lname", type: "text", value: formData.lname, onChange: handleChange, className: "bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all", placeholder: "Nh\u1EADp t\u00EAn", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "text-slate-800 text-sm font-medium mb-2 block", children: "Email" }), _jsx("input", { name: "email", type: "email", value: formData.email, onChange: handleChange, className: "bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all", placeholder: "Nh\u1EADp email", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "text-slate-800 text-sm font-medium mb-2 block", children: "M\u1EADt kh\u1EA9u" }), _jsx("input", { name: "password", type: "password", value: formData.password, onChange: handleChange, className: "bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all", placeholder: "Nh\u1EADp m\u1EADt kh\u1EA9u", required: true, minLength: 6 })] }), _jsxs("div", { children: [_jsx("label", { className: "text-slate-800 text-sm font-medium mb-2 block", children: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u" }), _jsx("input", { name: "cpassword", type: "password", value: formData.cpassword, onChange: handleChange, className: "bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all", placeholder: "Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u", required: true, minLength: 6 })] })] }), error && (_jsx("div", { className: "mt-4 p-3 bg-red-100 text-red-700 rounded text-sm", children: error })), success && (_jsx("div", { className: "mt-4 p-3 bg-green-100 text-green-700 rounded text-sm", children: success })), _jsx("div", { className: "mt-12", children: _jsx("button", { type: "submit", disabled: isLoading, className: `mx-auto block py-3 px-6 text-sm font-medium tracking-wider rounded text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none transition-colors`, children: isLoading ? 'Đang xử lý...' : 'Đăng ký' }) })] }), _jsx("div", { className: "text-center mt-6", children: _jsxs("p", { className: "text-sm text-slate-600", children: ["\u0110\u00E3 c\u00F3 t\u00E0i kho\u1EA3n?", ' ', _jsx("button", { onClick: () => navigate('/login'), className: "text-blue-600 hover:underline focus:outline-none", children: "\u0110\u0103ng nh\u1EADp ngay" })] }) })] }), _jsx(Footers, {})] }));
}
