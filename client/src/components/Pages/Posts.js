import React, {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from "../../Redux/postsSlice"
import ReusableCard from "../UI/ReusableCard"
function Posts() {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.entities)
    const isLoading = useSelector((state) => state.posts.isLoading)

    useEffect(() => {
        dispatch(fetchPosts())
      }, [dispatch])
    
      if (isLoading) {
        return <div>Loading...</div>
      }
    
    return (
        <div className="posts-page">
            {posts.map((post) => <ReusableCard key={post.id} text={post.body} />)}
        </div>
    )
}

export default Posts