import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { deletepostThunk } from '../redux/post/post.actions';

const postCard = ({ postCard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewClick = () => {
    navigate(`/view-post/${postCard.id}`);
  }

  const handleEditClick = () => {
    navigate(`/posts/edit/${postCard.id}`);
  };

  const handleDeleteClick = () => {
    dispatch(deletepostThunk(postCard.id))
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
        <div className="cardButton" onClick={() => handleViewClick(postCard.id)}>
          <img
            src="https://img.freepik.com/free-vector/college-building-educational-institution-banner_1441-3616.jpg?size=626&ext=jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{postCard.name}</h5>
            <p className="card-text">Total Students: {postCard.students ? postCard.students.length : 0}</p>
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

export default postCard;