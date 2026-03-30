import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import Header from "../../components/header"
import { addToCart } from "../../utilis/cart"

export default function ProductOverview() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState("loading")

  useEffect(() => {

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id)
      .then((res) => {

        // ✅ Ensure product exists
        if (!res.data || !res.data.product) {
          throw new Error("Product not found")
        }

        setProduct(res.data.product)
        setStatus("loaded")

      })
      .catch((err) => {

        console.log(err)
        toast.error("Product not found")
        setStatus("error")

      })

  }, [id])

  if (status === "loading") {
    return (
      <>
        <Header />
        <div className="w-full flex justify-center mt-20">
          <Loader />
        </div>
      </>
    )
  }

  if (status === "error" || !product) {
    return (
      <>
        <Header />
        <div className="w-full flex justify-center mt-20">
          <h1 className="text-2xl text-red-500">Error loading product</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="w-full flex flex-col lg:flex-row">

        {/* PRODUCT IMAGE */}
        <div className="lg:w-1/2">
          <ImageSlider images={product.images || []} />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="lg:w-1/2 p-10">

          <h1 className="text-3xl font-bold mb-6">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-6">
            {product.description}
          </p>

          <h2 className="text-2xl mb-6 text-pink-700 font-semibold">
            LKR {product.price}
          </h2>

          <div className="flex gap-4 flex-wrap">

            <button
              className="bg-pink-700 text-white px-6 py-3 rounded hover:bg-pink-800 transition"
              onClick={() => {
                addToCart(product, 1)
                toast.success("Added to cart")
              }}
            >
              Add To Cart
            </button>

            <button
              className="bg-pink-700 text-white px-6 py-3 rounded hover:bg-pink-800 transition"
              onClick={() => {
                navigate("/checkout", {
                  state: {
                    items: [
                      {
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        // ✅ SAFE IMAGE ACCESS
                        image: product.images?.[0] || "",
                        quantity: 1
                      }
                    ]
                  }
                })
              }}
            >
              Buy Now
            </button>

            <button
              className="border border-pink-700 text-pink-700 px-6 py-3 rounded hover:bg-pink-700 hover:text-white transition"
              onClick={() => {
                navigate(`/reviews/${product._id}`)
              }}
            >
              Reviews
            </button>

          </div>

        </div>

      </div>
    </>
  )
}