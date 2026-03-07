import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaFileInvoice, FaUsers } from "react-icons/fa6";
import { MdWarehouse } from "react-icons/md";
import AdminProductsPage from "./admin/products";
import AddProductPage from "./addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminOrders from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import toast from "react-hot-toast";

export default function AdminPage() {

    const [uservalidated, setUserValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token == null || user == null) {
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

    return (

        <div className="w-full h-screen bg-gray-200 flex p-2">

            {uservalidated ? (
                <>
                    <div className="h-full w-[300px]">

                        <Link
                            to="/admin/products"
                            className="w-full h-[50px] rounded-lg flex items-center m-[5px] cursor-pointer"
                        >
                            <MdWarehouse className="mr-2" />
                            Products
                        </Link>

                        <Link
                            to="/admin/orders"
                            className="w-full h-[50px] rounded-lg flex items-center m-[5px] cursor-pointer"
                        >
                            <FaFileInvoice className="mr-2" />
                            Orders
                        </Link>

                        <Link
                            to="/admin/users"
                            className="w-full h-[50px] rounded-lg flex items-center m-[5px] cursor-pointer"
                        >
                            <FaUsers className="mr-2" />
                            Users
                        </Link>

                    </div>

                    <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg">

                        <Routes>
                            <Route path="/products" element={<AdminProductsPage />} />
                            <Route path="/orders" element={<AdminOrders />} />
                            <Route path="/users" element={<h1>Users</h1>} />
                            <Route path="/addProduct" element={<AddProductPage />} />
                            <Route path="/editProduct" element={<EditProductForm />} />
                        </Routes>

                    </div>
                </>
            ) : (
                <Loader />
            )}

        </div>
    );
}