import React, { useState } from 'react';
import Modal from 'react-modal';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={handleToggleModal}>Open Comment Modal</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleToggleModal}
        contentLabel="Comments Modal"
      >
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>

        <div>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleInputChange}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </Modal>
    </div>
  );
};

export default CommentSection;
