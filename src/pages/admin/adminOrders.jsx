import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [modelIsDisplaying, setModelIsDiplaying] = useState(false)
    const [displayingorder, setDisplayingOrder] = useState([])

    useEffect(() => {

        if (!loaded) {

            const token = localStorage.getItem("token")

            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {

                setOrders(response.data.orders)
                setLoaded(true)

            })
        }

    }, [loaded])

    function changeOrderStatus(orderId,status){
          const token = localStorage.getItem("token")

            axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/" +orderId, {
                status:status 
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {

               toast.success("order status changed Sucessfully")
               
               setLoaded(false)

            })


    }

    return (
        <div className="w-full h-full">
            {
                loaded ? (
                    <div className="w-full h-full">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>OrderID</th>
                                    <th>Customer Email</th>
                                    <th>Customer Name</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order) => {
                                        return (
                                            <tr
                                                key={order.orderId}
                                               

                                                className="border-b border-gray-300 text-center cursor-pointer hover:bg-gray-100"
                                            >
                                                <td>{order.orderId}</td>
                                                <td className="p-2">{order.email}</td>
                                                <td className="p-2">{order.name}</td>
                                                <td className="p-2">{order.address}</td>
                                                <td className="p-2">{order.phoneNumber}</td>
                                                <td className="p-2">
                                                    <select value={order.status} onChange={
                                                        (e)=>{
                                                            changeOrderStatus(order.orderId, e.target.value)

                                                        }
                                                    }>
                                                        <option value={"Pending"}>Pending</option>
                                                        <option value={"Delivered"}>Delivered</option>
                                                        <option value={"Cancel"}>Cancel</option>
                                                        <option value={"Processing"}>Processing</option>

                                                    </select>

                                                </td>
                                                <td className="p-2">{order.total.toFixed(2)}</td>
                                                <td className="p-2">{new Date(order.date).toDateString()}</td>
                                                <td>
                                                    <button className="bg-gray-700 text-white p-2 rounded-lg"  onClick={() => {
                                                    setModelIsDiplaying(true)
                                                    setDisplayingOrder(order)
                                                }}>
Details
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        {
                            modelIsDisplaying &&
                            <div className="fixed bg-[#00000070] w-full h-full top-0 left-0  flex justify-center items-center">
                                <div className="w-[600px] max-w-[600px]  h-[600px] max-h-[600px] bg-white relative">
                                    <div className="w-full h-[150px] ">
                                        <h1 className="text-sm font-bold p-2"> Order ID:{displayingorder.orderId}</h1>
                                        <h1 className="text-sm font-bold  p-2"> Order Date:{new Date(displayingorder.date).toDateString()}</h1>
                                        <h1 className="text-sm font-bold  p-2"> Order Status:{displayingorder.status}</h1>
                                        <h1 className="text-sm font-bold  p-2"> Order Total:{displayingorder.total.toFixed(2)}</h1>
                                    </div>
                                    <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">
                                        {
                                            displayingorder.billItems.map((item, index) => {
                                                return (
                                                    <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">
                                                        <img src={item.image} className="h-full aspect-square object-cover" />
                                                        <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                                            <h1 className="text-xl font-bold">{item.productName}</h1>
                                                            <h1 className="text-xl text-gray-500">LKR:{item.price.toFixed(2)}</h1>
                                                            <h1 className="text-xl text-gray-500">Quantity:{item.quantity}</h1>

                                                        </div>

                                                    </div>
                                                )

                                            })
                                        }

                                    </div>
                                    <button className="w-[40px] h-[40px] absolute right-[-20px] top-[-20px]  rounded-full  bg-white shadow shadow-black flex justify-center items-center " onClick={() => {
                                        setModelIsDiplaying(false)


                                    }}>
                                        <IoMdClose />
                                    </button>
                                </div>

                            </div>

                        }
                    </div>
                ) : (
                    <Loader />
                )
            }
        </div>
    )
}
