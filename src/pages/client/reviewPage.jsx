import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Loader from "../../components/loader"
import toast from "react-hot-toast"
import Header from "../../components/header"

export default function ReviewPage() {
  const { id } = useParams()

  const [reviews, setReviews] = useState([])
  const [status, setStatus] = useState("loading")

  const [customerName, setCustomerName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const BASE_URL = import.meta.env.VITE_BACKEND_URL

  const loadReviews = () => {
    const url = id
      ? `${BASE_URL}/api/reviews/${id}`
      : `${BASE_URL}/api/reviews`

    axios.get(url)
      .then((res) => {
        setReviews(res.data?.reviews || [])
        setStatus("loaded")
      })
      .catch((err) => {
        console.log(err.response?.data || err.message)
        setStatus("error")
      })
  }

  useEffect(() => {
    loadReviews()
  }, [id])

  const handleSubmit = () => {
    if (!id) return toast.error("Open a product first")
    if (!customerName || !comment) return toast.error("Fill all fields")

    const formData = new FormData()
    formData.append("productId", id)
    formData.append("customerName", customerName)
    formData.append("rating", Number(rating))
    formData.append("comment", comment)
    if (image) formData.append("image", image)

    axios.post(`${BASE_URL}/api/reviews`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`
      }
    })
      .then((res) => {
        toast.success("Review added 🎉")

        setCustomerName("")
        setRating(5)
        setComment("")
        setImage(null)
        setPreview(null)

        loadReviews()
      })
      .catch((err) => {
        console.log(err.response?.data || err.message)
        toast.error(err.response?.data?.message || "Failed to add review")
      })
  }

  const getImageUrl = (img) => {
    if (!img) return null
    if (img.startsWith("http")) return img
    return `${BASE_URL}/${img.replace(/\\/g, "/")}`
  }

  const StarRating = ({ value, onChange }) => (
    <div className="flex gap-2 mb-4 justify-center">
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={`cursor-pointer text-3xl transition transform hover:scale-125 ${
            star <= value ? "text-yellow-400 drop-shadow" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  )

  if (status === "loading") return <Loader />
  if (status === "error") return <h1 className="text-center mt-10 text-red-500">Error loading reviews</h1>

  return (
    <>
      <Header />

      <div className="pt-24 px-4 md:px-10 min-h-screen bg-gradient-to-br from-pink-50 to-white">

        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {id ? "Product Reviews" : "All Reviews"}
        </h1>

        {id && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-12">
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your Name"
              className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <StarRating value={rating} onChange={setRating} />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="file"
              className="w-full mb-4 text-sm"
              onChange={(e) => {
                const file = e.target.files[0]
                setImage(file)
                if (file) setPreview(URL.createObjectURL(file))
              }}
            />

            {preview && (
              <img
                src={preview}
                className="w-32 h-32 object-cover rounded-lg mt-2 border"
              />
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 mt-4 rounded-lg font-semibold hover:scale-[1.02] transition shadow-md"
            >
              Submit Review
            </button>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  {r.customerName}
                </h3>
                <p className="text-yellow-400 text-lg">
                  {"★".repeat(r.rating)}
                </p>
              </div>

              <p className="text-gray-600">{r.comment}</p>

              {getImageUrl(r.image) && (
                <img
                  src={getImageUrl(r.image)}
                  className="w-40 h-40 object-cover rounded-lg mt-4 border"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </>
  )
}