import { Link } from "react-router-dom";

export default function AddProductForm() {
    return (
        <div className="w-full h-full rounded-lg flex flex-col justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col  items-center">
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>
                <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Product ID" />
                <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Product Name" />
                <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Alternative Names" />
                <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Price" />
                <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Labeled Price" />
                <textarea className="w-[400px] h-[100px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Description" />
                 <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Stock" />

                <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                    <Link to={"/admin/products"} className=" bg-red-500 rounded-lg text-white p-[10px] mr-[10px] w-[190px] h-[50px] text-center cursor-pointer hover:bg-red-600">Cancel</Link>
                    <button className="w-[180px] h-[50px] bg-green-500 rounded-lg text-white p-[10px]  cursor-pointer hover:bg-green-600">Add Product</button>

                </div>

            </div>

           
        </div>
    )
}