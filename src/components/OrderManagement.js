import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    /*----------------------------------
    -----------------------------------*/
    useEffect(() => {
        fetchOrders();
    }, []);
    /*----------------------------------
    Get all product
    -----------------------------------*/
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://tgdd-be.mhoa.id.vn/api/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(response.data);
            setError(null);
        }
        catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            setError('Không thể tải danh sách đơn hàng');
        }
    };
    /*----------------------------------
    Update status product
    -----------------------------------*/
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://tgdd-be.mhoa.id.vn/api/orders/${orderId}`, { status: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                setOrders(orders.map(order => order.id === orderId
                    ? { ...order, status: newStatus }
                    : order));
            }
            else {
                throw new Error(response.data.error || 'Cập nhật thất bại');
            }
        }
        catch (error) {
            console.error('Error updating status:', error.response?.data || error);
            alert(error.response?.data?.error || 'Không thể cập nhật trạng thái đơn hàng');
        }
    };
    const statusStyle = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'shipping':
                return 'bg-purple-100 text-purple-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    if (error) {
        return _jsx("div", { className: "p-6 text-red-600 text-center", children: error });
    }
    return (_jsxs("div", { className: "p-6 bg-gray-50 min-h-screen", children: [_jsx("h1", { className: "text-4xl font-extrabold text-center text-gray-800 mb-10" }), _jsx("div", { className: "overflow-x-auto shadow rounded-lg", children: _jsxs("table", { className: "min-w-full text-sm text-gray-800 bg-white border border-gray-200", children: [_jsx("thead", { className: "bg-gray-100 text-xs uppercase font-semibold text-gray-600", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left", children: "ID" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Kh\u00E1ch h\u00E0ng" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Email" }), _jsx("th", { className: "px-4 py-3 text-left", children: "S\u1EA3n ph\u1EA9m" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Gi\u00E1" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Li\u00EAn h\u1EC7" }), _jsx("th", { className: "px-4 py-3 text-left", children: "\u0110\u1ECBa ch\u1EC9" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Ng\u00E0y \u0111\u1EB7t" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { className: "px-4 py-3 text-left", children: "C\u1EADp nh\u1EADt" })] }) }), _jsx("tbody", { children: orders.map((order) => (_jsxs("tr", { className: "border-t hover:bg-gray-50 transition duration-150", children: [_jsx("td", { className: "px-4 py-3", children: order.id }), _jsx("td", { className: "px-4 py-3 font-medium", children: order.full_name }), _jsx("td", { className: "px-4 py-3", children: order.email }), _jsx("td", { className: "px-4 py-3", children: order.product_title }), _jsxs("td", { className: "px-4 py-3 text-green-600 font-semibold", children: [order.product_price, "\u0111"] }), _jsx("td", { className: "px-4 py-3", children: order.phone }), _jsx("td", { className: "px-4 py-3", children: order.address }), _jsx("td", { className: "px-4 py-3", children: new Date(order.created_at).toLocaleDateString('vi-VN') }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(order.status)}`, children: order.status || 'pending' }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("select", { className: "border rounded px-2 py-1 bg-white text-sm", value: order.status || 'pending', onChange: (e) => handleUpdateStatus(order.id, e.target.value), children: [_jsx("option", { value: "confirmed", children: "Ch\u1EDD x\u00E1c nh\u1EADn" }), _jsx("option", { value: "confirmed", children: "\u0110\u00E3 x\u00E1c nh\u1EADn" }), _jsx("option", { value: "shipping", children: "\u0110ang giao h\u00E0ng" }), _jsx("option", { value: "completed", children: "Ho\u00E0n th\u00E0nh" }), _jsx("option", { value: "cancelled", children: "\u0110\u00E3 h\u1EE7y" })] }) })] }, order.id))) })] }) })] }));
};
export default OrderManagement;
