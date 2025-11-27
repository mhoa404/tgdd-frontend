import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Footers from "./Footers";
const CartPayPage = () => {
    const location = useLocation();
    const { cartItems, totalPrice, isMultipleItems, ...product } = location.state || {};
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState(product?.userAddress || "");
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" hoặc "wallet"
    const [wallet, setWallet] = useState(null);
    // Load địa chỉ từ localStorage nếu không có trong state
    useEffect(() => {
        const savedAddress = localStorage.getItem('userAddress');
        if (savedAddress) {
            setAddress(savedAddress);
        }
        fetchWalletInfo();
    }, []);
    const fetchWalletInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('https://tgdd-backend.onrender.com/api/wallet', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setWallet(response.data.wallet);
            }
        }
        catch (error) {
            console.error('Lỗi lấy thông tin ví:', error);
        }
    };
    const formatPrice = (price) => {
        const numPrice = Math.floor(parseFloat(price));
        return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    const getTotalAmount = () => {
        return isMultipleItems ? totalPrice : product?.price;
    };
    const handleOrder = async () => {
        if (!fullName || !phone || !address || !email) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Số điện thoại không hợp lệ.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không hợp lệ.");
            return;
        }
        // Kiểm tra số dư ví nếu chọn thanh toán bằng ví
        if (paymentMethod === "wallet") {
            const totalAmount = getTotalAmount();
            if (!wallet || wallet.balance < totalAmount) {
                alert("Số dư ví không đủ để thanh toán. Vui lòng nạp thêm tiền hoặc chọn thanh toán khi nhận hàng.");
                return;
            }
        }
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token'); // Thêm dòng này
            if (isMultipleItems) {
                // Xử lý nhiều sản phẩm
                for (const item of cartItems) {
                    await axios.post("https://tgdd-backend.onrender.com/api/orders", {
                        fullName,
                        email,
                        phone,
                        address,
                        productId: item.id,
                        productTitle: item.title,
                        productPrice: item.price,
                        quantity: item.quantity,
                        paymentMethod
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Thêm header
                        }
                    });
                }
            }
            else {
                // Xử lý 1 sản phẩm
                await axios.post("https://tgdd-backend.onrender.com/api/orders", {
                    fullName,
                    email,
                    phone,
                    address,
                    productId: product.id,
                    productTitle: product.title,
                    productPrice: product.price,
                    paymentMethod
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Thêm header
                    }
                });
            }
            alert(paymentMethod === "wallet"
                ? "Đặt hàng và thanh toán thành công! Số tiền đã được trừ từ ví."
                : "Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
            setFullName("");
            setEmail("");
            setPhone("");
            setAddress("");
            // Refresh wallet info nếu thanh toán bằng ví
            if (paymentMethod === "wallet") {
                fetchWalletInfo();
            }
        }
        catch (err) {
            console.error('Chi tiết lỗi:', err.response?.data); // Xem lỗi chi tiết
            alert("Đặt hàng thất bại. Vui lòng thử lại.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const displayData = isMultipleItems ? {
        title: `Đơn hàng (${cartItems?.length} sản phẩm)`,
        price: totalPrice,
        image: cartItems?.[0]?.image
    } : product;
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Home, {}), _jsxs("div", { className: "p-4 max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-center", children: "Thanh To\u00E1n \u0110\u01A1n H\u00E0ng" }), _jsxs("div", { className: "flex gap-12", children: [_jsx("div", { className: "w-1/2", children: isMultipleItems ? (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [_jsxs("h3", { className: "text-xl font-semibold mb-4", children: ["Danh s\u00E1ch s\u1EA3n ph\u1EA9m (", cartItems?.length, ")"] }), _jsx("div", { className: "space-y-4 max-h-96 overflow-y-auto", children: cartItems?.map((item) => (_jsxs("div", { className: "flex gap-4 p-4 border rounded-lg", children: [_jsx("img", { src: item.image, alt: item.title, className: "w-20 h-20 object-contain rounded" }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-sm", children: item.title }), _jsxs("p", { className: "text-red-600 font-bold", children: [formatPrice(item.price), "\u20AB"] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["S\u1ED1 l\u01B0\u1EE3ng: ", item.quantity] })] })] }, item.id))) }), _jsx("div", { className: "mt-4 pt-4 border-t", children: _jsxs("div", { className: "flex justify-between text-xl font-bold", children: [_jsx("span", { children: "T\u1ED5ng c\u1ED9ng:" }), _jsxs("span", { className: "text-red-600", children: [formatPrice(totalPrice), "\u20AB"] })] }) })] })) : (_jsx("img", { src: product?.image, alt: product?.title, className: "w-full rounded-lg shadow-lg" })) }), _jsxs("div", { className: "w-1/2 bg-white p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: isMultipleItems ? `Đơn hàng (${cartItems?.length} sản phẩm)` : product?.title }), !isMultipleItems && (_jsx("div", { className: "flex items-center gap-4 mb-4", children: _jsxs("span", { className: "text-red-500 text-2xl font-bold", children: [formatPrice(product?.price), "\u20AB"] }) })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-lg font-medium mb-2", children: "H\u1ECD v\u00E0 t\u00EAn" }), _jsx("input", { type: "text", className: "w-full p-3 border rounded-md shadow-sm", value: fullName, onChange: (e) => setFullName(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-lg font-medium mb-2", children: "Email" }), _jsx("input", { type: "email", className: "w-full p-3 border rounded-md shadow-sm", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-lg font-medium mb-2", children: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i" }), _jsx("input", { type: "text", className: "w-full p-3 border rounded-md shadow-sm", value: phone, onChange: (e) => setPhone(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-lg font-medium mb-2", children: "\u0110\u1ECBa ch\u1EC9 nh\u1EADn h\u00E0ng" }), _jsx("input", { type: "text", className: "w-full p-3 border rounded-md shadow-sm", value: address, onChange: (e) => setAddress(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-lg font-medium mb-4", children: "Ph\u01B0\u01A1ng th\u1EE9c thanh to\u00E1n" }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: `border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "cod"
                                                                    ? "border-blue-500 bg-blue-50"
                                                                    : "border-gray-200 hover:border-gray-300"}`, onClick: () => setPaymentMethod("cod"), children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", name: "paymentMethod", value: "cod", checked: paymentMethod === "cod", onChange: () => setPaymentMethod("cod"), className: "w-4 h-4 text-blue-600" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-green-600 text-lg", children: "\uD83D\uDCB5" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-800", children: "Thanh to\u00E1n khi nh\u1EADn h\u00E0ng" }), _jsx("p", { className: "text-sm text-gray-600", children: "Thanh to\u00E1n b\u1EB1ng ti\u1EC1n m\u1EB7t khi nh\u1EADn \u0111\u01B0\u1EE3c s\u1EA3n ph\u1EA9m" })] })] })] }) }), _jsx("div", { className: `border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "wallet"
                                                                    ? "border-purple-500 bg-purple-50"
                                                                    : "border-gray-200 hover:border-gray-300"}`, onClick: () => setPaymentMethod("wallet"), children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", name: "paymentMethod", value: "wallet", checked: paymentMethod === "wallet", onChange: () => setPaymentMethod("wallet"), className: "w-4 h-4 text-purple-600" }), _jsxs("div", { className: "flex items-center gap-3 flex-1", children: [_jsx("div", { className: "w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-purple-600 text-lg", children: "\uD83D\uDCB3" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold text-gray-800", children: "Thanh to\u00E1n b\u1EB1ng v\u00ED \u0111i\u1EC7n t\u1EED" }), _jsxs("p", { className: "text-sm text-gray-600", children: ["S\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i: ", _jsxs("span", { className: "font-semibold text-purple-600", children: [formatPrice(wallet?.balance || 0), "\u20AB"] })] })] }), wallet && wallet.balance < getTotalAmount() && (_jsx("div", { className: "text-red-500 text-sm font-medium", children: "Kh\u00F4ng \u0111\u1EE7 s\u1ED1 d\u01B0" }))] })] }) })] })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-lg font-semibold", children: "T\u1ED5ng thanh to\u00E1n:" }), _jsxs("span", { className: "text-2xl font-bold text-red-600", children: [formatPrice(getTotalAmount()), "\u20AB"] })] }), paymentMethod === "wallet" && wallet && wallet.balance >= getTotalAmount() && (_jsxs("div", { className: "mt-2 text-sm text-gray-600", children: ["S\u1ED1 d\u01B0 c\u00F2n l\u1EA1i sau thanh to\u00E1n: ", _jsxs("span", { className: "font-semibold text-green-600", children: [formatPrice(wallet.balance - getTotalAmount()), "\u20AB"] })] }))] }), _jsx("button", { onClick: handleOrder, className: `w-full ${isLoading || (paymentMethod === "wallet" && wallet && wallet.balance < getTotalAmount())
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-red-500 hover:bg-red-600'} text-white py-3 rounded-md text-lg transition-colors`, disabled: isLoading || (paymentMethod === "wallet" && wallet && wallet.balance < getTotalAmount()), children: isLoading ? 'Đang xử lý...' : 'Xác Nhận Đặt Hàng' })] })] })] })] }), _jsx(Footers, {})] }));
};
export default CartPayPage;
