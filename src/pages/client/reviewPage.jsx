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
    formData.append("rating", Number(rating)) // ✅ FIX
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
    return `${BASE_URL}/${img.replace(/\\/g, "/")}` // ✅ FIX
  }

  const StarRating = ({ value, onChange }) => (
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

  if (status === "loading") return <Loader />
  if (status === "error") return <h1>Error loading reviews</h1>

  return (
    <>
      <Header />

      <div className="pt-20 p-6">

        <h1 className="text-3xl text-center mb-10">
          {id ? "Product Reviews" : "All Reviews"}
        </h1>

        {id && (
          <div className="max-w-xl mx-auto bg-white p-6 shadow mb-10">
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your Name"
              className="w-full border p-3 mb-3"
            />

            <StarRating value={rating} onChange={setRating} />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-3 mb-3"
            />

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0]
                setImage(file)
                if (file) setPreview(URL.createObjectURL(file))
              }}
            />

            {preview && <img src={preview} className="w-32 mt-3" />}

            <button onClick={handleSubmit} className="w-full bg-pink-600 text-white p-3 mt-3">
              Submit Review
            </button>
          </div>
        )}

        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-5 mb-4 shadow">
            <h3>{r.customerName}</h3>
            <p>{"★".repeat(r.rating)}</p>
            <p>{r.comment}</p>

            {getImageUrl(r.image) && (
              <img src={getImageUrl(r.image)} className="w-40 mt-2" />
            )}
          </div>
        ))}

      </div>
    </>
  )
}