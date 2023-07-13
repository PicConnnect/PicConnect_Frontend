import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletepostThunk } from '../redux/post/post.actions';

const PostCard = ({ PostCard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewClick = () => {
    navigate(`/view-post/${PostCard.id}`);
  }

  const handleEditClick = () => {
    navigate(`/posts/edit/${PostCard.id}`);
  };

  const handleDeleteClick = () => {
    dispatch(deletepostThunk(PostCard.id))
      .then(() => {
        navigate('/posts');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="card" style={{ width: '25rem' }}>
        <div className="cardButton" onClick={() => handleViewClick(PostCard.id)}>
          <img
            src="https://img.freepik.com/free-vector/college-building-educational-institution-banner_1441-3616.jpg?size=626&ext=jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{PostCard.name}</h5>
            <p className="card-text">Total Students: {PostCard.students ? PostCard.students.length : 0}</p>
          </div>
        </div>
        <div className="card-body">
          <button onClick={handleEditClick} className="card-link">
            Edit
          </button>
          <button onClick={handleDeleteClick} className="card-link">
            Delete
          </button>
        </div>
      </div>

    </div>
  );
};

export default PostCard;