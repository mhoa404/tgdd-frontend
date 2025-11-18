import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import Notifications from './Notifications';
import CartPage from './CartPage';
import { FaUser, FaShoppingCart, FaMapMarkerAlt, FaSearch, FaWallet, } from "react-icons/fa";
export default function Home({ onFilterChange }) {
    const [user, setUser] = useState(null);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [activeTab, setActiveTab] = useState('province');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const { cartItems, getTotalItems, getTotalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
    const formatPrice = (price) => {
        const numPrice = Math.floor(parseFloat(price.toString().replace(/\./g, '')));
        return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange(!!(searchQuery || selectedCategory));
        }
    }, [searchQuery, selectedCategory, onFilterChange]);
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        // Load địa chỉ đã lưu từ localStorage
        const savedAddress = localStorage.getItem('userAddress');
        if (savedAddress) {
            const displayAddress = savedAddress.length > 25 ? savedAddress.substring(0, 25) + '...' : savedAddress;
            setCurrentAddress(displayAddress);
        }
        else {
            setCurrentAddress('Địa chỉ của bạn');
        }
        // Load provinces on component mount
        fetchProvinces();
    }, []);
    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://provinces.open-api.vn/api/p/');
            const data = await response.json();
            setProvinces(data);
        }
        catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };
    const fetchDistricts = async (provinceCode) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            const data = await response.json();
            setDistricts(data.districts || []);
            setWards([]);
        }
        catch (error) {
            console.error('Error fetching districts:', error);
        }
    };
    const fetchWards = async (districtCode) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            const data = await response.json();
            setWards(data.wards || []);
        }
        catch (error) {
            console.error('Error fetching wards:', error);
        }
    };
    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setSelectedDistrict('');
        setSelectedWard('');
        if (provinceCode) {
            fetchDistricts(provinceCode);
        }
        else {
            setDistricts([]);
            setWards([]);
        }
    };
    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
        setSelectedWard('');
        if (districtCode) {
            fetchWards(districtCode);
        }
        else {
            setWards([]);
        }
    };
    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };
    const handleSaveAddress = () => {
        if (selectedProvince && selectedDistrict && selectedWard) {
            const province = provinces.find(p => p.code == selectedProvince);
            const district = districts.find(d => d.code == selectedDistrict);
            const ward = wards.find(w => w.code == selectedWard);
            const newAddress = `${ward.name}, ${district.name}, ${province.name}`;
            const fullAddress = newAddress;
            const displayAddress = newAddress.length > 25 ? newAddress.substring(0, 25) + '...' : newAddress;
            setCurrentAddress(displayAddress);
            localStorage.setItem('userAddress', fullAddress);
            setShowLocationModal(false);
        }
    };
    const handleLogout = () => {
        const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất không?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
        }
    };
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
    const handleSelectProvince = (province) => {
        setSelectedProvince(province.code);
        setSelectedDistrict('');
        setSelectedWard('');
        fetchDistricts(province.code);
        setActiveTab('district');
        setSearchTerm('');
    };
    const handleSelectDistrict = (district) => {
        setSelectedDistrict(district.code);
        setSelectedWard('');
        fetchWards(district.code);
        setActiveTab('ward');
        setSearchTerm('');
    };
    const handleSelectWard = (ward) => {
        setSelectedWard(ward.code);
        const province = provinces.find(p => p.code == selectedProvince);
        const district = districts.find(d => d.code == selectedDistrict);
        const newAddress = `${ward.name}, ${district.name}, ${province.name}`;
        setCurrentAddress(newAddress.length > 25 ? newAddress.substring(0, 25) + '...' : newAddress);
        localStorage.setItem('userAddress', newAddress);
        setShowLocationModal(false);
        setActiveTab('province');
        setSearchTerm('');
    };
    const getFilteredItems = () => {
        let items = [];
        if (activeTab === 'province')
            items = provinces;
        else if (activeTab === 'district')
            items = districts;
        else if (activeTab === 'ward')
            items = wards;
        if (searchTerm) {
            return items.filter(item => {
                const name = item.name.toLowerCase();
                const search = searchTerm.toLowerCase();
                /*----------------------------------------
                ------------------------------------------*/
                const words = name.split(' ');
                return words.some(word => word.startsWith(search)) ||
                    name.includes(search);
            });
        }
        return items;
    };
    const getCurrentAddress = () => {
        if (selectedWard && selectedDistrict && selectedProvince) {
            const province = provinces.find(p => p.code == selectedProvince);
            const district = districts.find(d => d.code == selectedDistrict);
            return `${district?.name}, ${province?.name}`;
        }
        if (selectedDistrict && selectedProvince) {
            const province = provinces.find(p => p.code == selectedProvince);
            return province?.name;
        }
        return 'Quận 1, Hồ Chí Minh';
    };
    const handleCategoryClick = (categoryLabel) => {
        // Map từ label hiển thị sang category value
        const categoryMap = {
            'Điện thoại': 'phone',
            'Laptop': 'laptop',
            'Phụ kiện': 'accessory',
            'Smartwatch': 'smartwatch',
            'Đồng Hồ': 'watch',
            'Tablet': 'tablet'
        };
        const categoryValue = categoryMap[categoryLabel];
        if (categoryValue) {
            setSelectedCategory(categoryValue);
            setSearchQuery('');
        }
    };
    return (_jsxs("div", { children: [_jsxs("header", { className: "w-full bg-[#ffd400]", children: [_jsxs("div", { className: "w-full max-w-[1280px] mx-auto flex items-center justify-between px-4 py-2", children: [_jsxs("div", { className: "flex items-center flex-1 max-w-[600px]", children: [_jsx("img", { src: "/assets/logo.jpg", alt: "Logo", className: "h-8 object-contain cursor-pointer mr-4", onClick: () => {
                                            setSearchQuery('');
                                            setSelectedCategory('');
                                            navigate('/home');
                                        } }), _jsx("div", { className: "relative flex-1", children: _jsxs("div", { className: "flex items-center bg-white rounded-full px-4 py-2", children: [_jsx(FaSearch, { className: "text-gray-500 text-sm mr-3" }), _jsx("input", { type: "text", placeholder: "B\u1EA1n t\u00ECm g\u00EC...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full px-2 py-1 text-sm outline-none bg-transparent" })] }) })] }), _jsxs("div", { className: "flex items-center gap-6 ml-6", children: [user ? (_jsxs(_Fragment, { children: [_jsx(Notifications, {}), _jsxs("div", { className: "flex items-center gap-1 text-sm hover:underline cursor-pointer", onClick: () => navigate('/wallet'), children: [_jsx(FaWallet, {}), _jsx("span", { children: "V\u00ED" })] }), _jsxs("div", { className: "flex items-center gap-1 text-sm hover:underline cursor-pointer", onClick: () => navigate('/orders'), children: [_jsx("span", { children: "\uD83D\uDCE6" }), _jsx("span", { children: "\u0110\u01A1n h\u00E0ng" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: user.avatar || 'https://i.pravatar.cc/40', alt: "avatar", className: "w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-300", onClick: () => navigate('/profile'), title: "Xem profile" }), _jsx("span", { className: "text-sm cursor-pointer max-w-[100px] truncate", onClick: () => navigate('/profile'), children: user.first_name })] })] })) : (_jsxs(_Fragment, { children: [_jsxs(Link, { to: "/login", className: "flex items-center gap-1 text-sm hover:underline", children: [_jsx(FaUser, {}), _jsx("span", { children: "\u0110\u0103ng nh\u1EADp" })] }), _jsx(Link, { to: "/signup", className: "text-sm hover:underline", children: "\u0110\u0103ng k\u00FD" })] })), _jsxs("div", { className: "flex items-center gap-1 text-sm hover:underline cursor-pointer", onClick: () => navigate('/cart'), children: [_jsx(FaShoppingCart, {}), _jsxs("span", { children: ["Gi\u1ECF (", getTotalItems(), ")"] })] }), _jsx(Link, { to: "/support", className: "text-sm font-semibold text-gray-900", children: "H\u1ED7 tr\u1EE3" }), user && (_jsx("button", { onClick: handleLogout, className: "text-sm hover:underline", children: "Tho\u00E1t" })), _jsxs("div", { className: "flex items-center gap-1 bg-yellow-300 px-3 py-2 rounded-full cursor-pointer text-sm hover:bg-yellow-400 transition-colors", onClick: () => setShowLocationModal(true), children: [_jsx(FaMapMarkerAlt, {}), _jsx("span", { className: "truncate max-w-[150px]", children: currentAddress })] })] })] }), _jsxs("div", { className: "w-full max-w-[1280px] mx-auto px-4 py-2 text-sm font-normal", children: [" ", _jsx("div", { className: "flex justify-between items-center", children: menuItems.map((item, index) => (_jsxs("div", { className: "flex items-center gap-1 cursor-pointer hover:underline", onClick: () => handleCategoryClick(item.label), children: [item.icon, _jsx("span", { children: item.label })] }, index))) })] })] }), showLocationModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg w-[600px] max-w-[90vw] max-h-[80vh] flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [_jsx("h3", { className: "text-xl font-bold", children: "Ch\u1ECDn \u0111\u1ECBa ch\u1EC9 nh\u1EADn h\u00E0ng" }), _jsx("button", { onClick: () => setShowLocationModal(false), className: "text-gray-400 hover:text-gray-600 text-2xl", children: "\u00D7" })] }), _jsxs("div", { className: "px-6 py-3 bg-gray-50 border-b", children: [_jsx("p", { className: "text-sm text-gray-600", children: "\u0110\u1ECBa ch\u1EC9 \u0111ang ch\u1ECDn:" }), _jsx("p", { className: "font-medium", children: getCurrentAddress() })] }), _jsx("div", { className: "p-6 border-b", children: _jsxs("div", { className: "relative", children: [_jsx(FaSearch, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "T\u00ECm nhanh t\u1EC9nh th\u00E0nh, qu\u1EADn huy\u1EC7n, ph\u01B0\u1EDDng x\u00E3", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }) }), _jsxs("div", { className: "flex border-b", children: [_jsx("button", { onClick: () => setActiveTab('province'), className: `flex-1 py-3 px-4 text-center font-medium ${activeTab === 'province'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-600 hover:text-gray-800'}`, children: "T\u1EC9nh/TP" }), _jsx("button", { onClick: () => setActiveTab('district'), disabled: !selectedProvince, className: `flex-1 py-3 px-4 text-center font-medium ${activeTab === 'district' && selectedProvince
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-400'}`, children: "Qu\u1EADn/Huy\u1EC7n" }), _jsx("button", { onClick: () => setActiveTab('ward'), disabled: !selectedDistrict, className: `flex-1 py-3 px-4 text-center font-medium ${activeTab === 'ward' && selectedDistrict
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-400'}`, children: "Ph\u01B0\u1EDDng/X\u00E3" })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-6", children: _jsx("div", { className: "grid grid-cols-2 gap-2", children: getFilteredItems().map((item) => (_jsx("button", { onClick: () => {
                                        if (activeTab === 'province')
                                            handleSelectProvince(item);
                                        else if (activeTab === 'district')
                                            handleSelectDistrict(item);
                                        else if (activeTab === 'ward')
                                            handleSelectWard(item);
                                    }, className: "text-left p-3 hover:bg-gray-100 rounded-lg transition-colors", children: item.name }, item.code))) }) }), _jsx("div", { className: "p-6 border-t", children: _jsx("button", { onClick: () => {
                                    setActiveTab('province');
                                    setSearchTerm('');
                                    setSelectedProvince('');
                                    setSelectedDistrict('');
                                    setSelectedWard('');
                                }, className: "text-blue-600 hover:text-blue-800 flex items-center gap-2" }) })] }) })), (searchQuery || selectedCategory) ? (_jsx("div", { className: "w-full max-w-[1280px] mx-auto px-4 py-6", children: _jsx(CartPage, { searchQuery: searchQuery, categoryFilter: selectedCategory }) })) : (
            // Chỉ hiển thị các component khác khi KHÔNG có filter
            _jsx(_Fragment, {})), isCartOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg w-[800px] max-w-[90vw] max-h-[80vh] flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [_jsx("h3", { className: "text-xl font-bold", children: "Gi\u1ECF h\u00E0ng c\u1EE7a b\u1EA1n" }), _jsx("button", { onClick: () => setIsCartOpen(false), className: "text-gray-400 hover:text-gray-600 text-2xl", children: "\u00D7" })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-6", children: cartItems.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "Gi\u1ECF h\u00E0ng tr\u1ED1ng" })) : (_jsx("div", { className: "space-y-4", children: cartItems.map((item) => (_jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-lg", children: [_jsx("img", { src: item.image, alt: item.title, className: "w-16 h-16 object-contain" }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium", children: item.title }), _jsxs("p", { className: "text-red-600 font-bold", children: [formatPrice(item.price), "\u20AB"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => updateQuantity(item.id, item.quantity - 1), className: "w-8 h-8 flex items-center justify-center border rounded", children: "-" }), _jsx("span", { className: "w-8 text-center", children: item.quantity }), _jsx("button", { onClick: () => updateQuantity(item.id, item.quantity + 1), className: "w-8 h-8 flex items-center justify-center border rounded", children: "+" })] }), _jsx("button", { onClick: () => removeFromCart(item.id), className: "text-red-500 hover:text-red-700", children: "X\u00F3a" })] }, item.id))) })) }), cartItems.length > 0 && (_jsxs("div", { className: "p-6 border-t", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("span", { className: "text-lg font-bold", children: "T\u1ED5ng c\u1ED9ng:" }), _jsxs("span", { className: "text-xl font-bold text-red-600", children: [formatPrice(getTotalPrice()), "\u20AB"] })] }), _jsx("button", { className: "w-full bg-[#ffd400] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg", children: "Thanh to\u00E1n" })] }))] }) }))] }));
}
