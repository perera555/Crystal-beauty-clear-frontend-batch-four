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

  // 🔄 Load reviews
  const loadReviews = () => {
    const url = id
      ? `${BASE_URL}/api/reviews/${id}`
      : `${BASE_URL}/api/reviews`

    axios.get(url)
      .then((res) => {
        setReviews(res.data.reviews || [])
        setStatus("loaded")
      })
      .catch(() => setStatus("error"))
  }

  useEffect(() => {
    loadReviews()
  }, [id])

  // 📤 Submit review with image
  const handleSubmit = () => {
    if (!id) return toast.error("Open a product first")
    if (!customerName || !comment) return toast.error("Fill all fields")

    const formData = new FormData()
    formData.append("productId", id)
    formData.append("customerName", customerName)
    formData.append("rating", rating)
    formData.append("comment", comment)
    if (image) formData.append("image", image)

    axios.post(`${BASE_URL}/api/reviews`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        toast.success("Review added 🎉")
        setCustomerName("")
        setRating(5)
        setComment("")
        setImage(null)
        setPreview(null)
        loadReviews()
      })
      .catch(() => toast.error("Failed to add review"))
  }

  // 🖼️ Fix image path
  const getImageUrl = (img) => {
    if (!img) return null
    if (img.startsWith("http")) return img
    return `${BASE_URL}/${img.replace(/^\\+/, "").replace(/^\/+/, "")}`
  }

  // ⭐ Star UI
  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex gap-1 mb-3">
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            onClick={() => onChange(star)}
            className={`cursor-pointer text-2xl ${
              star <= value ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  if (status === "loading") return <Loader />
  if (status === "error") return <h1 className="text-center mt-10 text-red-500">Error loading reviews</h1>

  return (
    <>
      <Header />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-10">
          {id ? "Product Reviews" : "All Reviews"}
        </h1>

        {/* 📝 ADD REVIEW */}
        {id && (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-10">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border p-3 mb-3 rounded-lg"
            />

            {/* ⭐ Stars */}
            <StarRating value={rating} onChange={setRating} />

            <textarea
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-3 mb-3 rounded-lg"
            />

            {/* 📸 Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]
                setImage(file)
                if (file) setPreview(URL.createObjectURL(file))
              }}
              className="mb-3"
            />

            {/* 🔍 Preview */}
            {preview && (
              <img
                src={preview}
                className="w-32 h-32 object-cover rounded-lg mb-3 border"
              />
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Submit Review
            </button>
          </div>
        )}

        {/* 🗂️ REVIEWS */}
        <div className="max-w-4xl mx-auto space-y-6">

          {reviews.length === 0 && (
            <p className="text-center text-gray-400">No reviews yet</p>
          )}

          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{r.customerName}</h3>
                <span className="text-yellow-500 text-lg">
                  {"★".repeat(r.rating)}
                </span>
              </div>

              <p className="text-gray-600 mb-3">{r.comment}</p>

              {/* 🖼️ Review Image */}
              {getImageUrl(r.image) && (
                <img
                  src={getImageUrl(r.image)}
                  onError={(e) => e.target.style.display = "none"}
                  className="w-full max-w-sm rounded-lg border"
                />
              )}
            </div>
          ))}

        </div>
      </div>
    </>
  )
}



