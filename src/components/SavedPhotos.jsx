import React from 'react'
import PostCard from './PostCard'
export default function SavedPhotos() {
  return (
    <div  className="usersPhotos">
        <h1 className="heading"> User's Liked/Saved Photos</h1>
        <div className="miniPosts" style={{height: "349px"}}>
            <div className="cards">
                <PostCard url="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg" size="small" />
                <PostCard url="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg" size="small" />
                <PostCard url="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg" size="small" />
                <PostCard url="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg" size="small" />
                <PostCard url="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg" size="small" />
                <PostCard url="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg" size="small" />
                <PostCard url="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg" size="small" />
                <PostCard url="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg" size="small" />
            </div>
        </div>
    </div>
  )
}
