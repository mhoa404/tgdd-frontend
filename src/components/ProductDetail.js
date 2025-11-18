import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Footers from "./Footers";
import { useCart } from "../context/CartContext";
import Carousel from "./Carousel";
const formatPrice = (price) => {
    // Chuyển về số nguyên trước khi format
    const numPrice = Math.floor(parseFloat(price));
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            alert('Đã thêm sản phẩm vào giỏ hàng!');
        }
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://tgdd-be.mhoa.id.vn/api/products/${id}`);
                setProduct(res.data);
            }
            catch (err) {
                setError("Không tìm thấy sản phẩm.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    if (loading)
        return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Home, {}), _jsx(Carousel, {}), _jsx("div", { className: "p-6", children: "\u0110ang t\u1EA3i..." }), _jsx(Footers, {})] }));
    if (error)
        return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Home, {}), _jsx("div", { className: "p-6 text-red-500", children: error }), _jsx(Footers, {})] }));
    if (!product)
        return null;
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Home, {}), _jsx("section", { className: "py-8 bg-white", children: _jsx("div", { className: "max-w-screen-xl px-4 mx-auto", children: _jsxs("div", { className: "lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16", children: [_jsx("div", { className: "shrink-0 max-w-md lg:max-w-lg mx-auto", children: _jsx("img", { src: product.image, alt: product.title, className: "w-full max-w-md rounded-lg shadow-md mb-4" }) }), _jsxs("div", { className: "mt-6 sm:mt-8 lg:mt-0", children: [_jsx("h1", { className: "text-xl font-semibold text-gray-900 sm:text-2xl", children: product.title }), _jsxs("div", { className: "mt-4 sm:items-center sm:gap-4 sm:flex", children: [_jsxs("p", { className: "text-2xl font-extrabold text-red-600 sm:text-3xl", children: [formatPrice(product.price), "\u20AB"] }), _jsxs("p", { className: "text-gray-500 line-through mb-1", children: [formatPrice(product.originalPrice), "\u20AB"] }), _jsxs("div", { className: "flex items-center gap-2 mt-2 sm:mt-0", children: [_jsx("div", { className: "flex items-center gap-1", children: [...Array(5)].map((_, i) => (_jsx("svg", { className: "w-4 h-4 text-yellow-300", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" }) }, i))) }), _jsx("p", { className: "text-sm font-medium text-gray-600", children: "(5.0)" }), _jsx("a", { href: "#", className: "text-sm font-medium text-blue-600 underline hover:no-underline", children: "345 Reviews" })] })] }), _jsxs("div", { className: "mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8", children: [_jsxs("button", { className: "flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100", children: [_jsx("svg", { className: "w-5 h-5 -ms-2 me-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" }) }), "Y\u00EAu th\u00EDch"] }), _jsxs("button", { onClick: handleAddToCart, className: "text-white mt-4 sm:mt-0 bg-[#ffd400] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center", children: [_jsx("svg", { className: "w-5 h-5 -ms-2 me-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" }) }), "Th\u00EAm v\u00E0o gi\u1ECF"] })] }), _jsx("hr", { className: "my-6 md:my-8 border-gray-200" }), _jsx("p", { className: "mb-6 text-gray-600", children: product.tag }), _jsx("p", { className: "text-gray-700", children: "H\u00E3y mua ngay ch\u00FAng t\u00F4i lu\u00F4n b\u00E1n nh\u1EEFng s\u1EA3n ph\u1EA9m t\u1ED1t nh\u1EA5t trong th\u1ECB tr\u01B0\u1EDDng hi\u1EC7n nay" })] })] }) }) }), _jsx(Footers, {})] }));
};
export default ProductDetail;
