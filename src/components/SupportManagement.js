import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
/*----------------------------------
-----------------------------------*/
const SupportManagement = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [reply, setReply] = useState('');
    /*----------------------------------
     -----------------------------------*/
    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await axios.get('https://tgdd-be.mhoa.id.vn/api/support', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Response data:', response.data);
            setRequests(response.data);
            setLoading(false);
        }
        catch (err) {
            console.error('Error details:', err);
            setError('Không thể tải danh sách yêu cầu hỗ trợ');
            setLoading(false);
        }
    };
    /*----------------------------------
    -----------------------------------*/
    useEffect(() => {
        fetchRequests();
    }, []);
    const handleReply = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Sending reply:', {
                requestId,
                reply,
                token
            });
            await axios.post(`https://tgdd-be.mhoa.id.vn/api/support/${requestId}/reply`, { reply }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setReply('');
            setSelectedRequest(null);
            fetchRequests();
            alert('Phản hồi đã được gửi thành công!');
        }
        catch (err) {
            console.error('Error sending reply:', err);
            alert('Không thể gửi phản hồi. Vui lòng thử lại.');
        }
    };
    if (loading)
        return _jsx("div", { className: "text-center py-4", children: "\u0110ang t\u1EA3i..." });
    if (error)
        return _jsx("div", { className: "text-red-500 text-center py-4", children: error });
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Qu\u1EA3n l\u00FD y\u00EAu c\u1EA7u h\u1ED7 tr\u1EE3" }), requests.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-8", children: "Ch\u01B0a c\u00F3 y\u00EAu c\u1EA7u h\u1ED7 tr\u1EE3 n\u00E0o." })) : (_jsx("div", { className: "grid gap-6", children: requests.map((request) => (_jsxs("div", { className: `bg-white p-6 rounded-lg shadow ${request.status === 'pending' ? 'border-l-4 border-yellow-500' : 'border-l-4 border-green-500'}`, children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: request.name }), _jsx("p", { className: "text-gray-600", children: request.email })] }), _jsx("div", { className: "text-sm text-gray-500", children: new Date(request.created_at).toLocaleString('vi-VN') })] }), _jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "text-sm font-semibold text-gray-500 mb-1", children: ["Ch\u1EE7 \u0111\u1EC1: ", request.topic] }), _jsx("p", { className: "text-gray-700", children: request.message })] }), request.reply ? (_jsxs("div", { className: "bg-green-50 p-4 rounded-md", children: [_jsx("div", { className: "font-semibold text-green-800 mb-2", children: "Ph\u1EA3n h\u1ED3i:" }), _jsx("p", { className: "text-green-700", children: request.reply }), _jsxs("div", { className: "text-sm text-green-600 mt-2", children: ["\u0110\u00E3 tr\u1EA3 l\u1EDDi: ", new Date(request.replied_at).toLocaleString('vi-VN')] })] })) : (_jsx("div", { children: selectedRequest === request.id ? (_jsxs("div", { className: "space-y-3", children: [_jsx("textarea", { value: reply, onChange: (e) => setReply(e.target.value), className: "w-full border rounded-md p-3 h-32", placeholder: "Nh\u1EADp n\u1ED9i dung ph\u1EA3n h\u1ED3i..." }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => handleReply(request.id), className: "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600", children: "G\u1EEDi ph\u1EA3n h\u1ED3i" }), _jsx("button", { onClick: () => {
                                                    setSelectedRequest(null);
                                                    setReply('');
                                                }, className: "bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400", children: "H\u1EE7y" })] })] })) : (_jsx("button", { onClick: () => setSelectedRequest(request.id), className: "text-blue-500 hover:text-blue-600", children: "Tr\u1EA3 l\u1EDDi y\u00EAu c\u1EA7u n\u00E0y" })) }))] }, request.id))) }))] }));
};
export default SupportManagement;
