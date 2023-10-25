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

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }, { dispatch, rejectWithValue }) => {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json()
    console.log(response)
        if (response.ok) {
            console.log(data)
            dispatch(setUser(data))
            return data;
        } else {
            const errorData = await response.json()
            const errors = getErrors(errorData)
            return rejectWithValue(errors)
        }
    } catch (error) {
      const errors = [{ message: "An error occurred." }]
      return rejectWithValue(errors)
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

export const signupUser = createAsyncThunk('auth/signupUser', async ({ username, password, passwordConfirmation }, { dispatch, rejectWithValue }) => {
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
        }),
    })
    const data = await response.json();
    if (response.ok) {
        dispatch(setUser(data));
        return data;
    } else {
        const errorData = await response.json()
        const errors = getErrors(errorData)
        return rejectWithValue(errors)
    }
    } catch (error) {
      const errors = [{ message: "An error occurred." }]
      return rejectWithValue(errors)
    }
})

function getErrors(data) {
    if (data.errors && Array.isArray(data.errors)) {
        return data.errors
    }
    console.log("Invalid error response:", data)
    return [{ message: "An error occurred." }]
}

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
        console.log(state)
        console.log(action)
      state.user = action.payload
      state.isAuthenticated = true
    },
    setLoading: (state, action) => {
        state.isLoading = action.payload;
    }
  },
});

export const { setUser, setLoading } = authSlice.actions
export default authSlice.reducer