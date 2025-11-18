import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
'use client';
import { useState } from 'react';
import { FaUser, FaShoppingCart, FaMapMarkerAlt, FaSearch, } from "react-icons/fa";
const menuItems = [
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/phonne-24x24.png", className: "w-5 h-5" }), label: "Điện thoại" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/laptop-24x24.png", className: "w-5 h-5" }), label: "Laptop" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/phu-kien-24x24.png", className: "w-5 h-5" }), label: "Phụ kiện" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/smartwatch-24x24.png", className: "w-5 h-5" }), label: "Smartwatch" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/watch-24x24.png", className: "w-5 h-5" }), label: "Đồng Hồ" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/tablet-24x24.png", className: "w-5 h-5" }), label: "Tablet" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/may-cu-24x24.png", className: "w-5 h-5" }), label: "Mua máy thu cũ" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/PC-24x24.png", className: "w-5 h-5" }), label: "Màn hình, Máy in" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/sim-24x24.png", className: "w-5 h-5" }), label: "Sim, Thẻ cào" },
    { icon: _jsx("img", { src: "https://cdn.tgdd.vn/content/tien-ich-24x24.png", className: "w-5 h-5" }), label: "Dịch vụ tiện ích" },
];
export default function Header() {
    const navigate = useNavigate();
    return (_jsxs("header", { className: "w-full bg-[#ffd400]", children: [_jsxs("div", { className: "w-full max-w-[1280px] mx-auto flex items-center px-4 py-2", children: [_jsxs("div", { className: "flex items-center w-[600px]", children: [_jsx("img", { src: "./assets/logo.jpg", alt: "Logo", className: "h-10 object-contain cursor-pointer", onClick: () => navigate('/') }), _jsx("div", { className: "relative ml-2 flex-1", children: _jsxs("div", { className: "flex items-center bg-white rounded-full px-3 py-1", children: [_jsx(FaSearch, { className: "text-gray-500 text-sm" }), _jsx("input", { type: "text", placeholder: "B\u1EA1n t\u00ECm g\u00EC...", className: "w-full px-2 py-1 text-sm outline-none bg-transparent" })] }) })] }), _jsxs("div", { className: "flex items-center gap-14 ml-8", children: [_jsxs(Link, { to: "/login", className: "flex items-center gap-1 text-sm font-normal hover:underline", children: [_jsx(FaUser, {}), "\u0110\u0103ng nh\u1EADp"] }), _jsx(Link, { to: "/signup", className: "text-sm font-normal hover:underline", children: "\u0110\u0103ng k\u00FD" }), _jsxs("div", { className: "flex items-center gap-1 hover:underline cursor-pointer text-sm", children: [_jsx(FaShoppingCart, {}), "Gi\u1ECF h\u00E0ng"] }), _jsxs("div", { className: "flex items-center gap-1 bg-yellow-300 px-3 py-2 rounded-full cursor-pointer text-sm", children: [_jsx(FaMapMarkerAlt, {}), _jsx("span", { className: "truncate max-w-[150px]", children: "Th\u1EBF gi\u1EDBi di \u0111\u1ED9ng " })] })] })] }), _jsx("div", { className: "w-full max-w-[1280px] mx-auto flex flex-wrap gap-7 px-4 py-3 text-sm font-normal", children: menuItems.map((item, index) => (_jsxs("div", { className: "flex items-center gap-1 cursor-pointer hover:underline", children: [item.icon, _jsx("span", { children: item.label })] }, index))) })] }));
}
