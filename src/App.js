import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footers from './components/Footers';
import Carousel from './components/Carousel';
import CategoryGrid from './components/CategoryGrid';
import FlashSale from './components/FlashSale';
import MallSection from './components/MallSection';
import Home from './components/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './service/PrivateRoute';
import CartPage from "./components/CartPage";
import CartPageView from "./components/CartPageView";
import ProductDetail from "./components/ProductDetail";
import ChatBotIcon from "./components/ChatBotIcon";
import CartPayPage from "./components/CartPayPage";
import SupportPage from "./components/SupportPage";
import PromoBanner from './components/PromoBanner';
import Profile from './pages/Profile';
import WalletPage from './components/WalletPage';
import OrderHistory from './components/OrderHistory';
import { useState } from 'react';
/*----------------------------------
Home Create
-----------------------------------*/
function HomePage() {
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(Carousel, {}), _jsx(CategoryGrid, {}), _jsx(PromoBanner, {}), _jsx(FlashSale, {}), _jsx(MallSection, {}), _jsx(Footers, {})] }));
}
/*----------------------------------
HomePage
-----------------------------------*/
function HomeLoggedInPage() {
    const [hasFilter, setHasFilter] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Home, { onFilterChange: setHasFilter }), !hasFilter && (_jsxs(_Fragment, { children: [_jsx(Carousel, {}), _jsx(CartPage, {})] })), _jsx(ChatBotIcon, {}), _jsx(Footers, {})] }));
}
/*----------------------------------
Router
-----------------------------------*/
function App() {
    return (_jsx(CartProvider, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/home", element: _jsx(HomeLoggedInPage, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPageView, {}) }), _jsx(Route, { path: "/product/:id", element: _jsx(ProductDetail, {}) }), _jsx(Route, { path: "/cartpay", element: _jsx(CartPayPage, {}) }), _jsx(Route, { path: "/support", element: _jsx(SupportPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/admin", element: _jsx(PrivateRoute, { children: _jsx(AdminPage, {}) }) }), _jsx(Route, { path: "/wallet", element: _jsx(WalletPage, {}) }), _jsx(Route, { path: "/orders", element: _jsx(OrderHistory, {}) })] }) }) }));
}
export default App;
