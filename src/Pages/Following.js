import React from 'react'
import Follower from '../components/Follower'

export default function Following() {
  return (
    <div style={{marginBottom: '5%'}}>
        <div className='cards'>
          <Follower />
          <Follower />
        </div>
    </div>
  )
}
