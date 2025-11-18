import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "./CartItem";
const productsMock = [];
const CartPage = ({ searchQuery = '', categoryFilter = '' }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://tgdd-be.mhoa.id.vn/api/products");
                const combinedProducts = [...productsMock, ...response.data];
                setProducts(combinedProducts);
            }
            catch (error) {
                console.error("Lỗi khi lấy sản phẩm từ API:", error);
                setProducts(productsMock);
            }
        };
        fetchProducts();
    }, []);
    const filteredProducts = products.filter(product => {
        const matchesSearch = !searchQuery ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !categoryFilter ||
            product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    console.log('Filtered products count:', filteredProducts.length);
    return (_jsxs("div", { className: "w-full max-w-[1280px] mx-auto px-4 py-6 min-h-screen", children: [_jsxs("h1", { className: "text-xl font-bold mb-6", children: [searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` :
                        categoryFilter ? `Sản phẩm ${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}` :
                            'Sản phẩm', _jsxs("span", { className: "text-gray-500 text-sm ml-2", children: ["(", filteredProducts.length, " s\u1EA3n ph\u1EA9m)"] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: filteredProducts.map((product) => (_jsx(CartItem, { ...product }, product.id))) })] }));
};
export default CartPage;
