import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function WalletManagement() {
    const [depositRequests, setDepositRequests] = useState([]);
    const fetchDepositRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://tgdd-backend.onrender.com/api/admin/deposits', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDepositRequests(response.data);
        }
        catch (error) {
            console.error('Lỗi lấy danh sách nạp tiền:', error);
        }
    };
    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`https://tgdd-backend.onrender.com/api/admin/deposits/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDepositRequests();
            alert('Đã duyệt yêu cầu nạp tiền');
        }
        catch (error) {
            alert('Lỗi duyệt yêu cầu');
        }
    };
    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`https://tgdd-backend.onrender.com/api/admin/deposits/${id}/reject`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDepositRequests();
            alert('Đã từ chối yêu cầu nạp tiền');
        }
        catch (error) {
            alert('Lỗi từ chối yêu cầu');
        }
    };
    useEffect(() => {
        fetchDepositRequests();
    }, []);
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-center", children: "Qu\u1EA3n l\u00FD v\u00ED" }), _jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Ng\u01B0\u1EDDi d\u00F9ng" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "S\u1ED1 ti\u1EC1n" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "M\u00E3 n\u1EA1p" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Th\u1EDDi gian" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-200", children: depositRequests.map((request) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: request.user_email }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [parseInt(request.amount).toLocaleString(), " VN\u0110"] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600", children: request.transfer_code }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: `px-2 py-1 text-xs rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'}`, children: request.status === 'pending' ? 'Chờ duyệt' :
                                                request.status === 'approved' ? 'Đã duyệt' : 'Từ chối' }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(request.created_at).toLocaleString('vi-VN') }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: request.status === 'pending' && (_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => handleApprove(request.id), className: "bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs", children: "Duy\u1EC7t" }), _jsx("button", { onClick: () => handleReject(request.id), className: "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs", children: "T\u1EEB ch\u1ED1i" })] })) })] }, request.id))) })] }) })] }));
}
