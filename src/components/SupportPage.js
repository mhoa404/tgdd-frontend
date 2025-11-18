import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Home from "./Home";
import Footers from "./Footers";
import Carousel from "./Carousel";
export default function SupportPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        topic: "Giao hàng",
        message: "",
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError("");
        console.log(" Gửi yêu cầu:", formData);
        try {
            const res = await fetch("https://tgdd-be.mhoa.id.vn/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            console.log(" Phản hồi từ server:", result);
            if (res.ok) {
                setSuccess(true);
                setFormData({ name: "", email: "", topic: "Giao hàng", message: "" });
            }
            else {
                setError(result.error || "Gửi thất bại. Vui lòng thử lại.");
            }
        }
        catch (err) {
            console.error("❌ Lỗi:", err);
            setError("Không thể kết nối đến server.");
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Home, {}), _jsx(Carousel, {}), _jsx("div", { className: "max-w-2xl mx-auto pt-10 pb-10 px-6", children: _jsxs("div", { className: "bg-white shadow-md rounded-xl p-6 relative", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Li\u00EAn h\u1EC7 h\u1ED7 tr\u1EE3" }), _jsx("p", { className: "mb-6 text-gray-600", children: "B\u1EA1n g\u1EB7p v\u1EA5n \u0111\u1EC1? H\u00E3y g\u1EEDi th\u00F4ng tin cho ch\u00FAng t\u00F4i \u0111\u1EC3 \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3 nhanh nh\u1EA5t." }), success && (_jsx("div", { className: "mb-4 text-green-600 font-semibold", children: "G\u1EEDi th\u00E0nh c\u00F4ng! Ch\u00FAng t\u00F4i s\u1EBD ph\u1EA3n h\u1ED3i s\u1EDBm nh\u1EA5t." })), error && (_jsx("div", { className: "mb-4 text-red-600 font-semibold", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "text", name: "name", placeholder: "H\u1ECD v\u00E0 t\u00EAn", value: formData.name, onChange: handleChange, required: true, className: "w-full border border-gray-300 p-2 rounded-md" }), _jsx("input", { type: "email", name: "email", placeholder: "Email", value: formData.email, onChange: handleChange, required: true, className: "w-full border border-gray-300 p-2 rounded-md" }), _jsxs("select", { name: "topic", value: formData.topic, onChange: handleChange, className: "w-full border border-gray-300 p-2 rounded-md", children: [_jsx("option", { children: "Giao h\u00E0ng" }), _jsx("option", { children: "Thanh to\u00E1n" }), _jsx("option", { children: "S\u1EA3n ph\u1EA9m" }), _jsx("option", { children: "Kh\u00E1c" })] }), _jsx("textarea", { name: "message", placeholder: "M\u00F4 t\u1EA3 v\u1EA5n \u0111\u1EC1 b\u1EA1n g\u1EB7p ph\u1EA3i...", value: formData.message, onChange: handleChange, required: true, className: "w-full border border-gray-300 p-2 rounded-md h-32" }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700", children: "G\u1EEDi h\u1ED7 tr\u1EE3" })] })] }) }), _jsx(Footers, {})] }));
}
