import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MediaUpload from "../utilis/mediaUpload";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    async function handleASubmit() {

        const promiseArray = [];
        for (let i = 0; i < images.length; i++) {
            const promsise = MediaUpload(images[i]);
            promiseArray[i] = promsise;

        }

        try {


            const result = await Promise.all(promiseArray);
            console.log(result);


            const altNamesInArray = altNames.split(",")

            const product = {
                productId: productId,
                name: name,
                altNames: altNamesInArray,
                price: price,
                labeledPrice: labeledPrice,
                description: description,
                stock: stock,
                images: result
            }
            const token = localStorage.getItem("token");
            console.log(token);
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Product added successfully");
            navigate("/admin/products");
        } catch (error) {
            toast.error("Error uploading images: " + error);

        }

    }
    return (
        <div className="w-full h-full rounded-lg flex flex-col justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col  items-center">
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>
                <input value={productId}
                    onChange={
                        (e) => {
                            setProductId(e.target.value)

                        }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Product ID" />
                <input value={name} onChange={
                    (e) => {
                        setName(e.target.value)

                    }} className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Product Name" />
                <input value={altNames} onChange={
                    (e) => {
                        setAltNames(e.target.value)


                    }} className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="text" placeholder="Alternative Names" />
                <input value={price} onChange={
                    (e) => {
                        setPrice(e.target.value)

                    }} className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="number" placeholder="Price" />
                <input value={labeledPrice} onChange={
                    (e) => {
                        setLabeledPrice(e.target.value)

                    }} className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="number" placeholder="Labeled Price" />
                <textarea value={description} onChange={
                    (e) => {
                        setDescription(e.target.value)

                    }} className="w-[400px] h-[100px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Description" />


                <input onChange={
                    (e) => {
                        setImages(e.target.files)

                    }} multiple className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="file" placeholder="Images (comma separated URLs)" />



                <input value={stock} onChange={
                    (e) => {
                        setStock(e.target.value)

                    }} className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" type="number" placeholder="Stock" />

                <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                    <Link to={"/admin/products"} className=" bg-red-500 rounded-lg text-white p-[10px] mr-[10px] w-[190px] h-[50px] text-center cursor-pointer hover:bg-red-600">Cancel</Link>
                    <button onClick={handleASubmit} className="w-[180px] h-[50px] bg-green-500 rounded-lg text-white p-[10px]  cursor-pointer hover:bg-green-600">Add Product</button>

                </div>

            </div>


        </div>
    )
} 
