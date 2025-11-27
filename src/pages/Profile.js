import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaCamera, FaLock, FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        birth_date: '',
        gender: '',
        avatar: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [preview, setPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setFormData({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                address: userData.address || '',
                birth_date: userData.birth_date || '',
                gender: userData.gender || '',
                avatar: userData.avatar || ''
            });
            setPreview(userData.avatar || 'https://i.pravatar.cc/150');
        }
    }, []);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setFormData({ ...formData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('https://tgdd-backend.onrender.com/api/auth/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            toast.success('Cập nhật thông tin thành công!');
        }
        catch (error) {
            toast.error(error.response?.data?.error || 'Cập nhật thất bại');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Mật khẩu mới không khớp');
            return;
        }
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put('https://tgdd-backend.onrender.com/api/auth/change-password', passwordData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Đổi mật khẩu thành công!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }
        catch (error) {
            toast.error(error.response?.data?.error || 'Đổi mật khẩu thất bại');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-[#ffd400] shadow-sm border-b", children: _jsx("div", { className: "max-w-6xl mx-auto px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("button", { onClick: () => navigate('/home'), className: "flex items-center gap-2 text-gray-800 hover:text-gray400", children: [_jsx(FaArrowLeft, {}), _jsx("span", { children: "Quay l\u1EA1i" })] }), _jsx("h1", { className: "text-1xl font-bold text-gray-800", children: "Th\u00F4ng tin c\u00E1 nh\u00E2n" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: preview, alt: "Avatar", className: "w-10 h-10 rounded-full object-cover" }), _jsxs("span", { className: "text-sm text-gray-800", children: [user?.first_name, " ", user?.last_name] })] })] }) }) }), _jsx("div", { className: "max-w-6xl mx-auto px-4 py-8", children: _jsxs("div", { className: "grid lg:grid-cols-4 gap-8", children: [_jsx("div", { className: "lg:col-span-1", children: _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsxs("div", { className: "relative inline-block", children: [_jsx("img", { src: preview, alt: "Avatar", className: "w-24 h-24 rounded-full object-cover mx-auto" }), _jsxs("label", { className: "absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700", children: [_jsx(FaCamera, { className: "w-3 h-3" }), _jsx("input", { type: "file", accept: "image/*", onChange: handleAvatarChange, className: "hidden" })] })] }), _jsxs("h3", { className: "mt-4 font-semibold text-gray-800", children: [user?.first_name, " ", user?.last_name] }), _jsx("p", { className: "text-sm text-gray-500", children: user?.email })] }), _jsxs("nav", { className: "space-y-2", children: [_jsxs("button", { onClick: () => setActiveTab('profile'), className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'profile'
                                                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                                    : 'text-gray-600 hover:bg-gray-50'}`, children: [_jsx(FaUser, {}), _jsx("span", { children: "Th\u00F4ng tin c\u00E1 nh\u00E2n" })] }), _jsxs("button", { onClick: () => setActiveTab('password'), className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'password'
                                                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                                    : 'text-gray-600 hover:bg-gray-50'}`, children: [_jsx(FaLock, {}), _jsx("span", { children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" })] })] })] }) }), _jsx("div", { className: "lg:col-span-3", children: _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [activeTab === 'profile' && (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-6", children: "C\u1EADp nh\u1EADt th\u00F4ng tin c\u00E1 nh\u00E2n" }), _jsxs("form", { onSubmit: handleUpdateProfile, className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "H\u1ECD *" }), _jsx("input", { type: "text", name: "first_name", value: formData.first_name, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "T\u00EAn *" }), _jsx("input", { type: "text", name: "last_name", value: formData.last_name, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email *" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i" }), _jsx("input", { type: "tel", name: "phone", value: formData.phone, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "0123456789" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Ng\u00E0y sinh" }), _jsx("input", { type: "date", name: "birth_date", value: formData.birth_date, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Gi\u1EDBi t\u00EDnh" }), _jsxs("select", { name: "gender", value: formData.gender, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", children: [_jsx("option", { value: "", children: "Ch\u1ECDn gi\u1EDBi t\u00EDnh" }), _jsx("option", { value: "male", children: "Nam" }), _jsx("option", { value: "female", children: "N\u1EEF" }), _jsx("option", { value: "other", children: "Kh\u00E1c" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0110\u1ECBa ch\u1EC9" }), _jsx("textarea", { name: "address", value: formData.address, onChange: handleChange, rows: 3, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "Nh\u1EADp \u0111\u1ECBa ch\u1EC9 c\u1EE7a b\u1EA1n..." })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { type: "submit", disabled: isLoading, className: "px-6 py-3 bg-[#ffd400]  text-black rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors", children: isLoading ? 'Đang cập nhật...' : 'Cập nhật thông tin' }) })] })] })), activeTab === 'password' && (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-6", children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }), _jsxs("form", { onSubmit: handleChangePassword, className: "space-y-6 max-w-md", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i *" }), _jsx("input", { type: "password", name: "currentPassword", value: passwordData.currentPassword, onChange: handlePasswordChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "M\u1EADt kh\u1EA9u m\u1EDBi *" }), _jsx("input", { type: "password", name: "newPassword", value: passwordData.newPassword, onChange: handlePasswordChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true, minLength: 6 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi *" }), _jsx("input", { type: "password", name: "confirmPassword", value: passwordData.confirmPassword, onChange: handlePasswordChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true, minLength: 6 })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { type: "submit", disabled: isLoading, className: "px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors", children: isLoading ? 'Đang đổi...' : 'Đổi mật khẩu' }) })] })] }))] }) })] }) }), _jsx(ToastContainer, { position: "top-right", autoClose: 3000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true })] }));
};
export default Profile;
