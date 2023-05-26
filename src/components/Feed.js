import React, { useEffect, useState } from 'react'
import '../CSS/Feed.css'
import db from '../firebase'
import Post from './Post'
import QuoraBox from './QuoraBox'

export default function Feed() {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collection("questions")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          questions: doc.data(),
        }))
      )
    );
}, []);

  return (
    <div className='feed'>
        <QuoraBox />
        {
          posts.map(({ id, questions}) => (
            <Post
              key={id}
              Id={id}
              image={questions.imageUrl}
              question={questions.question}
              timestamp={questions.timestamp}
              quoraUser={questions.user}
            />
          ))
        }
    </div>
  )
}
