import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import Home from './Home';
import Footers from './Footers';
const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    // Tabs cho phân loại đơn hàng
    const orderTabs = [
        { key: 'all', label: 'Tất cả', count: orders.length },
        { key: 'pending', label: 'Chờ xác nhận', count: orders.filter(o => o.status === 'pending').length },
        { key: 'confirmed', label: 'Chờ lấy hàng', count: orders.filter(o => o.status === 'confirmed').length },
        { key: 'shipping', label: 'Chờ giao hàng', count: orders.filter(o => o.status === 'shipping').length },
        { key: 'completed', label: 'Đã giao', count: orders.filter(o => o.status === 'completed').length },
        { key: 'cancelled', label: 'Đã hủy', count: orders.filter(o => o.status === 'cancelled').length }
    ];
    // Filter orders theo tab
    const filteredOrders = activeTab === 'all'
        ? orders
        : orders.filter(order => order.status === activeTab);
    useEffect(() => {
        fetchUserOrders();
        // Listen for notification updates
        const handleStorageChange = (e) => {
            if (e.key === 'orderUpdate') {
                fetchUserOrders();
                localStorage.removeItem('orderUpdate');
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    const fetchUserOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('userEmail');
            if (!token || !userEmail) {
                setError('Vui lòng đăng nhập để xem lịch sử đơn hàng');
                setLoading(false);
                return;
            }
            const response = await axios.get(`https://tgdd-be.mhoa.id.vn/api/orders/user/${userEmail}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(response.data);
            setLoading(false);
        }
        catch (error) {
            console.error('Lỗi khi tải lịch sử đơn hàng:', error);
            setError('Không thể tải lịch sử đơn hàng');
            setLoading(false);
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return _jsx(FaClock, { className: "text-yellow-500" });
            case 'confirmed': return _jsx(FaBox, { className: "text-blue-500" });
            case 'shipping': return _jsx(FaTruck, { className: "text-purple-500" });
            case 'completed': return _jsx(FaCheckCircle, { className: "text-green-500" });
            case 'cancelled': return _jsx(FaTimesCircle, { className: "text-red-500" });
            default: return _jsx(FaClock, { className: "text-gray-500" });
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Chờ xác nhận';
            case 'confirmed': return 'Đã xác nhận';
            case 'shipping': return 'Đang giao hàng';
            case 'completed': return 'Đã giao hàng';
            case 'cancelled': return 'Đã hủy';
            default: return 'Chờ xác nhận';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipping': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    if (loading) {
        return (_jsxs("div", { children: [_jsx(Home, {}), _jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "\u0110ang t\u1EA3i l\u1ECBch s\u1EED \u0111\u01A1n h\u00E0ng..." })] }) }), _jsx(Footers, {})] }));
    }
    if (error) {
        return (_jsxs("div", { children: [_jsx(Home, {}), _jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsx("div", { className: "text-center", children: _jsx("p", { className: "text-red-600 text-lg", children: error }) }) }), _jsx(Footers, {})] }));
    }
    return (_jsxs("div", { children: [_jsx(Home, {}), _jsx("div", { className: "min-h-screen bg-gray-50 py-8", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-8", children: " L\u1ECBch s\u1EED \u0111\u01A1n h\u00E0ng" }), _jsx("div", { className: "bg-white rounded-lg shadow-sm mb-6", children: _jsx("div", { className: "flex overflow-x-auto", children: orderTabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.key), className: `flex-1 min-w-[120px] px-4 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                                        ? 'text-red-600 border-red-600 bg-red-50'
                                        : 'text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-50'}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { children: tab.label }), tab.count > 0 && (_jsxs("div", { className: `text-xs mt-1 ${activeTab === tab.key ? 'text-red-500' : 'text-gray-400'}`, children: ["(", tab.count, ")"] }))] }) }, tab.key))) }) }), loading ? (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-12 text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "\u0110ang t\u1EA3i l\u1ECBch s\u1EED \u0111\u01A1n h\u00E0ng..." })] })) : error ? (_jsx("div", { className: "bg-white rounded-lg shadow-sm p-12 text-center", children: _jsx("p", { className: "text-red-600 text-lg", children: error }) })) : filteredOrders.length === 0 ? (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-12 text-center", children: [_jsx("div", { className: "w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(FaBox, { className: "text-4xl text-gray-400" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-600 mb-2", children: activeTab === 'all' ? 'Chưa có đơn hàng nào' : `Không có đơn hàng ${orderTabs.find(t => t.key === activeTab)?.label.toLowerCase()}` }), _jsx("p", { className: "text-gray-500", children: activeTab === 'all' ? 'Bạn chưa đặt đơn hàng nào. Hãy mua sắm ngay!' : 'Hãy tiếp tục mua sắm để có thêm đơn hàng!' })] })) : (_jsx("div", { className: "space-y-6", children: filteredOrders.map((order) => (_jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold text-gray-800", children: ["\u0110\u01A1n h\u00E0ng #", order.id] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["\u0110\u1EB7t ng\u00E0y: ", new Date(order.created_at).toLocaleDateString('vi-VN')] })] }), _jsxs("div", { className: `flex items-center gap-2 px-3 py-2 rounded-full border ${getStatusColor(order.status)}`, children: [getStatusIcon(order.status), _jsx("span", { className: "text-sm font-medium", children: getStatusText(order.status) })] })] }), _jsx("div", { className: "border-t border-gray-100 pt-4", children: _jsx("div", { className: "flex gap-4", children: _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-gray-800 mb-2", children: order.product_title }), _jsxs("p", { className: "text-2xl font-bold text-red-600", children: [order.product_price?.toLocaleString(), "\u20AB"] }), _jsxs("div", { className: "mt-3 text-sm text-gray-600", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Ng\u01B0\u1EDDi nh\u1EADn:" }), " ", order.full_name] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "\u0110i\u1EC7n tho\u1EA1i:" }), " ", order.phone] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "\u0110\u1ECBa ch\u1EC9:" }), " ", order.address] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Thanh to\u00E1n:" }), " ", order.payment_method === 'wallet' ? 'Ví điện tử' : 'COD'] })] })] }) }) }), _jsxs("div", { className: "mt-6 pt-4 border-t border-gray-100", children: [_jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500 mb-2", children: [_jsx("span", { children: "Ch\u1EDD x\u00E1c nh\u1EADn" }), _jsx("span", { children: "\u0110\u00E3 x\u00E1c nh\u1EADn" }), _jsx("span", { children: "\u0110ang giao" }), _jsx("span", { children: "Ho\u00E0n th\u00E0nh" })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full transition-all duration-300 ${order.status === 'pending' ? 'bg-yellow-500 w-1/4' :
                                                            order.status === 'confirmed' ? 'bg-blue-500 w-2/4' :
                                                                order.status === 'shipping' ? 'bg-purple-500 w-3/4' :
                                                                    order.status === 'completed' ? 'bg-green-500 w-full' :
                                                                        'bg-red-500 w-1/4'}` }) })] })] }) }, order.id))) }))] }) }), _jsx(Footers, {})] }));
};
export default OrderHistory;
