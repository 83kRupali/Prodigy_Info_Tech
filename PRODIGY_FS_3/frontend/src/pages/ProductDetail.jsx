
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(state || null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user')); // assuming it contains { _id, name }

  // Fetch product if not passed via navigation state
  useEffect(() => {
    if (!state) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error('Failed to fetch product:', err));
    }
  }, [id, state]);

  // Fetch reviews
  useEffect(() => {
    if (product?._id) {
      axios.get(`http://localhost:5000/api/reviews/${product._id}`)
        .then(res => setReviews(res.data))
        .catch(err => console.error('Failed to fetch reviews:', err));
    }
  }, [product]);

  if (!product) return <p>Loading product...</p>;

  // Add to cart
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(item => item.id === product._id);

    if (itemIndex >= 0) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('✅ Added to cart!');
  };

  // Buy now
  const handleBuyNow = () => {
    localStorage.setItem('buyNow', JSON.stringify([{
      id: product._id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image
    }]));
    navigate('/checkout?buyNow=true');
  };

  // Submit review
  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Please login to submit a review.");
      return;
    }

    if (comment.trim() && rating > 0) {
      const reviewData = {
        productId: product._id,
        userId: user._id,
        name: user.name,
        rating,
        comment
      };

      try {
        await axios.post('http://localhost:5000/api/reviews', reviewData);
        alert('✅ Review submitted!');
        setComment('');
        setRating(0);

        const res = await axios.get(`http://localhost:5000/api/reviews/${product._id}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        alert('❌ Failed to submit review');
      }
    } else {
      alert('Please enter a rating and comment.');
    }
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <img
          src={product.image || 'https://via.placeholder.com/400x300'}
          alt={product.title}
          className="detail-image"
        />

        <div className="detail-info">
          <h2 className="detail-title">{product.title}</h2>
          <p className="detail-description">{product.description}</p>
          <h3 className="detail-price">₹{product.price}</h3>

          {/* Rating Stars */}
          <div className="rating-section">
            <span className="rating-label">Your Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comment Box */}
          <div className="comment-section">
            <textarea
              className="comment-box"
              placeholder="Leave your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="submit-comment" onClick={handleCommentSubmit}>
              Submit Comment
            </button>
          </div>

          {/* Buttons */}
          <div className="action-buttons">
            <button className="detail-btn add-cart" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="detail-btn buy-now" onClick={handleBuyNow}>
              ⚡ Buy Now
            </button>
          </div>

          {/* Customer Reviews */}
          <h4 className="review-header">Customer Reviews:</h4>
          <hr />
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="review-box">
                <strong>{rev.name}</strong>
                <div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{ color: i < rev.rating ? 'gold' : 'lightgray' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p>{rev.comment}</p>
                <small>{new Date(rev.createdAt).toLocaleString()}</small>
                <hr />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail