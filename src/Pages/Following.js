import React from 'react'
import Follower from '../components/Follower'
import Footer from "../components/Footer";


export default function Following() {
  return (
    <div>
    <div>This is Following</div>
    <div className='cards'>
      <Follower />
      <Follower />

    </div>

    <Footer />
    </div>
  )
}
