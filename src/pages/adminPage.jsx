import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { FaFileInvoice, FaUsers } from "react-icons/fa6";
import { MdWarehouse, MdDashboard } from "react-icons/md";
import AdminProductsPage from "./admin/products";
import AddProductPage from "./addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminOrders from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import AdminUsersPage from "./admin/adminUser";
import AdminDashboard from "./admin/dashboard";

export default function AdminPage() {

    const [uservalidated, setUserValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
            toast.error("You are not logged in");
            navigate("/login");
            return;
        }

        if (user.role === "admin") {
            setUserValidated(true);
        } else {
            toast.error("You are not an admin");
            navigate("/login");
        }

    }, []);

    function navClass(path) {
        return `flex items-center gap-2 px-4 h-[45px] rounded-lg cursor-pointer transition 
        ${location.pathname.includes(path) ? "bg-primary text-white" : "hover:bg-gray-200"}`
    }

    return (

        <div className="w-full h-screen flex bg-gray-100">

            {uservalidated ? (
                <>
                    {/* 🔥 LEFT SIDEBAR */}
                    <div className="w-[260px] h-full bg-white shadow-lg flex flex-col p-3">

                        <h1 className="text-xl font-bold mb-6 px-2">Admin Panel</h1>

                        <Link to="/admin/dashboard" className={navClass("dashboard")}>
                            <MdDashboard />
                            Dashboard
                        </Link>

                        <Link to="/admin/products" className={navClass("products")}>
                            <MdWarehouse />
                            Products
                        </Link>

                        <Link to="/admin/orders" className={navClass("orders")}>
                            <FaFileInvoice />
                            Orders
                        </Link>

                        <Link to="/admin/users" className={navClass("users")}>
                            <FaUsers />
                            Users
                        </Link>

                    </div>

                    {/* 🔥 RIGHT CONTENT */}
                    <div className="flex-1 h-full overflow-y-auto">

                        {/* Top Bar */}
                        <div className="w-full h-[60px] bg-white shadow flex items-center px-6">
                            <h2 className="text-lg font-semibold capitalize">
                                {location.pathname.split("/")[2] || "dashboard"}
                            </h2>
                        </div>

                        {/* Page Content */}
                        <div className="p-6">

                            <Routes>

                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="" element={<AdminDashboard />} />

                                <Route path="products" element={<AdminProductsPage />} />
                                <Route path="orders" element={<AdminOrders />} />
                                <Route path="users" element={<AdminUsersPage />} />
                                <Route path="addProduct" element={<AddProductPage />} />
                                <Route path="editProduct" element={<EditProductForm />} />

                            </Routes>

                        </div>

                    </div>
                </>
            ) : (
                <Loader />
            )}

        </div>
    );
}