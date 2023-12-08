import React, { useState } from 'react';
import axios from 'axios';

const PrivateRoute = ({ postId, user, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server endpoint
      const response = await axios.post(`/addComment/${postId}`, {
        text: commentText,
      }, {
        headers: {
          Authorization: user.token, // Pass the user's token for authentication
        },
      });

      // If the comment is added successfully, update the UI or trigger any necessary actions
      if (response.data) {
        onCommentAdded(response.data);
        // You may want to reset the commentText state or close the comment form here
        setCommentText('');
      }
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        placeholder="Add your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default PrivateRoute;
