import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const handleErrors = async (response, dispatch) => {
  if (!response.ok) {
    const errorData = await response.json()
    dispatch(setErrors(errorData.errors || [{ message: "An error occurred." }]))
    return { payload: undefined, errors: errorData.errors || [{ message: "An error occurred." }] }
  }
  return { payload: await response.json(), errors: [] }
}

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
    try {
      dispatch(setLoading(true))
      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await handleErrors(response, dispatch)
      if (result.errors.length === 0) {
        dispatch(postAdded(result.payload))
      }
      return result
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const updatePost = createAsyncThunk('posts/updatePost', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await fetch(`/posts/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const { payload, errors } = await handleErrors(response, dispatch)
    
    if (errors.length === 0) {
      dispatch(postUpdated(payload))
    } else {
      console.error("Edit post failed:", errors)
    }
    return { payload, errors }
  } catch (error) {
    throw error
  } finally {
    dispatch(setLoading(false))
  }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { dispatch }) => {
  dispatch(setLoading(true))
  try {
      const response = await fetch(`/posts/${postId}`, { method: 'DELETE' })
      if (response.ok) {
        dispatch(postRemoved(postId))
        return postId
      }
      throw new Error('Failed to delete the post')
  } catch (error) {
  } finally {
      dispatch(setLoading(false))
  }
})

const postsSlice = createSlice({
    name: "posts",
    initialState: {
      entities: [],
      filteredPosts: [],
      isLoadingPosts: false,
      errors: []
    },
    reducers: {
      setPosts: (state, action) => {
        state.entities = action.payload
      },
      postAdded: (state, action) => {
        const { id, body, hashtags, user_id } = action.payload
        const newPost = { id, body, hashtags, user_id }
        state.entities = [newPost, ...state.entities]
        state.errors = []
        state.filteredPosts = [...state.filteredPosts, newPost]
      },
      postUpdated(state, action) {
        const updatedPost = action.payload
        state.entities = state.entities.map(post => {
          return post.id === updatedPost.id ? updatedPost : post
        })
        state.errors = []
      },
      postRemoved(state, action) {
        state.entities = state.entities.filter((post) => post.id !== action.payload)
      },
      setLoading: (state, action) => {
        state.isLoadingPosts = action.payload
      },
      setErrors: (state, action) => {
        state.errors = action.payload
      },
      setFilteredPosts(state, action) {
        state.filteredPosts = action.payload
      }
    },
  })
  
  export const { setPosts, postAdded, postRemoved, postUpdated, setLoading, setErrors, setFilteredPosts } = postsSlice.actions
  export default postsSlice.reducer