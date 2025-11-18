import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        role: '',
        phone: '',
        address: '',
        birth_date: '',
        gender: '',
        avatar: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        first_name: '', last_name: '', email: '', password: '', role: 'user', phone: '', gender: ''
    });
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('https://tgdd-be.mhoa.id.vn/api/admin/users', {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setUsers(res.data || []);
        }
        catch (err) {
            console.error(err);
        }
    };
    useEffect(() => { fetchUsers(); }, []);
    const startEdit = (u) => {
        setEditingId(u.id);
        setForm({
            first_name: u.first_name || '',
            last_name: u.last_name || '',
            role: u.role || '',
            phone: u.phone || '',
            address: u.address || '',
            birth_date: u.birth_date ? u.birth_date.split('T')[0] : '',
            gender: u.gender || '',
            avatar: u.avatar || ''
        });
    };
    const cancelEdit = () => {
        setEditingId(null);
        setForm({ first_name: '', last_name: '', role: '', phone: '', address: '', birth_date: '', gender: '', avatar: '' });
    };
    const saveEdit = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`https://tgdd-be.mhoa.id.vn/api/admin/users/${id}`, form, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            await fetchUsers();
            cancelEdit();
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm('Xác nhận xoá người dùng?'))
            return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://tgdd-be.mhoa.id.vn/api/admin/users/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            await fetchUsers();
        }
        catch (err) {
            console.error(err);
        }
    };
    const createUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://tgdd-be.mhoa.id.vn/api/admin/users', newUser, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setNewUser({ first_name: '', last_name: '', email: '', password: '', role: 'user', phone: '', gender: '' });
            await fetchUsers();
            alert('Tạo user thành công');
        }
        catch (err) {
            console.error(err);
            alert(err?.response?.data?.error || 'Lỗi khi tạo người dùng');
        }
    };
    return (_jsxs("div", { className: "bg-white p-6 rounded-xl shadow-lg border", children: [_jsx("button", { onClick: () => setShowForm(!showForm), className: "w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition", children: showForm ? " Ẩn form tạo người dùng" : " Thêm người dùng" }), showForm && (_jsxs("form", { onSubmit: createUser, className: "mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-lg border shadow-inner", children: [_jsx("input", { required: true, placeholder: "H\u1ECD", value: newUser.first_name, onChange: (e) => setNewUser({ ...newUser, first_name: e.target.value }), className: "px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" }), _jsx("input", { required: true, placeholder: "T\u00EAn", value: newUser.last_name, onChange: (e) => setNewUser({ ...newUser, last_name: e.target.value }), className: "px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" }), _jsx("input", { required: true, placeholder: "Email", type: "email", value: newUser.email, onChange: (e) => setNewUser({ ...newUser, email: e.target.value }), className: "px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" }), _jsx("input", { required: true, placeholder: "M\u1EADt kh\u1EA9u", type: "password", value: newUser.password, onChange: (e) => setNewUser({ ...newUser, password: e.target.value }), className: "px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" }), _jsxs("select", { value: newUser.role, onChange: (e) => setNewUser({ ...newUser, role: e.target.value }), className: "px-3 py-2 rounded border border-gray-300", children: [_jsx("option", { value: "user", children: "User" }), _jsx("option", { value: "admin", children: "Admin" })] }), _jsx("input", { placeholder: "Phone", value: newUser.phone, onChange: (e) => setNewUser({ ...newUser, phone: e.target.value }), className: "px-3 py-2 rounded border border-gray-300" }), _jsxs("select", { value: newUser.gender, onChange: (e) => setNewUser({ ...newUser, gender: e.target.value }), className: "px-3 py-2 rounded border border-gray-300", children: [_jsx("option", { value: "", children: "--Gender--" }), _jsx("option", { value: "male", children: "Nam" }), _jsx("option", { value: "female", children: "N\u1EEF" }), _jsx("option", { value: "other", children: "Kh\u00E1c" })] }), _jsx("button", { type: "submit", className: "col-span-1 md:col-span-4 bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition", children: "\u2714 X\u00E1c nh\u1EADn th\u00EAm ng\u01B0\u1EDDi d\u00F9ng" })] })), _jsx("div", { className: "overflow-x-auto mt-6", children: _jsxs("table", { className: "w-full border rounded-lg overflow-hidden", children: [_jsx("thead", { className: "bg-blue-600 text-white", children: _jsxs("tr", { children: [_jsx("th", { className: "py-2 px-3", children: "ID" }), _jsx("th", { className: "px-3", children: "Email" }), _jsx("th", { className: "px-3", children: "H\u1ECD" }), _jsx("th", { className: "px-3", children: "T\u00EAn" }), _jsx("th", { className: "px-3", children: "Role" }), _jsx("th", { className: "px-3", children: "Phone" }), _jsx("th", { className: "px-3", children: "Gender" }), _jsx("th", { className: "px-3 text-center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { children: [users.map((u) => (_jsxs("tr", { className: "border-t hover:bg-gray-50 transition", children: [_jsx("td", { className: "py-2 px-3", children: u.id }), _jsx("td", { className: "px-3", children: u.email }), _jsx("td", { className: "px-3", children: editingId === u.id ? (_jsx("input", { value: form.first_name, onChange: (e) => setForm({ ...form, first_name: e.target.value }), className: "px-2 py-1 rounded border" })) : u.first_name }), _jsx("td", { className: "px-3", children: editingId === u.id ? (_jsx("input", { value: form.last_name, onChange: (e) => setForm({ ...form, last_name: e.target.value }), className: "px-2 py-1 rounded border" })) : u.last_name }), _jsx("td", { className: "px-3", children: editingId === u.id ? (_jsxs("select", { value: form.role, onChange: (e) => setForm({ ...form, role: e.target.value }), className: "px-2 py-1 rounded border", children: [_jsx("option", { value: "user", children: "user" }), _jsx("option", { value: "admin", children: "admin" })] })) : u.role }), _jsx("td", { className: "px-3", children: editingId === u.id ? (_jsx("input", { value: form.phone, onChange: (e) => setForm({ ...form, phone: e.target.value }), className: "px-2 py-1 rounded border" })) : u.phone }), _jsx("td", { className: "px-3", children: editingId === u.id ? (_jsxs("select", { value: form.gender, onChange: (e) => setForm({ ...form, gender: e.target.value }), className: "px-2 py-1 rounded border", children: [_jsx("option", { value: "male", children: "male" }), _jsx("option", { value: "female", children: "female" }), _jsx("option", { value: "other", children: "other" })] })) : u.gender }), _jsx("td", { className: "py-2 px-3 text-center", children: editingId === u.id ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => saveEdit(u.id), className: "bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700", children: "\u2714 L\u01B0u" }), _jsx("button", { onClick: cancelEdit, className: "bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500", children: "\u2716 H\u1EE7y" })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => startEdit(u), className: "bg-yellow-400 px-3 py-1 rounded mr-2 hover:bg-yellow-500", children: "\u270F S\u1EEDa" }), _jsx("button", { onClick: () => handleDelete(u.id), className: "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600", children: "\uD83D\uDDD1 X\u00F3a" })] })) })] }, u.id))), users.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: "8", className: "py-3 text-center text-gray-600", children: "Kh\u00F4ng c\u00F3 ng\u01B0\u1EDDi d\u00F9ng" }) }))] })] }) })] }));
};
export default AdminUsers;
