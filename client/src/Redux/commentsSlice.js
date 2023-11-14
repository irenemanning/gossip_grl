import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchComments = createAsyncThunk('comments/fetchComments', async (_, { dispatch, getState }) => {
  try {
    dispatch(setLoading(true))
    const { posts } = getState()
    if (!Array.isArray(posts.entities)) {
      console.error('Posts entities is not an array:', posts.entities)
      return []
    }
    const comments = posts.entities.flatMap((post) => post.comments)
    dispatch(setComments(comments))
    return comments
  } catch (error) {
    console.error('fetchComments error:', error)
    throw error
  } finally {
    dispatch(setLoading(false))
  }
})

export const createComment = createAsyncThunk('comments/createComment', async (data, { dispatch }) => {
  try {
    const response = await fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const responseData = await response.json()

      if (responseData.errors) {
        console.error("Comment creation failed:", responseData.errors)
      }

      throw new Error("Comment creation failed")
    }
    const responseData = await response.json()
    dispatch(commentAdded(responseData))
    return responseData
  } catch (error) {
    console.error("createComment error:", error)
    throw error
  }
})

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId, { dispatch }) => {
  dispatch(setLoading(true))
  const response = await fetch(`/comments/${commentId}`, { method: 'DELETE' })
  if (response.ok) {
    dispatch(commentRemoved(commentId))
    return commentId
  }
  throw new Error('Failed to delete the post')
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
        console.log(action.payload)
      },
      setLoading: (state, action) => {
          state.isLoading = action.payload
      },
      commentAdded: (state, action) => {
        const { body, post_id, user_id } = action.payload
        state.entities.push({body: body, post_id: post_id, user_id: user_id})
      },
      commentRemoved: (state, action) => {
        console.log(action.payload)
        state.entities = state.entities.filter((comment) => comment.id !== action.payload)
      }
    },
  })
  
  export const { setComments, setLoading, commentAdded, commentRemoved } = commentsSlice.actions
  export default commentsSlice.reducer