import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPosts = createAsyncThunk('posts/fetchUser', async (_, { dispatch, rejectWithValue }) => {
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
  try {
    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    console.log(data)
    if (response.ok) {
      const data = await response.json()
      dispatch(postAdded(data))
      return data
    }
  } catch (error) {
    console.error("createComment error:", error)
  }
  return false
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { dispatch }) => {
  const response = await fetch(`/posts/${postId }`, {
    method: 'DELETE',
  })
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
      postRemoved(state, action) {
        state.entities = state.entities.filter((post) => post.id !== action.payload)
      }
    },
  })
  
  export const { setPosts, setLoading, postAdded, postRemoved } = postsSlice.actions
  export default postsSlice.reducer