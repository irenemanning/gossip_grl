import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch('/me')
      if (response.ok) {
        const user = await response.json()
        dispatch(setUser(user))
        return user
      } else {
        throw new Error('Failed to fetch user data')
      }
    } catch (error) {
      return rejectWithValue(error.message)
    } finally {
      dispatch(setLoading(false))
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }, { dispatch }) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(setUser(data))
        return data
      } else {
        const errorData = await response.json()
        return errorData.errors || [{ message: "An error occurred." }]
      }
    } catch (error) {
      return [{ message: "An error occurred." }]
    }
})
    
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
    try {
        const response = await fetch("/logout", {
        method: "DELETE",
        })
        if (response.ok) {
        dispatch(setUser(null))
        return true
        } else {
        console.error("Logout failed:", response.status, response.statusText)
        return false
        }
    } catch (error) {
        console.error("Logout error:", error)
        return false
    }
})

export const signupUser = createAsyncThunk('auth/signupUser', async ({ username, password, passwordConfirmation }, { dispatch }) => {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
        })
      })
      if (response.ok) {
        const data = await response.json()
        dispatch(setUser(data))
        return data
      }
    } catch (error) {
      console.error("Signup error:", error)
    }
    return false
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    errors: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setLoading: (state, action) => {
        state.isLoading = action.payload
    }
  },
})

export const { setUser, setLoading } = authSlice.actions
export default authSlice.reducer