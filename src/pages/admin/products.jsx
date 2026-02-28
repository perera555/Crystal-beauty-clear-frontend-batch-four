import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link,  useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(
        () => {
            if (!loaded) {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product")
                    .then(response => {

                        setProducts(response.data.products);

                        setLoaded(true);
                    })
                    .catch(error => {
                        console.error("Error fetching products:", error);
                    });
            }
        }, [loaded]
    );

    async function deleteProduct(Id) {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please logged in to delete a product");
            return;
        }

        try {
            await axios.delete(
                import.meta.env.VITE_BACKEND_URL + "/api/product/" + Id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLoaded(false);
            toast.success("Product deleted successfully");

        } catch (error) {
            toast.error("Error deleting product: " + error);
            return;
        }
    }

    return (
        <div className="w-full h-full rounded-lg relative">
            <Link
                to={"/admin/addProduct"}
                className="text-white bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 absolute bottom-5 right-5"
            >
                <FaPlus />
            </Link>

            {loaded && <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map((product, index) => {
                            return (
                                <tr key={index} className="border-b border-gray-300 text-center cursor-pointer hover:bg-gray-100">
                                    <td className="p-2">{product.productId}</td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">{product.price}</td>
                                    <td className="p-2">{product.labeledPrice}</td>
                                    <td className="p-2">{product.stock}</td>
                                    <td className="p-2">
                                        <div className="w-full h-full flex justify-center">
                                            <FaRegTrashAlt
                                                onClick={() => {
                                                    deleteProduct(product.productId)
                                                }}
                                                className="text-[20px] m-[10px] hover:text-red-500 cursor-pointer"
                                            />
                                            <GrEdit 
                                                onClick={() => {
                                                    navigate("/admin/editProduct",{
                                                        state: product

                                                    });
                                                    
                                                }}
                                                className="text-[20px] m-[10px] hover:text-blue-500 cursor-pointer" />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>}
            {
                !loaded&& 
                <Loader/>
            }
        </div>
    )
}