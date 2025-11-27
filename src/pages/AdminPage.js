import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SupportManagement from '../components/SupportManagement';
import OrderManagement from '../components/OrderManagement';
import WalletManagement from '../components/WalletManagement';
import Footers from '../components/Footers';
import AdminUsers from '../components/AdminUsers';
import { TECarousel, TECarouselItem } from 'tw-elements-react';
const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        title: '',
        originalPrice: '',
        price: '',
        discount: '',
        tag: '',
        image: '',
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();
    /*------------------------------------------
      Logout hanle 12/11/2025
    -------------------------------------------*/
    const handleLogout = () => {
        const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất không?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
        }
    };
    /*------------------------------------------
      Get all product
    -------------------------------------------*/
    const fetchProducts = async () => {
        try {
            const res = await axios.get('https://tgdd-backend.onrender.com/api/products');
            setProducts(res.data);
        }
        catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    /*------------------------------------------
      Add or update product
    -------------------------------------------*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                ...form,
                originalPrice: form.originalPrice.replace(/\./g, ''),
                price: form.price.replace(/\./g, ''),
            };
            if (editingProduct) {
                await axios.put(`https://tgdd-backend.onrender.com/api/products/${editingProduct.id}`, formData);
                setEditingProduct(null);
            }
            else {
                await axios.post('https://tgdd-backend.onrender.com/api/products', formData);
            }
            setForm({
                title: '',
                originalPrice: '',
                price: '',
                discount: '',
                tag: '',
                image: '',
            });
            setPreview('');
            fetchProducts();
        }
        catch (error) {
            console.error('Lỗi khi thêm/sửa sản phẩm:', error);
        }
    };
    /*------------------------------------------
      Delete product
    -------------------------------------------*/
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tgdd-backend.onrender.com/api/products/${id}`);
            fetchProducts();
        }
        catch (error) {
            console.error('Lỗi khi xoá sản phẩm:', error);
        }
    };
    /*------------------------------------------
      Edit product
    -------------------------------------------*/
    const handleEdit = (product) => {
        setEditingProduct(product);
        setForm({
            title: product.title,
            originalPrice: product.originalPrice,
            price: product.price,
            discount: product.discount,
            tag: product.tag,
            image: product.image,
        });
        setPreview(product.image);
    };
    const formatPrice = (value) => {
        const numericValue = value.replace(/\D/g, '');
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    const handlePriceChange = (field, value) => {
        const formatted = formatPrice(value);
        setForm({ ...form, [field]: formatted });
    };
    const formatDisplayPrice = (price) => {
        const numPrice = Math.floor(parseFloat(price));
        return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    return (_jsxs("div", { className: "w-full min-h-screen p-6 bg-gray-50", children: [_jsxs("div", { className: "flex justify-end mb-4", children: [_jsxs("header", { className: "fixed top-0 left-0 w-full bg-yellow-400 shadow-lg py-5 px-16 flex items-center justify-between gap-4 z-50", children: [_jsx("div", { className: "flex items-center", children: _jsx("img", { src: "/assets/logo.jpg", alt: "logo", className: "h-10 object-contain mr-3 cursor-pointer", onClick: () => {
                                        setActiveTab('products');
                                        navigate('/admin');
                                    } }) }), _jsx("nav", { className: "flex-1 flex flex-wrap justify-center gap-4", children: [
                                    { key: 'products', label: 'Quản lý sản phẩm' },
                                    { key: 'orders', label: 'Quản lý đơn hàng' },
                                    { key: 'wallet', label: 'Quản lý ví' },
                                    { key: 'support', label: 'Quản lý hỗ trợ' },
                                    { key: 'users', label: 'Quản lý người dùng' }, // <-- thêm
                                ].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.key), className: `px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab.key
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-800 hover:bg-blue-100 border border-gray-200'}`, children: tab.label }, tab.key))) }), _jsxs("button", { onClick: handleLogout, className: "bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full flex items-center gap-2 shadow-sm text-sm transition", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z", clipRule: "evenodd" }) }), "\u0110\u0103ng xu\u1EA5t"] })] }), _jsx("div", { className: "mt-28 w-full max-w-[1700px] mx-auto", children: _jsx(TECarousel, { ride: "carousel", showIndicators: true, showControls: true, children: _jsxs("div", { className: "relative w-full h-64 overflow-hidden after:clear-both after:block after:content-['']", children: [_jsx(TECarouselItem, { itemID: 1, "data-te-carousel-active": true, className: "relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-700 ease-in-out", children: _jsx("img", { src: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/23/05/23050828d3211ce7b91e92473a3690b3.jpg", className: "w-full h-full object-cover rounded-lg", alt: "Slide 1" }) }), _jsx(TECarouselItem, { itemID: 2, className: "relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-700 ease-in-out", children: _jsx("img", { src: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/43/85/43854a7ba231f17252741049cc5a099a.png", className: "w-full h-full object-cover rounded-lg", alt: "Slide 2" }) }), _jsx(TECarouselItem, { itemID: 3, className: "relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-700 ease-in-out", children: _jsx("img", { src: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/91/1b/911bdb7d43d18d76d89279f143d90f2c.png", className: "w-full h-full object-cover rounded-lg", alt: "Slide 3" }) })] }) }) })] }), activeTab === 'products' ? (_jsxs(_Fragment, { children: [_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: [_jsx("input", { type: "text", placeholder: "T\u00EAn s\u1EA3n ph\u1EA9m", value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }), className: "border border-gray-300 rounded px-4 py-2" }), _jsx("input", { type: "text", placeholder: "Gi\u00E1 g\u1ED1c (VD: 46.637.000)", value: form.originalPrice, onChange: (e) => handlePriceChange('originalPrice', e.target.value), className: "border border-gray-300 rounded px-4 py-2" }), _jsx("input", { type: "text", placeholder: "Gi\u00E1 khuy\u1EBFn m\u00E3i (VD: 42.690.000)", value: form.price, onChange: (e) => handlePriceChange('price', e.target.value), className: "border border-gray-300 rounded px-4 py-2" }), _jsx("input", { type: "text", placeholder: "Gi\u1EA3m gi\u00E1 (%)", value: form.discount, onChange: (e) => setForm({ ...form, discount: e.target.value }), className: "border border-gray-300 rounded px-4 py-2" }), _jsx("input", { type: "text", placeholder: "Tag", value: form.tag, onChange: (e) => setForm({ ...form, tag: e.target.value }), className: "border border-gray-300 rounded px-4 py-2" }), _jsxs("div", { children: [_jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imagePath = `/assets/${file.name}`;
                                                setForm({ ...form, image: imagePath });
                                                const reader = new FileReader();
                                                reader.onloadend = () => setPreview(reader.result);
                                                reader.readAsDataURL(file);
                                            }
                                        }, className: "border border-gray-300 rounded px-4 py-2 w-full" }), preview && (_jsx("img", { src: preview, alt: "Preview", className: "w-24 h-24 object-cover mt-2 border rounded" }))] }), _jsx("button", { type: "submit", className: "col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition", children: editingProduct ? 'Cập nhật sản phẩm' : '➕ Thêm sản phẩm' })] }), _jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Danh s\u00E1ch s\u1EA3n ph\u1EA9m" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 items-stretch", children: products.map((item) => (_jsxs("div", { className: "bg-white rounded-lg shadow p-4 flex flex-col justify-between text-center border hover:shadow-lg transition-all duration-200 h-full", children: [_jsxs("div", { children: [_jsx("img", { src: item.image, alt: item.title, className: "w-32 h-32 object-cover rounded mb-2 mx-auto" }), _jsx("h3", { className: "text-lg font-semibold min-h-[48px]", children: item.title }), _jsxs("p", { className: "text-gray-600", children: ["Gi\u00E1:", ' ', _jsxs("span", { className: "text-green-600 font-bold", children: [formatDisplayPrice(item.price), "\u20AB"] })] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Gi\u00E1 g\u1ED1c: ", formatDisplayPrice(item.originalPrice), "\u20AB"] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Gi\u1EA3m: ", item.discount, "%"] }), _jsx("p", { className: "text-xs text-gray-500", children: item.tag })] }), _jsxs("div", { className: "mt-auto flex gap-2 justify-center pt-3", children: [_jsx("button", { onClick: () => handleEdit(item), className: "bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded", children: "S\u1EEDa" }), _jsx("button", { onClick: () => handleDelete(item.id), className: "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded", children: "X\u00F3a" })] })] }, item.id))) })] })) : activeTab === 'orders' ? (_jsx(OrderManagement, {})) : activeTab === 'wallet' ? (_jsx(WalletManagement, {})) : activeTab === 'users' ? (_jsx(AdminUsers, {})) : (_jsx(SupportManagement, {})), _jsx(Footers, {})] }));
};
export default AdminPage;
