import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// export const fetchComments = createAsyncThunk("comments/fetchComments", async (postId, { dispatch, getState }) => {
//   const { posts } = getState()
//   const comments = posts.entities
//     .find((post) => post.id === postId)
//     .comments
//   return comments
// })


//FIX THIS COMMENT DOESN'T POST
export const createComment = createAsyncThunk('comments/createComment', async (data, { dispatch }) => {
  try {
    const response = await fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const data = await response.json()
      dispatch(commentAdded(data))
      return data
    }
  } catch (error) {
    console.error("createComment error:", error)
  }
  return false
})

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
      entities: [],
      isLoading: false,
      errors: []
    },
    reducers: {
      setComments: (state, action) => {
        state.entities = action.payload
      },
      setLoading: (state, action) => {
          state.isLoading = action.payload
      },
      commentAdded: (state, action) => {
        const { body, post_id } = action.payload
        state.entities.push({body: body, post_id: post_id})
      }
    },
  })
  
  export const { setComments, setLoading, commentAdded } = commentsSlice.actions
  export default commentsSlice.reducer