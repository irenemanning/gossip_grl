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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(setErrors(errorData.errors || [{ message: "An error occurred." }]))
        throw new Error("Login failed")
      }
      const data = await response.json()
      dispatch(setUser(data))
      return data
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ username, password, passwordConfirmation }, { dispatch }) => {
    try {
      dispatch(setLoading(true))

      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, password_confirmation: passwordConfirmation, }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(setErrors(errorData.errors || [{ message: "An error occurred." }]))
        throw new Error("Sign up failed")
      }
      const data = await response.json()
      dispatch(setUser(data))
      return data
    } catch (error) {
      console.error("Sign up failed:", error)
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }
)

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

// make sure this conditionally dispatches errors based on username or password being Present in data
export const updateUser = createAsyncThunk('auth/updateUser', async (data, { dispatch }) => {
  dispatch(setLoading(true))

  try {
    const response = await fetch("/me/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errors = errorData.errors || ['An error occurred']
      console.error('Update user errors:', errors)
      console.log(data)
      if (data.user && data.user.username) {
        dispatch(setUsernameErrors(errors))
      } else if (data.user && data.user.password) {
        dispatch(setPasswordErrors(errors))
      }

      throw new Error('Update user failed')
    }

    const responseData = await response.json()
    dispatch(userUpdated(responseData))
    return responseData
  } catch (error) {
    console.error('updateUser error:', error)
  } finally {
    dispatch(setLoading(false))
  }

  return false
})

// export const updateUser = createAsyncThunk('auth/updateUser', async (data, { dispatch }) => {
//   dispatch(setLoading(true))
//   try {
//     const response = await fetch("/me/update", {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//     if (!response.ok) {
//       const errorData = await response.json()
//       const errors = errorData.errors || ['An error occurred']
//       console.error('Update user errors:', errors)
//       dispatch(setUsernameErrors(errors))
//       throw new Error('Update user failed')
//     }
//     const responseData = await response.json()
//     dispatch(userUpdated(responseData))
//     return responseData
//   } catch (error) {
//     console.error('updateUser error:', error)
//   } finally {
//     dispatch(setLoading(false))
//   }
//   return false
// })

export const updateProfileImage = createAsyncThunk('auth/updateProfileImage', async (data, { dispatch }) => {
  dispatch(setLoading(true))

  try {
    const response = await fetch("/me/update", { method: "PATCH", body: data })
    if (!response.ok) {
      const errorData = await response.json()
      const errors = errorData.errors || ['An error occurred']
      dispatch(setProfileImageErrors(errors))
      throw new Error('Update profile image failed')
    }
    const responseData = await response.json()
    dispatch(userUpdated(responseData))
    return responseData
  } catch (error) {
    console.error('updateProfileImage error:', error)
  } finally {
    dispatch(setLoading(false))
  }
  return false
})

export const deleteUser = createAsyncThunk('auth/deleteUser', async (data, { dispatch }) => {
  try {
    console.log(data)
    dispatch(setLoading(true))
    // const response = await fetch("/me/delete", { method: 'DELETE' })
    const response = await fetch("/me/delete", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.ok) dispatch(userRemoved(data))
    return data
  } catch (error) {
    console.error('deleteUser error:', error)
    throw error
  } finally {
    dispatch(setLoading(false))
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    profileImageErrors: [],
    usernameErrors: [],
    passwordErrors: [],
    errors: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = action.payload !== null
      state.errors = []
    },
    userUpdated: (state, action) => {
      state.user = action.payload
      state.errors = []
    },
    userRemoved: (state, action) => {
      state.user = null
      state.isAuthenticated = false
    },
    setLoading: (state, action) => {
        state.isLoading = action.payload
    },
    setProfileImageErrors: (state, action) => {
      state.profileImageErrors = action.payload
    },
    setUsernameErrors: (state, action) => {
      state.usernameErrors = action.payload
    },
    setPasswordErrors: (state, action) => {
      state.passwordErrors = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    }
  },
})

export const { setUser, userUpdated, userRemoved, setLoading, setErrors, setProfileImageErrors, setUsernameErrors, setPasswordErrors } = authSlice.actions
export default authSlice.reducer