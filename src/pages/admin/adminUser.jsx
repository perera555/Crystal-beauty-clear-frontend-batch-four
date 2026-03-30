import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

export default function AdminUsersPage() {

    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [modelIsDisplaying, setModelIsDiplaying] = useState(false)
    const [displayingUser, setDisplayingUser] = useState(null)

    // ✅ CURRENT TIME STATE
    const [currentTime, setCurrentTime] = useState(new Date())

    // ✅ LIVE CLOCK
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {

        if (!loaded) {

            const token = localStorage.getItem("token")

            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {

                setUsers(response.data.users || [])
                setLoaded(true)

            }).catch((error) => {
                console.log(error)
                toast.error("Failed to load users")
                setLoaded(true)
            })
        }

    }, [loaded])

    function changeUserRole(userId, role) {

        const token = localStorage.getItem("token")

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/users/" + userId, {
            role: role
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {

            toast.success("User role updated")
            setLoaded(false)

        }).catch(() => {
            toast.error("Failed to update role")
        })

    }

    return (
        <div className="w-full h-full p-4">

            {
                loaded ? (
                    <div className="w-full h-full bg-white rounded-xl shadow-md p-4">

                        <h1 className="text-2xl font-bold mb-4">Users Management</h1>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Role</th>
                                    <th className="p-3 text-left">Current Time</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    users.map((user) => {
                                        return (
                                            <tr
                                                key={user._id}
                                                className="border-b hover:bg-gray-100 transition"
                                            >

                                                {/* NAME */}
                                                <td className="p-3 font-medium">
                                                    {user.firstName || "N/A"} {user.lastName || ""}
                                                </td>

                                                <td className="p-3">{user.email}</td>

                                                {/* PHONE */}
                                                <td className="p-3">
                                                    {user.phone || "Not Provided"}
                                                </td>

                                                <td className="p-3">
                                                    <select
                                                        className="border rounded px-2 py-1"
                                                        value={user.role || "user"}
                                                        onChange={(e) => {
                                                            changeUserRole(user._id, e.target.value)
                                                        }}
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>

                                                {/* ✅ CURRENT DATE TIME */}
                                                <td className="p-3 text-gray-600">
                                                    {currentTime.toLocaleString()}
                                                </td>

                                                <td className="p-3">
                                                    <button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                                        onClick={() => {
                                                            setModelIsDiplaying(true)
                                                            setDisplayingUser(user)
                                                        }}
                                                    >
                                                        Details
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        {/* MODAL */}
                        {
                            modelIsDisplaying && displayingUser &&
                            <div className="fixed bg-black/50 w-full h-full top-0 left-0 flex justify-center items-center">

                                <div className="w-[500px] bg-white rounded-xl shadow-lg p-5 relative">

                                    <h2 className="text-xl font-bold mb-4">User Details</h2>

                                    <div className="space-y-2">
                                        <p><strong>Name:</strong> {displayingUser.firstName} {displayingUser.lastName}</p>
                                        <p><strong>Email:</strong> {displayingUser.email}</p>
                                        <p><strong>Phone:</strong> {displayingUser.phone || "N/A"}</p>
                                        <p><strong>Role:</strong> {displayingUser.role}</p>
                                        <p><strong>Current Time:</strong> {currentTime.toLocaleString()}</p>
                                    </div>

                                    <button
                                        className="absolute top-[-15px] right-[-15px] bg-white shadow rounded-full w-[40px] h-[40px] flex items-center justify-center"
                                        onClick={() => setModelIsDiplaying(false)}
                                    >
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