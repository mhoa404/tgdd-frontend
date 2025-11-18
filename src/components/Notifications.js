import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import axios from 'axios';
const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const fetchNotifications = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            const response = await axios.get(`https://tgdd-be.mhoa.id.vn/api/notifications/${userEmail}`);
            const newNotifications = response.data;
            const oldCount = notifications.length;
            // Nếu có notification mới về đơn hàng
            if (newNotifications.length > oldCount) {
                const latestNotif = newNotifications[0];
                if (latestNotif.title.includes('Cập nhật đơn hàng')) {
                    localStorage.setItem('orderUpdate', 'true');
                }
            }
            setNotifications(newNotifications);
            setUnread(newNotifications.filter(notif => !notif.is_read).length);
        }
        catch (error) {
            console.error('Lỗi khi tải thông báo:', error);
        }
    };
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);
    const handleMarkAsRead = async (notificationId) => {
        try {
            await axios.put(`https://tgdd-be.mhoa.id.vn/api/notifications/${notificationId}/read`);
            fetchNotifications();
        }
        catch (error) {
            console.error('Lỗi khi đánh dấu đã đọc:', error);
        }
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "relative p-2 text-gray-600 hover:text-gray-800", children: [_jsx(IoMdNotifications, { className: "text-2xl" }), unread > 0 && (_jsx("span", { className: "absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center", children: unread }))] }), isOpen && (_jsxs("div", { className: "absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto", children: [_jsx("div", { className: "p-4 border-b", children: _jsx("h3", { className: "text-lg font-semibold", children: "Th\u00F4ng b\u00E1o" }) }), _jsx("div", { className: "divide-y", children: notifications.length === 0 ? (_jsx("div", { className: "p-4 text-gray-500 text-center", children: "Kh\u00F4ng c\u00F3 th\u00F4ng b\u00E1o n\u00E0o" })) : (notifications.map((notification) => (_jsxs("div", { className: `p-4 hover:bg-gray-50 cursor-pointer ${!notification.is_read ? 'bg-blue-50' : '' // Sửa read thành is_read
                            }`, onClick: () => handleMarkAsRead(notification.id), children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: notification.title }), _jsx("div", { className: "text-sm text-gray-500 mt-1", children: notification.message }), _jsx("div", { className: "text-xs text-gray-400 mt-1", children: new Date(notification.created_at).toLocaleString('vi-VN') })] }, notification.id)))) })] }))] }));
};
export default Notifications;
