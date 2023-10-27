import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true))
    const response = await fetch('/posts')
    if (response.ok) {
      const posts = await response.json()
      dispatch(setPosts(posts))
      return posts
    } else {
      throw new Error('Failed to fetch user data')
    }
  } catch (error) {
    return rejectWithValue(error.message)
  } finally {
    dispatch(setLoading(false))
  }
})

export const createPost = createAsyncThunk('posts/createPost', async (data, { dispatch }) => {
  dispatch(setLoading(true))
  try {
    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const data = await response.json()
      dispatch(postAdded(data))
      return data
    }
  } catch (error) {
    console.error("createPost error:", error)
  } finally {
    dispatch(setLoading(false)) 
  }
  return false
})

export const updatePost = createAsyncThunk('posts/updatePost', async (data, { dispatch }) => {
  dispatch(setLoading(true))
  try {
    const response = await fetch(`/posts/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const data = await response.json()
      dispatch(postUpdated(data))
      return data
    }
  } catch (error) {
    console.error("updatePost error:", error)
  } finally {
    dispatch(setLoading(false)) 
  }
  return false
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { dispatch }) => {
  dispatch(setLoading(true))
  const response = await fetch(`/posts/${postId}`, { method: 'DELETE' })
  if (response.ok) {
    dispatch(postRemoved(postId))
    return postId
  }
  throw new Error('Failed to delete the post')
})

const postsSlice = createSlice({
    name: "posts",
    initialState: {
      entities: [],
      isLoading: false,
      errors: []
    },
    reducers: {
      setPosts: (state, action) => {
        state.entities = action.payload
      },
      setLoading: (state, action) => {
          state.isLoading = action.payload
      },
      postAdded: (state, action) => {
        const { body } = action.payload
        console.log(action.payload)
        state.entities.push({body: body})
      },
      postUpdated(state, action) {
        console.log(action.payload)
        const updatedPost = action.payload
        state.entities = state.entities.map(post => {
          if (post.id === updatedPost.id) {
            return updatedPost
          }
          return post
        })
      },
      postRemoved(state, action) {
        console.log(action.payload)
        state.entities = state.entities.filter((post) => post.id !== action.payload)
      }
    },
  })
  
  export const { setPosts, setLoading, postAdded, postRemoved, postUpdated } = postsSlice.actions
  export default postsSlice.reducer