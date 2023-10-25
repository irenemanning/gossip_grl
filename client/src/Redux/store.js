import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import postsReducer from "./postsSlice"
const store = configureStore({
    reducer: {
      user: authReducer,
      posts: postsReducer
    },
  })
  
  export default store
  