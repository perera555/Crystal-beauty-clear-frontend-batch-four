import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ProductReviews() {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + id)
      .then((res) => {
        setReviews(res.data.reviews)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Product Reviews</h1>

      {reviews.map((review, index) => (
        <div key={index} className="border p-4 mb-4 rounded">
          <h2 className="font-semibold">{review.name}</h2>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  )
}