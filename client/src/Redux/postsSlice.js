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

const postsSlice = createSlice({
    name: "posts",
    initialState: {
      entities: [],
      isLoading: false,
      errors: []
    },
    reducers: {
      setPosts: (state, action) => {
          console.log(state)
          console.log(action)
        state.entities = action.payload
      },
      setLoading: (state, action) => {
          state.isLoading = action.payload;
      }
    },
  })
  
  export const { setPosts, setLoading } = postsSlice.actions
  export default postsSlice.reducer