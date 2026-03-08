import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ForgetPassword(){

    const [email,setEmail] = useState("")
    const [otp,setOTP] = useState("")
    const [emailSent,setEmailSent] = useState(false)
    const [password,setPassword] = useState("")
    const [confirmpassword,setConfirmPassword] = useState("")



    function sendEmail(){

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendOTP",{
            email:email
        })

        .then((response)=>{
            console.log(response.data)
            setEmailSent(true)
            toast.success("OTP Sent Successfully")
        })

        .catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
        })

    }



    function resetPassword(){

        if(password !== confirmpassword){
            toast.error("Passwords do not match")
            return
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/resetPassword",{
            email:email,
            otp:otp,
            password:password
        })

        .then(()=>{
            toast.success("Password Reset Successfully")
        })

        .catch(()=>{
            toast.error("Reset Failed")
        })

    }



    return(

    <div className="w-full h-screen bg-gray-200 flex p-2">

        {emailSent ?

        <div className="w-full h-full flex items-center justify-center">

            <div className="bg-white p-4 rounded shadow-md w-[400px]">

                <h1 className="text-xl font-bold mb-4">Reset Password</h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        OTP
                    </label>

                    <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={otp}
                    onChange={(e)=>setOTP(e.target.value)}
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>

                    <input
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>

                    <input
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={confirmpassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                </div>


                <button
                onClick={resetPassword}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                Reset Password
                </button>

            </div>

        </div>

        :

        <div className="w-full h-full flex items-center justify-center">

            <div className="bg-white p-4 rounded shadow-md w-[400px]">

                <h1 className="text-2xl font-bold mb-4">Forget Password</h1>

                <div className="mb-4">

                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />

                </div>


                <button
                onClick={sendEmail}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-500"
                >
                Send OTP
                </button>

            </div>

        </div>

        }

    </div>

    )
}