import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from 'react';
/*----------------------------------
-----------------------------------*/
export default function FlashSale() {
    const flashProducts = [
        {
            name: 'iPhone 16 Pro Max 1TB',
            specs: 'Quad HD+ (2K+)',
            price: '42.690.000₫',
            sold: 14,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329151/iphone-16-pro-max-titan-trang-thumbtgdd-600x600.png',
            discount: 10,
        },
        {
            name: 'iPhone 16 Pro Max 256GB',
            specs: 'Quad HD+ (2K+)',
            price: '30.090.000₫',
            sold: 58,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-sa-mac-thumb-1-600x600.jpg',
            discount: 17,
        },
        {
            name: 'iPhone 16 Pro 256GB',
            specs: 'Quad HD+ (2K+)',
            price: '28.090.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329144/iphone-16-pro-titan-trang.png',
            discount: 46,
        },
        {
            name: 'iPhone 16 Plus 256GB',
            specs: 'Quad HD+ (2K+)',
            price: '18.990.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329138/iphone-16-plus-xanh-thumb-600x600.jpg',
            discount: 20,
        },
        {
            name: ' iPhone 16 Plus 128GB',
            specs: 'Quad HD+ (2K+)',
            price: '25.090.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329135/iphone-16-black-600x600.png',
            discount: 25,
        },
        {
            name: 'iPhone 16 Pro 256GB',
            specs: 'Quad HD+ (2K+)',
            price: '33.890.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329144/iphone-16-pro-titan-trang.png',
            discount: 30,
        },
    ];
    const flashProducts2 = [
        {
            name: 'iPhone 15 128GB',
            specs: 'Quad HD+ (2K+)',
            price: '15.390.000₫',
            sold: 125,
            image: 'https://cdn.tgdd.vn/Products/Images/42/281570/iphone-15-vang-thumb-600x600.jpg',
            discount: 15,
        },
        {
            name: 'iPhone 13 128GB',
            specs: 'Super Retina XDR 6.1',
            price: '11.690.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-midnight-2-600x600.jpg',
            discount: 12,
        },
        {
            name: 'Samsung Galaxy S24 Ultra 5G 12GB/256GB',
            specs: 'Quad HD+ (2K+) 6.8"',
            price: '23.850.000₫',
            sold: 89,
            image: 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-5g-600x600.jpg',
            discount: 8,
        },
        {
            name: 'Xiaomi 14T 5G 12GB/256GB',
            specs: '1.5K 6.67"',
            price: '11.260.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329938/xiaomi-14t-black-thumb-600x600.jpg',
            discount: 20,
        },
        {
            name: 'OPPO A3x 4GB/64GB',
            specs: 'Always-On Retina',
            price: '3.260.000₫',
            sold: 67,
            image: 'https://cdn.tgdd.vn/Products/Images/42/328449/oppo-a3x-blue-thumb-600x600.jpg',
            discount: 18,
        },
        {
            name: 'iPhone 16 256GB',
            specs: 'Super Retina XDR',
            price: '22.290.000₫',
            sold: 'ĐANG BÁN CHẠY',
            image: 'https://cdn.tgdd.vn/Products/Images/42/329136/iphone-16-pink-600x600.png',
            discount: 25,
        },
    ];
    const productRef = useRef();
    const handleScrollLeft = () => {
        productRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };
    const handleScrollRight = () => {
        productRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };
    return (_jsxs("div", { className: "bg-white mt-6 p-8 shadow rounded-md borderw-full mx-auto ml-40", children: [_jsx("div", { className: "flex justify-between items-center mb-6", children: _jsx("div", { className: "flex items-center gap-2 ml-4", children: _jsx("h2", { className: "text-lg font-bold text-black-800", children: "G\u1EE3i \u00FD cho b\u1EA1n" }) }) }), _jsx("div", { className: "relative px-6", children: _jsx("div", { className: "flex gap-4 overflow-x-auto", ref: productRef, children: flashProducts.map((item, index) => (_jsxs("div", { className: "w-[180px] h-auto bg-white border border-gray-200 rounded-md shadow-sm p-3 flex-shrink-0 relative flex flex-col", children: [_jsx("img", { src: item.image, alt: item.name, className: "w-full h-32 object-contain mb-3" }), _jsx("h3", { className: "text-sm font-medium mb-2 h-10 leading-tight break-words overflow-hidden", children: item.name }), item.specs && (_jsx("div", { className: "text-xs text-gray-600 mb-2", children: item.specs })), _jsxs("div", { className: "text-red-600 font-bold text-base mb-1", children: [" ", item.price] }), _jsxs("div", { className: "text-gray-400 line-through text-sm mb-2", children: ["\u20AB ", (parseInt(item.price.replace(/\./g, '')) * (100 + item.discount) / 100).toLocaleString()] }), _jsxs("div", { className: "text-orange-600 text-sm mb-2", children: ["Qu\u00E0 ", Math.floor(Math.random() * 500) + 100, ".000\u20AB"] }), _jsxs("div", { className: "flex items-center text-sm", children: [_jsx("span", { className: "text-yellow-500", children: "\u2605" }), _jsxs("span", { className: "ml-1", children: ["4.", Math.floor(Math.random() * 9) + 1] }), _jsxs("span", { className: "text-gray-500 ml-2", children: ["\u2022 \u0110\u00E3 b\u00E1n ", typeof item.sold === 'number' ? item.sold : Math.floor(Math.random() * 50) + 10, "k"] })] })] }, index))) }) }), _jsx("div", { className: "relative px-6 mt-4", children: _jsx("div", { className: "flex gap-4 overflow-x-auto", children: flashProducts2.map((item, index) => (_jsxs("div", { className: "w-[180px] h-auto bg-white border border-gray-200 rounded-md shadow-sm p-3 flex-shrink-0 relative flex flex-col", children: [_jsx("img", { src: item.image, alt: item.name, className: "w-full h-32 object-contain mb-3" }), _jsx("h3", { className: "text-sm font-medium mb-2 h-10 leading-tight break-words overflow-hidden", children: item.name }), item.specs && (_jsx("div", { className: "text-xs text-gray-600 mb-2", children: item.specs })), _jsxs("div", { className: "text-red-600 font-bold text-base mb-1", children: [" ", item.price] }), _jsxs("div", { className: "text-gray-400 line-through text-sm mb-2", children: ["\u20AB ", (parseInt(item.price.replace(/\./g, '')) * (100 + item.discount) / 100).toLocaleString()] }), _jsxs("div", { className: "text-orange-600 text-sm mb-2", children: ["Qu\u00E0 ", Math.floor(Math.random() * 500) + 100, ".000\u20AB"] }), _jsxs("div", { className: "flex items-center text-sm", children: [_jsx("span", { className: "text-yellow-500", children: "\u2605" }), _jsxs("span", { className: "ml-1", children: ["4.", Math.floor(Math.random() * 9) + 1] }), _jsxs("span", { className: "text-gray-500 ml-2", children: ["\u2022 \u0110\u00E3 b\u00E1n ", typeof item.sold === 'number' ? item.sold : Math.floor(Math.random() * 50) + 10, "k"] })] })] }, index))) }) })] }));
}
