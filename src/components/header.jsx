import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Header() {
    const [isopen, setIsOpen] = useState(true)
    return (
        <header className="h-[70px] w-full flex justify-start items-center bg-gray-100 relative ">
            <RxHamburgerMenu className=" lg:hidden text-3xl text-accent mx-4" onClick={()=>{
                setIsOpen(true)
            }} />
            <div className="hidden lg:flex w-[500px] h-full items-center justify-evenly text-accent text-xl">
                <Link to="/">HOME</Link>
                <Link to="/products">PRODUCTS</Link>
                <Link to="/about">ABOUT</Link>
                <Link to="/contact">CONTACT</Link>
                <Link to="/reviews">REVIEWS</Link>
                <Link to="/cart" className="absolute right-[30px] text-3xl"><BsCart4 /></Link>


            </div>
            {
                isopen && (
                    <div className="fixed top-0 left-0 z-[9999] bg-[#00000060] w-full h-screen flex">
                        <div className="w-[300px] h-full bg-white  flex flex-col justify-start items-start">
                            <RxHamburgerMenu className="text-3xl text-accent " onClick={() => {
                                setIsOpen(false)
                            }} />
                            <Link to="/" className="text-xl text-accent my-4" >HOME</Link>
                            <Link to="/products" className="text-xl text-accent my-4" >PRODUCTS</Link>
                            <Link to="/about" className="text-xl text-accent my-4" >ABOUT</Link>
                            <Link to="/contact" className="text-xl text-accent my-4" >CONTACT</Link>
                            <Link to="/reviews" className="text-xl text-accent my-4" >REVIEWS</Link>
                            <Link to="/cart" className="text-xl text-accent my-4">Cart</Link>
                       
                        </div>

                    </div>

                )
            }


        </header>
    )
} 