import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import postsReducer from "./postsSlice"
import commentsReducer from "./commentsSlice"
const store = configureStore({
    reducer: {
      auth: authReducer,
      posts: postsReducer,
      comments: commentsReducer
    },
  })
  
  export default store
  