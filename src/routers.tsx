import React, { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import { AppContext } from "./contexts/app.context";
import path from "./constants/path";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function ProtectedRoute() {
	const { isAuthenticated } = useContext(AppContext);
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
	const { isAuthenticated } = useContext(AppContext);
	return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default function AppRoutes() {
	const routeElements = useRoutes([
		{
			path: "",
			element: <MainLayout />,
			children: [
				{
					path: "",
					index: true,
					element: <HomePage />,
				},
				{
					path: path.productList,
					element: <ProductList />,
				},
				{
					path: path.productDetail,
					element: <ProductDetail />,
				},
				{
					element: <ProtectedRoute />,
					children: [
						{
							path: path.profile,
							element: <Profile />,
						},
						{
							path: path.cart,
							element: <Cart />,
						},
					],
				},

				{
					element: <RejectedRoute />,
					children: [
						{
							path: path.login,
							element: <LoginPage />,
						},
						{
							path: path.register,
							element: <RegisterPage />,
						},
					],
				},
			],
		},
	]);

	return routeElements;
}
