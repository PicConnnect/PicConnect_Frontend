import React from 'react'
import PostCard from '../components/postCard'

export default function Home() {
  return (
    <div>
      <div>This is Home</div>
      <div className="cards">
      <PostCard url = "https://img.freepik.com/free-photo/colorful-heart-air-balloon-shape-collection-concept-isolated-color-background-beautiful-heart-ball-event_90220-1047.jpg"/>
      <PostCard url = "https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg"/>
      <PostCard url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xnU57vt7N8JpHXI7lXenSq_GpxGGJXLNogj7d-U&s"/>
      </div>


    </div>
  )
}
