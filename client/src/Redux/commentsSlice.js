import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const handleErrors = async (response, dispatch) => {
  if (!response.ok) {
    const errorData = await response.json()
    dispatch(setErrors(errorData.errors || [{ message: "An error occurred." }]))
    return { payload: undefined, errors: errorData.errors || [{ message: "An error occurred." }] }
  }
  return { payload: await response.json(), errors: [] }
}  

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
    dispatch(setLoading(true))
    const { payload, errors } = await handleErrors(await fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }), dispatch)
    if (errors.length > 0) {
      throw new Error("Comment creation failed")
    }
    dispatch(commentAdded(payload))
    return payload
  } catch (error) {
    throw error
  } finally {
    dispatch(setLoading(false))
  }
})

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await fetch(`/comments/${commentId}`, { method: 'DELETE' })
    if (response.ok) dispatch(commentRemoved(commentId))
    return commentId
  } catch (error) {
    console.error('deleteComment error:', error)
    throw error
  } finally {
    dispatch(setLoading(false))
  }
})

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
      entities: [],
      isLoadingComments: false,
      errors: []
    },
    reducers: {
      setComments: (state, action) => {
        state.entities = action.payload
      },
      commentAdded: (state, action) => {
        const newComment = action.payload
        state.entities.push(newComment)
      },
      commentRemoved: (state, action) => {
        state.entities = state.entities.filter((comment) => comment.id !== action.payload)
      },
      setLoading: (state, action) => {
          state.isLoadingComments = action.payload
      },
      setErrors: (state, action) => {
        state.errors = action.payload
      }
    },
  })
  
  export const { setComments, commentAdded, commentRemoved, setLoading, setErrors } = commentsSlice.actions
  export default commentsSlice.reducer