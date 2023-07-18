import React from 'react'
import PostCard from './PostCard'
export default function SavedPhotos() {
  return (
    <div  className="bg-[#D9D9D9] mr-4 mt-6">
        <h1 className="heading"> User's Liked/Saved Photos</h1>
        <div className="overflow-y-auto" style={{height: "349px"}}>
            <div className="flex flex-wrap justify-between">
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
