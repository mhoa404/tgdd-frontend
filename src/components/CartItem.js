import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const formatPrice = (price) => {
    const numPrice = Math.floor(parseFloat(price));
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
const CartItem = ({ id, image, title, originalPrice, price, discount }) => {
    const navigate = useNavigate();
    const handleBuyNow = () => {
        // Lấy địa chỉ từ localStorage
        const savedAddress = localStorage.getItem('userAddress') || '';
        navigate("/cartpay", {
            state: {
                id,
                image,
                title,
                originalPrice,
                price,
                discount,
                userAddress: savedAddress
            }
        });
    };
    return (_jsxs("div", { className: "bg-white shadow-md rounded-lg p-3 w-full max-w-xs  ", children: [_jsx(Link, { to: `/product/${id}`, children: _jsx("img", { src: image, alt: title, className: "w-full h-36 object-contain mb-2 cursor-pointer hover:opacity-90 transition" }) }), _jsx("h2", { className: "text-sm font-medium mb-2 line-clamp-2", children: title }), _jsx("div", { className: "text-xs text-gray-500 mb-2", children: "Quad HD+ (2K+)" }), _jsxs("div", { className: "text-red-600 text-base font-bold mb-1", children: [formatPrice(price), "\u20AB"] }), _jsxs("div", { className: "text-gray-400 line-through text-xs mb-2", children: [formatPrice(originalPrice), "\u20AB"] }), _jsxs("div", { className: "text-orange-500 text-xs font-medium mb-2", children: ["Qu\u00E0 ", discount, ".000\u20AB"] }), _jsxs("div", { className: "flex items-center text-xs text-gray-600 mb-2", children: [_jsx("span", { className: "text-yellow-500", children: "\u2605" }), _jsx("span", { className: "ml-1", children: "4.4 \u2022 \u0110\u00E3 b\u00E1n 14k" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded", children: "\u0110ang b\u00E1n Ch\u1EA1y" }), _jsx("button", { onClick: handleBuyNow, className: "bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded", children: "Mua Ngay" })] })] }));
};
export default CartItem;
