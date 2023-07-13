import React from 'react'
import PostCard from '../components/postCard'

export default function Home() {
  return (
    <div>
      <div>This is Home</div>
      <div className="cards">
      <PostCard />
      <PostCard />
      <PostCard />
      </div>


    </div>
  )
}
