import React, { useState } from 'react';
import axios from 'axios';

const PrivateRoute = ({ postId, user, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
   
      const response = await axios.post(`/addComment/${postId}`, {
        text: commentText,
      }, {
        headers: {
          Authorization: user.token, 
        },
      });

    
      if (response.data) {
        onCommentAdded(response.data);
       
        setCommentText('');
      }
    } catch (error) {
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
