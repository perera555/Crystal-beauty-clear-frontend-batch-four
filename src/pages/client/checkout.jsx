import { TbTrash } from "react-icons/tb"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

export default function CheckoutPage() {
    const location = useLocation()


    // ✅ FIXED: Do NOT wrap in []
    const [cart, setCart] = useState(location.state?.items || [])
    const [cartRefresh, setCartRefresh] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate()

    function placeOrder() {
        const orderData = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            billItems: []
        }
        for (let i = 0; i < cart.length; i++) {
            orderData.billItems[i] = {
                productId: cart[i].productId,
                quantity: cart[i].quantity
            }
        }
        const token = localStorage.getItem("token")
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(() => {
                toast.success("Order Placed Successfully")
                navigate("/")
            }).catch((error) => {
                console.log(error)
                toast.error("Order Placement failed")
            })

    }

    function getTotal() {
        let total = 0
        cart.forEach((product) => {
            total += product.price * product.quantity
        })
        return total

    }
    function getTotalForlabeledPrice() {
        let total = 0
        cart.forEach((product) => {
            total += product.labeledPrice * product.quantity
        })
        return total
    }

    return (
        <div className="w-full h-full flex justify-center p-[40px] ">
            <div className="w-[700px] ">
                {
                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">

                                <button
                                    onClick={() => {
                                        const newcart = cart.filter(
                                            (product) => product.productId !== item.productId
                                        )
                                        setCart(newcart)


                                    }}
                                    className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer"
                                >
                                    <TbTrash />
                                </button>

                                <img
                                    src={item.image}
                                    className="h-full aspect-square object-cover mr-4"
                                />

                                <div className="h-full max-w-[450px] w-[450px] overflow-hidden">
                                    <h1 className="text-lg font-bold">{item.name}</h1>

                                    {/* ✅ SAFE JOIN */}
                                    <h1 className="text-lg text-gray-500">
                                        {item.altNames ? item.altNames.join(" | ") : ""}
                                    </h1>

                                    <h1 className="text-lg text-gray-500">
                                        {item.price?.toFixed(2)}
                                    </h1>
                                </div>

                                <div className="h-full w-[100px] flex justify-center items-center mr-4">
                                    <button
                                        className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                        onClick={() => {
                                            const newcart = [...cart]
                                            newcart[index].quantity -= 1
                                            if (newcart[index].quantity <= 0)
                                                newcart[index].quantity = 1
                                            setCart(newcart)
                                            setCartRefresh(!cartRefresh)

                                        }}
                                    >
                                        -
                                    </button>

                                    <h1 className="text-xl ">
                                        {item.quantity}
                                    </h1>

                                    <button
                                        className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                        onClick={() => {
                                            const newcart = [...cart]
                                            newcart[index].quantity += 1
                                            setCart(newcart)
                                            setCartRefresh(!cartRefresh)

                                        }}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="h-full w-[100px] flex justify-center items-center mr-2">
                                    <h1 className="text-xl w-full text-end pr-2">
                                        LKR:{(item.price * item.quantity).toFixed(2)}
                                    </h1>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="w-full flex justify-end">
                    <h1 className="w-full text-xl text-end pr-2">Total</h1>
                    <h1 className="w-full text-xl text-end pr-2">
                        {getTotalForlabeledPrice().toFixed(2)}
                    </h1>
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-full text-xl text-end pr-2">Discount</h1>
                    <h1 className="w-full text-xl border-b-[2px] text-end pr-2">
                        {(getTotalForlabeledPrice() - getTotal()).toFixed(2)}
                    </h1>
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-full text-xl text-end pr-2"> Net Total</h1>
                    <h1 className="w-full text-xl text-end pr-2 border-b-[4px] border-double">
                        {getTotal().toFixed(2)}
                    </h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2"> Name</h1>
                    <input value={name} onChange={(e) => { setName(e.target.value) }} className="w-[200px] text-xl border-b-[2px] text-end pr-2" type="text" />
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2"> Phone</h1>
                    <input value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} className="w-[200px] text-xl border-b-[2px] text-end pr-2" type="text" />
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2"> Address</h1>
                    <input value={address} onChange={(e) => { setAddress(e.target.value) }} className="w-[200px] text-xl border-b-[2px] text-end pr-2" type="text" />
                </div>


                <div className="w-full flex justify-end mt-4">
                    <button
                        className="w-[170px] text-xl text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>

            </div>
        </div>
    )
}