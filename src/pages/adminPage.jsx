import { Link, Route, Routes } from "react-router-dom";
import { FaFileInvoice, FaUsers } from "react-icons/fa6";
import { MdWarehouse } from "react-icons/md";
import AdminProductsPage from "./admin/products";
import AddProductPage from "./addProductForm";

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="h-full w-[300px] ">
                <Link to="/admin/products" className="w-full h-[50px]  rounded-lg flex  items-center m-[5px] cursor-pointer"><MdWarehouse  className="mr-2"/>Products</Link>
                <Link to="/admin/orders" className="w-full h-[50px]  rounded-lg  flex  items-center m-[5px] cursor-pointer"><FaFileInvoice className="mr-2" />Orders</Link>
                <Link to="/admin/users" className="w-full h-[50px]  rounded-lg  flex  items-center m-[5px] cursor-pointer  "><FaUsers className="mr-2" />Users</Link>


            </div>
            <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg">
                <Routes path="/*">
                    <Route path="/products" element={<AdminProductsPage/>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/addProduct" element={<AddProductPage/>} />
                </Routes>

            </div>

        </div>

    )
}