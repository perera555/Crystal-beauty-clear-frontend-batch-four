import { TbTrash } from "react-icons/tb"
import getCart, { addToCart, getTotal, getTotalForlabeledPrice, removeFromCart } from "../../utilis/cart"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
    const [cartloaded, setCartLoded] = useState(false)
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (cartloaded == false) {
            const cart = getCart()
            setCart(cart)
            setCartLoded(true)
        }


    }, [cartloaded])
    return (
        <div className="w-full h-full flex justify-center p-[40px] ">
            <div className="w-[700px] ">
                {
                    cart.map(
                        (item, index) => {
                            return (
                                <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">
                                    <button onClick={() => {
                                        removeFromCart(item.productId)
                                        setCartLoded(false)
                                    }} className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer">
                                        <TbTrash className="" />
                                    </button>

                                    <img src={item.image} className="h-full aspect-square object-cover mr-4" />
                                    <div className="h-full max-w-[450px] w-[450px] overflow-hidden">
                                        <h1 className="text-lg font-bold">{item.name}</h1>
                                        <h1 className="text-lg text-gray-500">{item.altNames.join(" | ")}</h1>
                                        <h1 className="text-lg text-gray-500">{item.price.toFixed(2)}</h1>

                                    </div>
                                    <div className="h-full w-[100px] flex justify-center items-center mr-4">
                                        <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]" onClick={() => {
                                            addToCart(item, -1)
                                            setCartLoded(false)
                                        }}>-</button>
                                        <h1 className="text-xl ">{item.quantity}</h1>
                                        <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]" onClick={() => {
                                            addToCart(item, 1)
                                            setCartLoded(false)
                                        }}>+</button>
                                    </div>
                                    <div className="h-full w-[100px] flex justify-center items-center mr-2">
                                        <h1 className="text-xl  w-full text-end pr-2">LKR:{(item.price * item.quantity).toFixed(2)}</h1>

                                    </div>


                                </div>


                            )

                        }
                    )
                }
                <div className="w-full  flex justify-end">
                    <h1 className="w-full text-xl text-end pr-2">Total</h1>
                    <h1 className="w-full text-xl text-end pr-2">{getTotalForlabeledPrice().toFixed(2)}</h1>

                </div>
                <div className="w-full  flex justify-end">
                    <h1 className="w-full text-xl text-end pr-2">Discount</h1>
                    <h1 className="w-full text-xl border-b-[2px] text-end pr-2">{(getTotalForlabeledPrice() - getTotal()).toFixed(2)}</h1>

                </div>
                <div className="w-full  flex justify-end">
                    <h1 className="w-full text-xl text-end pr-2"> Net Total</h1>
                    <h1 className="w-full text-xl  text-end pr-2 border-b-[4px] border-double ">{getTotal().toFixed(2)}</h1>

                </div>
                <div className="w-full  flex justify-end mt-4">
                    <button className="w-[170px] text-xl text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-lg   cursor-pointer" onClick={() => {
                        navigate("/checkout",{
                            state:{
                               items: cart
                            }
                        })
                    }}>
                        CheckOut

                    </button>
                </div>


            </div>


        </div>
    )


}