import { useState, useEffect } from 'react';
import service from '../appwrite/config/config';
import { Container, PostCard } from '../../index'
import React from 'react'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    service.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    posts ? <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage}/>
                </div>
            ))}
        </div>
        </Container>
</div>: <div>No posts availabel!!</div>
  )
}

export default AllPosts;